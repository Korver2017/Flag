<template>
  <div>
    <template >
      <li class="list-group-item list-group-item-primary mt-5" v-for="(project, i) in projects">

        <h3>Project： {{ project.projectName }}</h3>
        <!-- <button class="mt-3 btn btn-warning" @click="editProjectName (i)">Edit Project Name</button> -->
        
        <issue :issuesData="project.issueGroup" />

      </li>
    </template>
  </div>
</template>

<style lang="scss">
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
