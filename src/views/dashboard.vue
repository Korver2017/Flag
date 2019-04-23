<template>
  <div class="wrap">
    <h1>{{ title }}</h1>
    <div class="row col-6 mx-auto">
      <input @keyup.enter="newProject" v-model.trim="projectName" type="text" class="form-control col-10" placeholder="New project" aria-describedby="button-addon2">
      <button class="btn btn-success col-2" @click="newProject">New project</button>
    </div>

    <div class="row">
      <div class="projectItem col-4 border border-danger mt-3 py-5" v-for="project in projects">
        <router-link class="d-block" to="/flag" tag="li" active-class="active">
          <a>
            <h4>{{ project }}</h4>
          </a>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import Parse from "parse";

  export default {
    

    name: 'dashboard',


    data () {
      return {
        title: 'Dashboard',
        projectName: '',
        projects: [],
        // projects: ['Flag', '#2-Project'],
      }
    },


    created () {
      var Project = Parse.Object.extend ("Project");
      var query = new Parse.Query (Project);

      query.get ("mAaLOhSiXm")
        .then (resp => {
          let projects = resp.get ('projects');
          this.projects = projects;
        }, (error) => {
          console.log (error);
        });
    },


    methods: {


      newProject () {
        this.projects.push (this.projectName);

        const Project = Parse.Object.extend("Project");
        const project = new Project();

        project.id = 'mAaLOhSiXm';

        project.save ().then ((project) => {
          project.set ('projects', [this.projects]);

          console.log (this.projects);
        }, (error) => {
          alert('Failed to create new object, with error code: ' + error.message);
        });

        this.projectName = '';
      },

    },
  }
</script>

<style scoped>
</style>