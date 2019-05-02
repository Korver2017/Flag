<template>
  <div id="app" class="mt-5">
    <h1>Flag</h1>

      <div class="row mt-5">
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
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
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
      let $vmc = this;

      const User = Parse.Object.extend ("User");
      let query = new Parse.Query (User);
      query.get ("gmiikxCF1c").then (resp => {
        $vmc.orgs = resp.get ('organization');
      })
    },


    methods: {
    },
  }
</script>
