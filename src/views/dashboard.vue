<template>
  <div class="container">
    <hr />
    <h1>{{ title }}</h1>
    <div class="row col-6 mx-auto my-4">
      <input @keyup.enter="newProject" v-model.trim="projectName" type="text" class="form-control col-8" placeholder="New project" aria-describedby="button-addon2">
      <button class="btn btn-success col-4" @click="newProject">New project</button>
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
      }
    },


    created () {
      let Project = Parse.Object.extend ("Project");
      let query = new Parse.Query (Project);

      query.get ("mAaLOhSiXm")
        .then (resp => {
          let data = resp.get ('projects');

          this.projects = data;
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
          project.set ('projects', this.projects);

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