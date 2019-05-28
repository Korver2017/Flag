

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
    input: {
      email: 'korver@protype.tw',
      password: '6666',
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
    authed (state, data) {

      if (state.authed === true) {
        state.authed = false;
        state.username = '';
        state.input.email = '';
        state.input.password = '';
        state.input.userId = '';
      } else {
        state.authed = data.authed;
        state.username = data.username;
      }
      
      // if (state.authed === true) {
      //   state.authed = false;
      //   state.username = '';
      //   state.input.email = 'wake@protype.tw';
      //   state.input.password = '6666';
      //   state.input.userId = '';
      //   alert ('cleaning');
      // } else {
      //   alert ('authing')
      //   let Account = Parse.Object.extend ("Account");
      //   let query = new Parse.Query (Account);
        
      //   query.equalTo ("email", state.input.email);
      //   console.log (state.input.email);
      //   query.find ()
      //     .then (resp => {

      //       if (resp.length < 1) {
      //         alert ('Email 錯誤');
      //         return;
      //       }

      //       query.equalTo ("password", state.input.password);
      //       query.find()
      //         .then (resp => {


      //           if (resp.length < 1) {
      //             alert ('密碼錯誤');
      //             return;
      //           }

      //           state.authed = true;
      //           state.input.userId = resp[0].id;

      //           console.log (state.input.userId);

      //           let query = new Parse.Query(Account);
      //           query.get (state.input.userId)
      //             .then (resp => {
      //               state.username = resp.get ('username');
      //             });

      //           alert (`${state.input.email} authed success!`);
      //         });
      //     })
      //   }
    },


    // logOut (state) {
    //   state.authed = false;
    //   state.input.email = '';
    //   state.input.password = '';
    //   state.input.userId = '';
    // },


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

              state.input.userId = resp[0].id;

              // Header
              let oHeader = { alg: 'HS256', typ: 'JWT' };

              // Payload
              let oPayload = {};

              let tNow = $j.jws.IntDate.get('now');
              let tEnd = $j.jws.IntDate.get('now + 1day');

              oPayload.nbf = tNow;
              oPayload.iat = tNow;
              oPayload.exp = tEnd;
              oPayload.user = state.username;

              let sHeader = JSON.stringify(oHeader);
              let sPayload = JSON.stringify(oPayload);

              let query = new Parse.Query (Account);
              query.get (state.input.userId)
                .then(resp => {
                  let secret = resp.get('secret');
                  let sJWT = $j.jws.JWS.sign('HS256', sHeader, sPayload, secret);

                  resp.set('token', sJWT);
                  resp.save();

                  $cookie.set('token', sJWT);
                  let data = {};
                  data.username = resp.get ('username');
                  data.authed = true;
                  commit ('authed', data);

                  router.push ('/dashboard');
                });

            });
          
        })
    },

    
    /**
     *
     * User logOut
     *
     */
    logOut: function ({ commit }) {
      // if (confirm ('Are you sure to log out?'))
      commit ('authed');
      // else return;
    },    
  }
}
