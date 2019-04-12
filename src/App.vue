<template>
  <div id="app" class="mt-5">

    <div class="col-3 input-group mb-3 mx-auto">
      <input v-model.trim="stashProjectName" type="text" class="form-control" placeholder="" aria-label="Project name" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button @click="addProject ()" class="btn btn-outline-success" type="button" id="button-addon2">Add project</button>
      </div>
    </div>

    <!-- <project :projects="projects" /> -->

      <!-- <template v-for="(name, i) in project">
        <h1>{{ name }}</h1> -->
        <!-- <h1>{{ project[i] }}</h1> -->
      <!-- <template v-for="name in project">
        {{ name }}
      </template> -->
      
      <template v-for="project in projects">
        <li class="list-group-item list-group-item-primary mt-5" v-for="(name, i) in project.projectName">

          <!-- {{ project.issueGroup[0] }} -->
          <!-- <h1>{{ name }}</h1> -->

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
      <!-- </template> -->

    
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
        let $vmc = this;

        if (typeof $vmc.projectData.issueGroup[i] == 'undefined') {
          let arr = [];
          console.log (i);
          console.log (arr);
          arr.push ({
            title: issue,
            issueContent: '#2',
            comments: ['#2'],
          });
          console.log (arr);

          $vmc.$set ($vmc.projectData.issueGroup, i, arr);
        } else {
          $vmc.projectData.issueGroup[i].push ({
            title: issue,
            issueContent: '#2',
            comments: ['#2'],
          });
        }
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
        newIssue: '',
      }
    },

    
    methods: {
      addProject () {

        if (this.stashProjectName === '') return;

        this.projectData.projectName.push (this.stashProjectName);
        // this.projects.splice (0, 0, this.projectData);
        this.projects.push (0, 0, this.projectData);

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
        console.log ($vmc.projectData.projectName[i]);

        $vmc.projectData.projectName.splice (i, 1, 'qq');
      },

      addIssue (i) {
        let $vmc = this;
        
        console.log ('qq');

        $vmc.projectData.issueGroup[i].push ({
          title: $vmc.newIssue,
          issueContent: '',
          comments: [],
        });
        

      }
    },


  }
</script>
