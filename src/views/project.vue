<template>
  <div>

    <li class="list-group-item list-group-item-primary mt-5" v-for="project in projects" :key="project">

      <h3>Project： {{ project }}</h3>
      <router-link to="/issues">Issues</router-link>
      
      <template v-for="issues in issueGroup">
        <issue :issues="issues"  />
        <!-- <issue /> -->
      </template>

    </li>

  </div>
</template>

<script>
  import Issue from "@/views/issue.vue";

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
        issueGroup: [['落實半夜 3 點 call 起來尿尿', 'i2'], ['i2.1', 'i2.2']],
      }
    },


    props: ['projects'],
  }
</script>

<style scoped>
  
</style>