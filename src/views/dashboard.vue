<template>
  <div class="container">
    <hr />
    <h1>{{ title }}</h1>
    <div class="row col-6 mx-auto my-4">
      <input @keyup.enter="newProject" v-model.trim="projectName" type="text" class="form-control col-8" placeholder="New project" aria-describedby="button-addon2">
      <button class="btn btn-success col-4" @click="newProject">New project</button>
    </div>

    <div class="row">
      <div v-for="project in projects" class="projectItem col-4 border border-danger mt-3 py-5">
        <router-link class="d-block" :to="'/'" tag="li" active-class="active">
          <a>
            <h4>{{ project.name }}</h4>
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
        projects: [
          {
            name: 'Flag',
            issuesData: [
              // {
              //   title: 'title',
              //   titleEditing: false,
              //   showContent: false,
              //   content: '#1 - Lorem...',
              //   issueLabels: {},
              //   // labels: {feature: false, bug: false, hotfix: false},
              //   labels: [{feature: false},{bug: false},{hotfix: false}],
              //   issueOpened: true,
              //   stashTitle: '',
              //   stashContent: '',
              //   contentEditing: false,
              // }
            ]
          }
        ]
        // issuesData: [],
        // issueData: {
        //   project: '',
        //   title: 'title',
        //   titleEditing: false,
        //   showContent: false,
        //   content: '#1 - Lorem...',
        //   issueLabels: {},
        //   // labels: {feature: false, bug: false, hotfix: false},
        //   labels: [{feature: false},{bug: false},{hotfix: false}],
        //   issueOpened: true,
        //   stashTitle: '',
        //   stashContent: '',
        //   contentEditing: false,
        // },
        // issuesData: [],
      }
    },


    created () {
      let Project = Parse.Object.extend ("Project");
      let query = new Parse.Query (Project);
      let $vmc = this;

      query.get ("h7SfW3cnpH")
        .then (resp => {
          console.log (resp);
          let data = resp.get ('projects');

          $vmc.projects = data;
        }, (error) => {
          console.log (error);
        });
    },


    methods: {
      newProject () {
        let $vmc = this;
        $vmc.projects.push ({name: $vmc.projectName});

        const Project = Parse.Object.extend("Project");
        const project = new Project();

        project.id = 'h7SfW3cnpH'

        project.save()
        .then((project) => {

          project.set ("projects", $vmc.projects);

          // Execute any logic that should take place after the object is saved.
          alert('New object created with objectId: ' + project.id);
          return project.save ();
        }, (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        });

        this.projectName = '';
      },

    },
  }
</script>

<style scoped>
</style>