<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand nav-item nav-link" to="/">
        <a>Home</a>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a v-if="user.authed" @click.prevent="logOut" class="nav-item nav-link" href="#">Log out</a>
          <router-link v-else class="nav-item nav-link" to="/signin">
            <a>Sign in</a>
          </router-link>
          <a class="" href="#"></a>
        </div>
      </div>
      <span v-if="user.authed" class="nav-item nav-link align-right">Welcom, {{ user.email }}</span>
    </nav>

    <h1 class="my-4">Flag</h1>

    <div v-if="orgs.length !== 0" class="container mx-auto">
      <h5 class="text-left">Organization</h5>
      <div class="row">
        <router-link v-for="org in orgs" :key="org.id" :to="org.orgId" tag="button" class="list-group-item list-group-item-action btn btn-success col-2" active-class="active">
          {{ org.name }}
        </router-link>
      </div>

    </div>

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


  // Import
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
        orgs: []
      }
    },


    created () {

      // Add user

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
          email: this.$store.state.user.input.email,
          id: this.$store.state.user.input.userId
        }
      },
      
    },


    methods: {
      showOrg () {
        let $vmc = this;
        let Org = Parse.Object.extend ("Organization");
        let query = new Parse.Query (Org);
        let ary = [];
        query.equalTo ('memberId', $vmc.user.id);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let object = resp[i];
              let query = new Parse.Query (Org);
              obj.orgId = object.id;
              query.get (object.id)
                .then (resp => {
                  obj.name = resp.get ('name');
                  ary.push (obj);
                });
            }

            $vmc.orgs = ary;
          })
      },


      logOut () {
        let $vmc = this;
        $vmc.$store.dispatch ('user/logOut');
      },
    },


    watch: {
      user () {
        this.showOrg ();
      },
    }
  }
</script>
