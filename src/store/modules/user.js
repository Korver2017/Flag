

import Parse from "parse";
import router from '@/router.js';

import $j from "jsrsasign";
import $cookie from "js-cookie";

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
    username: '',
    userId: '',
    avatarHash: '',
    input: {
      email: 'korver@protype.tw',
      password: '6666',
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
    authed (state, data) {

      if (state.authed === true) {
        state.authed = false;
        state.username = '';
        state.input.email = '';
        state.input.password = '';
        state.input.userId = '';
        router.push ('/signin')
      } else {
        state.authed = data.authed;
        state.username = data.username;
        state.userId = data.userId;
        state.avatarHash = data.avatarHash;
      }
      
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
    signin: function ({ state, commit }) {
      let $vmc = this;
      let Account = Parse.Object.extend ('Account');
      let query = new Parse.Query (Account);

      query.equalTo ('email', state.input.email);
      query.find ()
        .then (resp => {

          if (resp.length < 1) {
            alert ('Email 錯誤');
            return;
          }

          query.equalTo ('password', state.input.password);
          query.find ()
            .then (resp => {

              if (resp.length < 1) {
                alert ('密碼錯誤');
                return;
              }

              // Header
              let oHeader = { alg: 'HS256', typ: 'JWT' };

              // Payload
              let oPayload = {};

              let tNow = $j.jws.IntDate.get('now');
              let tEnd = $j.jws.IntDate.get('now + 1day');
              let id = resp[0].id;

              oPayload.nbf = tNow;
              oPayload.iat = tNow;
              oPayload.exp = tEnd;
              // oPayload.userId = userId;

              let sHeader = JSON.stringify(oHeader);
              let sPayload = JSON.stringify(oPayload);

              let query = new Parse.Query (Account);
              query.get (id)
                .then(resp => {
                
                  
                  let secret = resp.get('secret');
                  let sJWT = $j.jws.JWS.sign('HS256', sHeader, sPayload, secret);

                  resp.set('token', sJWT);
                  resp.save();

                  $cookie.set('token', sJWT);

                  let data = {};

                  data.username = resp.get ('username');
                  data.authed = true;
                  data.userId = id;
                  data.avatarHash = resp.get ('avatarHash');

                  commit ('authed', data);

                  router.push ('/dashboard');
                });

            });
          
        })
    },


    autoSignin: function ({ commit }, token) {
      let $vmc = this;

      let Account = Parse.Object.extend ('Account');
      let query = new Parse.Query (Account);

      query.equalTo ('token', token);
      query.find ()
        .then (resp => {
          for (let i = 0; i < resp.length; i ++) {
            let object = resp[i];
            let data = {};

            data.username = object.get ('username');
            data.authed = true;
            data.userId = object.id;
            data.avatarHash = object.get ('avatarHash');

            commit ('authed', data);
          }
        });
    },

    
    /**
     *
     * User logOut
     *
     */
    logOut: function ({ commit }) {
      // if (confirm ('Are you sure to log out?'))
      commit ('authed');
      router.push('/signin');
      // else return;
    },    
  }
}
