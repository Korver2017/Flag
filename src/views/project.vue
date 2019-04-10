<template>
  <div>

    <li class="list-group-item list-group-item-primary mt-5" v-for="project in projects" :key="project">

      <h3>Project： {{ project }}</h3>
      <router-link to="/issues">Issues</router-link>
      
      <!-- <issue :issues="issues" /> -->
      <issue />

    </li>

  </div>
</template>

<script>
  import Issue from "@/components/issue.vue";

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


    data () {
      return {
        issues: ['落實半夜 3 點 call 起來尿尿'],
      }
    },


    props: ['projects'],
  }
</script>

<style scoped>
  
</style>