<template>
  <div id="app" class="mt-5">
    <h1 class="my-5">Flag</h1>

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

      // let User = Parse.Object.extend ("User");
      // let user = new User ();

      // user.set ('username', 'Korver');
      // user.set ('password', '123456');
      // user.set ('email', 'korver@protype.tw');

      // user.save()
      //   .then((user) => {
      //     alert('New object created with objectId: ' + user.id);
      //   }, (error) => {
      //     // Execute any logic that should take place if the save fails.
      //     // error is a Parse.Error with an error code and message.
      //     alert('Failed to create new object, with error code: ' + error.message);
      //   });

    },


    methods: {
    },
  }
</script>
