<template>
  <div id="app" class="mt-5">

    <div class="col-3 input-group mb-3 mx-auto">
      <input v-model.trim="stashProjectName" type="text" class="form-control" placeholder="" aria-label="Project name" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button @click="addProject ()" class="btn btn-outline-success" type="button" id="button-addon2">Add project</button>
      </div>
    </div>

    <project :projects="projects" />

    
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
        projects: [],
        stashProjectName: '叫 Wake 起床尿尿',
        data: {
          projectName: '',
          issueGroup: [
            {
              title: '#1 Issue-1',
              issueContent: 'Issue-content',
              comments: ['Comment-1'],
            },
          ],
        },
        // projects: [
        //   {
        //     projectsName: '',
        //     issueGroup: [
        //       {
        //         title: '',
        //         issueContent: '',
        //         comments: [],
        //       },
        //     ],
        //   }
        // ],
        // issueGroupEmpty: [
        //   {
        //     title: '',
        //     issueContent: '',
        //     comments: [],
        //   },
        // ],
        // issueGroup: [
        //   {
        //     title: 'Call Wake 起床尿尿',
        //     issueContent: '',
        //     comments: ['Wake 該起床尿尿了'],
        //   },
        // ],
      }
    },

    
    methods: {
      addProject () {
        if (this.data.stashProjectName === '') return;

        this.data.projectName = this.stashProjectName;

        this.projects.push (this.data);

      }
    },
  }
</script>
