

import Parse from "parse";

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
    authed: false,
    input: {
      email: 'korver@protype.tw',
      password: '123456',
      userId: '',
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
     * Authed
     *
     */
    authed (state) {
      let Account = Parse.Object.extend ("Account");
      let query = new Parse.Query (Account);
      
      query.equalTo ("email", state.input.email);
      console.log (state.input.email);
      query.find ()
        .then (resp => {

          if (resp.length < 1) {
            alert ('Email 錯誤');
            return;
          }

          query.equalTo ("password", state.input.password);
          query.find()
            .then (resp => {


              if (resp.length < 1) {
                alert ('密碼錯誤');
                return;
              }

              state.authed = true;

              state.input.userId = resp[0].id;

              alert (`${state.input.email} authed success!`);
            });
        })

      

    },


    /**
     *
     * Input datas
     *
     */
    input (state, input) {
      state.input.email = input.email || state.input.email || '';
      state.input.password = input.password || state.input.password || '';
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
     * User signin
     *
     */
    signin: function ({commit}) {
      commit ('authed');
    },

    
  }
}
