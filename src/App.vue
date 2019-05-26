<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light bg-white">

      <router-link class="navbar-brand nav-item nav-link" to="/dashboard">
        <a>Flag</a>
      </router-link>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        
        <div class="navbar-nav">

          <router-link to="/dashboard" tag="a" class="mx-2 rounded nav-item nav-link" active-class="active" exact>
            Dashboard
          </router-link>

          <router-link to="/issue" tag="a" class="mx-2 rounded nav-item nav-link">
            Issues
          </router-link>

          <router-link to="/" tag="a" class="mx-2 rounded nav-item nav-link">
            Pull Requests
          </router-link>

          <router-link to="/" tag="a" class="mx-2 rounded nav-item nav-link">
            Explore
          </router-link>

        </div>

        <div class="navbar-nav ml-auto mr-3">


          <router-link to="/" tag="a" class="mx-2 rounded nav-item nav-link">
            訊息
          </router-link>

          <router-link to="/" tag="a" class="mx-2 rounded nav-item nav-link">
            建立
          </router-link>

          <router-link to="/" tag="a" class="mx-2 rounded nav-item nav-link">
            設定檔和設置
          </router-link>

          
        </div>
          
          <!-- Log Out Function -->
          
          <!-- <a v-if="user.authed" @click.prevent="logOut" class="nav-item nav-link" href="#">Log out</a> -->
      </div>

    </nav>

    <hr class="my-0" />

    <nav class="navbar navbar-expand-lg navbar-light bg-white">

      <router-link class="navbar-brand nav-item nav-link" to="/">
        <a>User</a>
      </router-link>
      
    </nav>

    <hr class="my-0" />

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

#wrap {
  width: 80%;
  margin: 0 auto;
}
</style>

<style scoped>
.active {
  background-color: #eee;
}
</style>

<script>


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
  }
</script>
