

import Parse from "parse";
import router from '@/router.js';
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
    authed: true,
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
      // console.log (data);

      if (state.authed === true) {
        state.authed = false;
        state.username = '';
        state.input.email = '';
        state.input.password = '';
        state.input.userId = '';
      } else {
        state.authed = data.authed;
        state.username = data.username;
        router.push ('/dashboard');
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
        let Account = Parse.Object.extend ('Account');
        let query = new Parse.Query (Account);

        query.equalTo("email", state.input.email);
        query.find ()
          .then(resp => {

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

                // state.authed = true;
                state.input.userId = resp[0].id;

                // console.log (state.input.userId);

                let query = new Parse.Query (Account);
                query.get (state.input.userId)
                  .then (resp => {
                    // state.username = resp.get('username');
                    let data = {};
                    data.username = resp.get ('username');
                    data.authed = true;
                    commit ('authed', data);
                  });

                // alert(`${state.input.email} authed success!`);
              });

            // commit('authed');
      
    })
  },

    
    /**
     *
     * User logOut
     *
     */
    logOut: function ({commit}) {
      // if (confirm ('Are you sure to log out?'))
      commit ('authed');
      // else return;
    },    
  }
}
