<template>
  <div id="app" class="mt-5">

    <div class="col-3 input-group mb-3 mx-auto">
      <input v-model.trim="projectName" type="text" class="form-control" placeholder="Project name" aria-label="Project name" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button @click="addProject ()" class="btn btn-outline-success" type="button" id="button-addon2">Add project</button>
      </div>
    </div>

    <template >
      <project :projects="projects" />
    </template>
    
    <!-- <li v-for="project in projects" :key="project">
      Project： {{ project }} - <router-link to="/issues">Issues</router-link> - <router-link to="/">Home</router-link>
    </li> -->

    <!-- <router-view /> -->
    
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
  import Project from '@/views/project.vue';

  export default {


    name: 'Home',


    /**
     *
     * Inner components
     *
     */
    components: {
      Project,
    },


    data () {
      return {
        title: 'Hello, flag!',
        projectName: '',
        projects: ['跟 Wake 請安問好', '看 Wake 有沒有洗手'],
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
