<template>
  <div id="app" class="mt-5">

    <div class="col-3 input-group mb-3 mx-auto">
      <input v-model.trim="stashProjectName" type="text" class="form-control" placeholder="" aria-label="Project name" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button @click="addProject ()" class="btn btn-outline-success" type="button" id="button-addon2">Add project</button>
      </div>
    </div>

    <!-- <project :projects="projects" /> -->

    <template>
      <li class="list-group-item list-group-item-primary mt-5" v-for="(project, i) in projects">

        <h3>Project： {{ project.projectName[i] }}</h3>
        <button class="mt-3 btn btn-warning" @click="editProjectName (i)">Edit Project Name</button>
        
        <issue :issuesData="project.issueGroup" />

      </li>
    </template>

    
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
  import Issue from '@/views/issue.vue';


  import { eventBus } from "@/main.js";


  export default {


    name: 'Home',


    /**
     *
     * Inner components
     *
     */
    components: {
      Issue,
    },


    created () {
      let $vmc = this;

      eventBus.$on ('newIssue', (issue, i) => {
        // console.log (issue);
        this.projectData.issueGroup.push ({
          title: issue,
          issueContent: '#2',
          comments: ['#2'],
        });
      });
    },


    data () {
      return {
        projects: [
          // {
          //   title: '#1 Issue-1',
          //   issueContent: 'Issue-content',
          //   comments: ['Comment-1'],
          // },
          // {
          //   '#2': [
          //     {
          //       title: '#2',
          //       issueContent: '#2',
          //       comments: ['#2'],
          //     },
          //   ],
          // }
        ],
        stashProjectName: 'Project-1',
        projectData: {
          projectName: [],
          issueGroup: [
            {
              title: '#1 Issue-1',
              issueContent: 'Issue-content',
              comments: ['Comment-1'],
            },
          ],
        },
        projectDataEmpty: {
          // projectName: '',
          issueGroup: [
            {
              title: '',
              issueContent: '',
              comments: [],
            },
          ],
        },
      }
    },

    
    methods: {
      addProject () {

        if (this.stashProjectName === '') return;

        this.projectData.projectName.push (this.stashProjectName);
        this.projects.splice (0, 0, this.projectData);

        // let name = this.stashProjectName;
        // let obj = {};
        // obj[this.stashProjectName] = [{
        //         title: '',
        //         issueContent: '',
        //         comments: [],
        //       }];

        // this.projects.splice (0, 0, obj)

        this.stashProjectName = '';
      },

      editProjectName (i) {
        let $vmc = this;

        console.log ($vmc.projects[i]);
        console.log ($vmc.projects[i].projectName);

        $vmc.projects[i].projectName.splice (i, 1, 'qq');
      }
    },


  }
</script>
