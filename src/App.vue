<template>
  <div id="app" class="mt-5">

    <div class="col-3 input-group mb-3 mx-auto">

      <input v-model.trim="stashProjectName" type="text" class="form-control" placeholder="" aria-label="Project name" aria-describedby="button-addon2">

      <div class="input-group-append">
        <button @click="addProject ()" class="btn btn-outline-success" type="button" id="button-addon2">Add project</button>
      </div>

    </div>
      
      <template v-for="project in projects">

        <li class="list-group-item list-group-item-primary mt-5" v-for="(name, i) in project.projectName">

          <h3>Project： {{ name }}</h3>
          <button class="mt-3 btn btn-warning" @click="editProjectName (i)">Edit Project Name</button>

          <div class="col-6 input-group my-5 mx-auto">
            <input v-model.trim="newIssue" type="text" class="form-control" placeholder="" aria-label="" aria-describedby="button-addon2">

            <div class="input-group-append">
              <button @click="addIssue (i)" class="btn btn-primary" type="button" id="button-addon2">Add issue</button>
            </div>
            <br />
          </div>
          
          <issue :issuesData="project.issueGroup[i]" :position="i" />
          
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
    },


    data () {
      return {
        projects: [],
        stashProjectName: 'kk',
        projectData: {
          projectName: ['Project-1', 'Project-2'],
          issueGroup: [[
            {
              title: '#1 Issue-1',
              issueContent: 'Issue-content',
              comments: ['Comment-1'],
            },
            {
              title: '#1.1',
              issueContent: 'Issue-content',
              comments: ['Comment-1'],
            },
          ], [
            {
              title: '#2',
              issueContent: '66-content',
              comments: ['66-1'],
            },
          ]],
        },
        newIssue: '',
      }
    },

    
    methods: {
      addProject () {
        let $vmc = this;
        if ($vmc.stashProjectName === '') return;

        $vmc.projectData.projectName.push ($vmc.stashProjectName);
        $vmc.projects.push (0, 0, $vmc.projectData);
        $vmc.stashProjectName = '';
      },

      editProjectName (i) {
        let $vmc = this;

        $vmc.projectData.projectName.splice (i, 1, 'qq');
      },

      addIssue (i) {
        let $vmc = this;
        
        if ($vmc.projectData.issueGroup[i] === undefined) {
          $vmc.projectData.issueGroup[i] = new Array ();

          $vmc.projectData.issueGroup[i].splice (0, 0, {
            title: $vmc.newIssue,
            issueContent: '',
            comments: [$vmc.projectData.issueGroup[i]],
          });

          console.log ($vmc.projectData.issueGroup[i]);
        } else {
          $vmc.projectData.issueGroup[i].splice (0, 0, {
            title: $vmc.newIssue,
            issueContent: '',
            comments: [],
          });

          console.log ($vmc.projectData.issueGroup[i]);
        }
      }
    },

  }
</script>
