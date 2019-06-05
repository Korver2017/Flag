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

        <div class="d-flex align-items-center navbar-nav ml-auto mr-3">


          <router-link to="/" tag="a" class="mx-2 rounded nav-item nav-link">
            訊息
          </router-link>

          <router-link to="/" tag="a" class="mx-2 rounded nav-item nav-link">
            建立
          </router-link>

          <!-- <router-link to="/" tag="a" class="mx-2 rounded nav-item nav-link">
            設定檔和設置
          </router-link> -->

          <div class="dropdown">
            <a class="border-0 btn btn-outline-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img style="width: 25px; height: 25px;" class="rounded" :src="'https://www.gravatar.com/avatar/' + user.avatarHash" alt="">
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li class="dropdown-item">已登入用戶 {{ user.username }}</li>
              <hr />
              <a class="dropdown-item" href="#">個人訊息</a>
              <a class="dropdown-item" href="#">標記星號</a>
              <a class="dropdown-item" href="#">設定</a>
              <a class="dropdown-item" href="#">說明</a>
              <hr />
              <a @click="logOut" class="dropdown-item">登出</a>
            </div>

          </div>

          
        </div>
          
          <!-- Log Out Function -->
          
          <!-- <a v-if="user.authed" @click.prevent="logOut" class="nav-item nav-link" href="#">Log out</a> -->
      </div>

    </nav>

    <hr class="my-0" />

    <router-view  />

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
        token: '',
        username: '',
      }
    },


    created () {

      let $vmc = this;

      $vmc.token = $vmc.$cookie.get ('token');

      if ($vmc.token === undefined || '') {

        $vmc.$router.push ('/signin');
        return;

      } else {

        $vmc.$store.dispatch ('user/autoSignin', $vmc.token);

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
          userId: this.$store.state.user.userId,
          username: this.$store.state.user.username,
          avatarHash: this.$store.state.user.avatarHash,
        }
      },
      
    },


    mounted () {
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
        // $vmc.$router.push ('/signin');
      },

    },

    watch: {
      user () {
        // console.log (this.user);
      }
    }
  }
</script>
