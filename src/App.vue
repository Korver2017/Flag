<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
          <a class="nav-item nav-link" href="#">Features</a>
          <a class="nav-item nav-link" href="#">Pricing</a>
          <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </div>
      </div>
    </nav>

    <h1 class="my-5">Flag</h1>
    <h1 class="my-5" v-if="user.authed">Signin success!</h1>


      
    <router-link to="/signin" tag="button" class="btn btn-success">
      Sign in
    </router-link>
    <router-link to="/" tag="button" class="btn btn-success">
      Home
    </router-link>

    <h3 class="text-left container">Organization：</h3>
    <div class="row container mx-auto">

      <router-link v-for="org in orgs" :key="org" :to="org" tag="button" class="list-group-item list-group-item-action btn btn-success col-2" active-class="active">
        {{ org }}
      </router-link>

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


      // let $vmc = this;

      // const User = Parse.Object.extend ("User");
      // let query = new Parse.Query (User);
      // let ary = [];
      // query.get ("gmiikxCF1c").then (resp => {
      //   $vmc.orgs = resp.get ('organization');
      // })

      

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
          email: this.$store.state.user.input.email
        }
      },
    },


    methods: {
    },
  }
</script>
