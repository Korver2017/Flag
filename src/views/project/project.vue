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

<script>
  import Issue from "@/views/issue.vue";

  import { eventBus } from "@/main.js";

  export default {
    

    /**
     *
     * Component name
     *
     */
    name: 'project',


    /**
     *
     * Inner components
     *
     */
    components: {
      Issue,
    },


    props: ['projects'],


    created () {
      // eventBus.$on ('newIssue', issue => {
      //   console.log (issue);


      // });
    },


    methods: {
      editProjectName (i) {
        this.projects[i].projectName = 'qq';
      },
    },

  }
</script>

<style scoped>
  
</style>