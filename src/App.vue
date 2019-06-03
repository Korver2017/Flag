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
              <img style="width: 25px; height: 25px;" class="rounded" :src="'https://www.gravatar.com/avatar/' + userData.avatarHash" alt="">
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li class="dropdown-item">已登入用戶 {{ userData.username }}</li>
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
        userData: {},
        userId: '',
        token: undefined,
      }
    },


    created () {

      let $vmc = this;

      $vmc.token = $vmc.$cookie.get ('token');
      

      if ($vmc.token === undefined || '') {

        $vmc.$router.push ('/signin');
        return;
      }
      else {
        let payload = $vmc.$j.jws.JWS.readSafeJSONString($vmc.$base64.decode ($vmc.token.split(".")[1]));
        
        $vmc.userId = payload.userId;
        
        const Account = Parse.Object.extend ('Account');
        const query = new Parse.Query (Account);
        
        query.get ($vmc.userId)
          .then (resp => {
            let obj = {};
            obj.avatarHash = resp.get ('avatarHash');
            obj.username = resp.get ('username');
            $vmc.userData = obj;
          })
        
      }
      // else {
      //   console.log ('app create');
      //   const Account = Parse.Object.extend ('Account');
      //   const query = new Parse.Query (Account);

      //   query.equalTo ('token', $vmc.token);
      //   query.find ()
      //     .then (resp => {
      //       let object = resp[0];
      //       let obj = {};
            
      //       // $vmc.$store.state.user.authed = true;
      //       // $vmc.$store.state.user.input.userId = object.id;

      //       query.get (object.id)
      //         .then (resp => {
      //           obj.avatarHash = resp.get ('avatarHash');
      //           obj.username = resp.get ('username');
      //           obj.uerId = object.id;

      //           $vmc.$store.state.user.userId = object.id;
      //           console.log ($vmc.$store.state.user.userId);
      //           $vmc.userData = obj;
      //           console.log ($vmc.userData);
      //         })
      //         .then (resp => {
      //           $vmc.$router.push ('/dashboard');
      //         })

            
      //     })
      // }
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
        }
      },
      
    },


    mounted () {


      // let $vmc = this;
      // let ary = [];
      // let Account = Parse.Object.extend ('Account');
      // let query = new Parse.Query (Account);
      // console.log ($vmc.$store.state.user.username);
      // query.equalTo ('username', $vmc.$store.state.user.username);
      // query.find ()
      //   .then (resp => {
      //     let obj = {};
      //     let object = resp[0];
      //     obj.name = object.get ('username');
      //     obj.avatarHash = object.get ('avatarHash');

      //     ary.push (obj);
      //   });

      // $vmc.userData = ary;
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
    }
  }
</script>
