<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <router-link class="navbar-brand nav-item nav-link" to="/dashboard">
        <a>Flag</a>
      </router-link>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">

          <router-link to="/dashboard" tag="a" class="nav-item nav-link" active-class="active">
            Dashboard
          </router-link>
          
          <a v-if="user.authed" @click.prevent="logOut" class="nav-item nav-link" href="#">Log out</a>
        </div>
      </div>

    </nav>

    <router-view />

  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
</style>

<script>
  import Parse from "parse";


  export default {


    name: 'Home',


    /**
     *
     * Inner components
     *
     */
    components: {
    },


    data () {
      return {
      }
    },


    created () {


      if (this.$store.state.user.authed === false) {
        this.$router.push ({ path: '/signin' })
      }


      /**
       *
       * Add User
       *
       */
      // let Account = Parse.Object.extend ("Account");
      // let account = new Account ();

      // account.set ('username', 'k');
      // account.set ('password', 'k123456');
      // account.set ('email', 'k@protype.tw');

      // account.save()
      //   .then((account) => {
      //     alert('New object created with objectId: ' + account.id);
      //   }, (error) => {
      //     // Execute any logic that should take place if the save fails.
      //     // error is a Parse.Error with an error code and message.
      //     alert('Failed to create new object, with error code: ' + error.message);
      //   });

    },


     /**
     *
     * Computed
     *
     */
    computed: {
      user () {
        return {
          authed: this.$store.state.user.authed,
        }
      },
      
    },


    /**
     *
     * Methods
     *
     */
    methods: {

      /**
       *
       * Log Out
       *
       */
      logOut () {
        this.$store.dispatch ('user/logOut');
        this.$router.push ({ path: '/signin' })
      },

    },

    watch: {
      user () {
        let $vmc = this;
      
        // Header
        let oHeader = { alg: 'HS256', typ: 'JWT' };

        // Payload
        let oPayload = {};

        let tNow = $vmc.$j.jws.IntDate.get('now');
        let tEnd = $vmc.$j.jws.IntDate.get('now + 1day');

        oPayload.nbf = tNow;
        oPayload.iat = tNow;
        oPayload.exp = tEnd;
        oPayload.user = $vmc.$store.state.user.username;

        let sHeader = JSON.stringify(oHeader);
        let sPayload = JSON.stringify(oPayload);

        let Account = Parse.Object.extend ('Account');
        let query = new Parse.Query (Account);
        query.equalTo ('username', $vmc.$store.state.user.username);
        query.find ()
          .then (resp => {
            let secret = resp[0].get ('secret');

            let sJWT = $vmc.$j.jws.JWS.sign("HS256", sHeader, sPayload, secret);
            
            console.log (sJWT);


            // router.push('/dashboard');
            // The object was retrieved successfully.
          }, (error) => {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          });
      }
    }
  }
</script>
