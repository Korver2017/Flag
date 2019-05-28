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
  import router from '@/router'


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
      let $vmc = this;

      let cookieToken = $vmc.$cookie.get ('token');

      if (cookieToken === undefined || '') {
        $vmc.$router.push ('/signin');
        console.log ('qq');
        return;
      }
      else {
        const Account = Parse.Object.extend ('Account');
        const query = new Parse.Query (Account);

        query.equalTo ('token', cookieToken);
        query.find ()
          .then (resp => {
              let obj = resp[0];
              
              $vmc.$store.state.user.authed = true;
              $vmc.$store.state.user.input.userId = obj.id;
              $vmc.$router.push ('/dashboard');
          });
      }
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
        let $vmc = this;
        
        $vmc.$cookie.remove ('token');
        $vmc.$store.dispatch ('user/logOut');
        $vmc.$router.push ('/signin');
      },

    },

    watch: {
    }
  }
</script>
