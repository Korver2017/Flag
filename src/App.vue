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
  import Parse from "parse";


  // import IssueList from "@/views/issue-list.vue";
  import Dashboard from "@/views/dashboard.vue";

  // var GameScore = Parse.Object.extend ("GameScore");
  // var query = new Parse.Query (GameScore);
  // query.get ("EhMhOsEc1g")
  // .then ((gameScore) => {
    
    
  //   var score = gameScore.get ("score");

  //   console.log (score);
  //   // The object was retrieved successfully.
  //   console.log ('123');
  // }, (error) => {
  //   // The object was not retrieved successfully.
  //   // error is a Parse.Error with an error code and message.
  //   console.log (error);
  // });

  // var GameScore = Parse.Object.extend("GameScore");
  // var gameScore = new GameScore ();

  // gameScore.save({
  //   score: 1337,
  //   playerName: "Allen Iverson",
  //   cheatMode: false
  // })
  // .then((gameScore) => {
  //   // The object was saved successfully.
  //   console.log (gameScore);
  // }, (error) => {
  //   // The save failed.
  //   // error is a Parse.Error with an error code and message.
  // });


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


    created () {
    },


    methods: {
      d () {
        this.$api.delete ();
      }
    },
  }
</script>
