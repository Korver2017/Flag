<template>
  <div id="app" class="mt-5">
    <h1>Protype</h1>

    <router-link to="dashboard" tag="li" active-class="active">
      <a>Dashboard</a>
    </router-link>

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

  // import IssueList from "@/views/issue-list.vue";
  import Dashboard from "@/views/dashboard.vue";


  export default {


    name: 'Home',


    /**
     *
     * Inner components
     *
     */
    components: {
      // IssueList,
      Dashboard,
    },


    data () {
      return {
        
      }
    },
  }
</script>
