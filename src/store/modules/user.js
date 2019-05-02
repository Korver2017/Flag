

/**
 *
 * User
 *
 */


/**
 *
 * Export
 *
 */
export default {


  /**
   *
   * Namespace
   *
   */
  namespaced: true,


  /**
   *
   * State
   *
   */
  state: {
    account: '',
    // tokens: {access: '', refresh: ''},
    authed: false,
    input: {
      username: '',
      password: '',
      // newpasswd: '',
      // repasswd: ''
    }
  },


  /**
   *
   * Mutations
   *
   */
  mutations: {


    /**
     *
     * User signin
     *
     */
    signin (state, {account, tokens}) {
      state.account = account || state.input.username;
      state.tokens.access = tokens.access || '';
      state.tokens.refresh = tokens.refresh || '';
      state.authed = true;
    },


    /**
     *
     * User signout
     *
     */
    signout (state) {
      state.account = '';
      state.tokens = {access: '', refresh: ''};
      state.authed = false;
    },


    /**
     *
     * Input datas
     *
     */
    input (state, input) {
      state.input.username = input.username || state.input.username || '';
      state.input.password = input.password || state.input.password || '';
      state.input.newpasswd = input.newpasswd || state.input.newpasswd || '';
      state.input.repasswd = input.repasswd || state.input.repasswd || '';
    },
  },


  /**
   *
   * Actions
   *
   */
  actions: {


    /**
     *
     * Set API resource
     *
     */
    setApi: function ({state, dispatch}, {api, vm}) {

      const store = this;

      api.interceptors.response.use (null, (error) => {

        // 已經重試過，直接登出
        if (store.retried) {

          store.retried = false;
          store.dispatch ('user/signout');
          vm.$tt && vm.$tt.error ('管理授權失效，請重新登入');

          return Promise.reject (error);
        }

        if (error.config && error.response && error.response.status == 401) {

          // 設為已重試
          store.retried = true;

          /**
           *
           * When token expired
           *
           */
          return api.post ('/auth/refresh', null, {headers: {Authorization: 'JWT ' + state.tokens.refresh}})
            .then (resp => {

              // 清除已重試
              store.retried = false;

              // Update access token
              dispatch ('authed', {account: state.account, tokens: {access: resp.data.access_token, refresh: resp.data.refresh_token}})

              // Set access token to current retry request
              error.config.headers.Authorization = 'JWT ' + resp.data.access_token;

              // Remove base url (already combined)
              error.config.baseURL = '';

              // Make request
              return api.request (error.config);
            });
        }

        return Promise.reject (error);
      });


      this.$api = api;
      this.retried = false;
    },


    /**
     *
     * User signin
     *
     */
    signin: function ({state, dispatch}) {
      return this.$api.post ('/auth', {username: state.input.username, password: state.input.password})
        .then (resp => dispatch ('authed', {account: state.input.username, tokens: {access: resp.data.access_token, refresh: resp.data.refresh_token}}));
    },


    /**
     *
     * User signout
     *
     */
    signout: function ({commit}) {

      // Remove cookie
      Cookies.remove ('dds-auth');

      // Update API header
      this.$api.defaults.headers.Authorization = null;

      // Commit to state
      commit ('signout');
    },

  }
}
