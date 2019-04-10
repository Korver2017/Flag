<template>
  <div>
    <h1>{{ title }}</h1>
    <li v-for="project in projects" :key="project">
      Project： {{ project }} - <router-link to="/issues">Issues</router-link>
    </li>

    <issues />

  </div>
</template>

<script>
  import Issues from "@/components/issues.vue";

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
      Issues,
    },

    data () {
      return {
        title: 'Project Component!'
      }
    },


    props: ['projects'],
  }
</script>

<style scoped>
  
</style>