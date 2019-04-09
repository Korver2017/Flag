<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <div class="col-3 input-group mb-3 mx-auto">
      <input v-model.trim="projectName" type="text" class="form-control" placeholder="Project name" aria-label="Project name" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button @click="addProject()" class="btn btn-outline-success" type="button" id="button-addon2">Add project</button>
      </div>
    </div>
    
    <li v-for="project in projects" :key="project">
      Project： {{ project }} - <router-link to="/issues">Issues</router-link> - <router-link to="/">Home</router-link>
    </li>

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
  import issues from "@/views/issues.vue";

  export default {
    data () {
      return {
        title: 'Hello, flag!',
        // projectName: '',
        projectName: '',
        projects: ['跟 Wake 請安問好'],
      }
    },

    
    methods: {
      addProject () {
        if (this.projectName === '') return;

        this.projects.push (this.projectName);
        this.projectName = '';
      }
    },
  }
</script>
