<template>
  <div>
    <h1>{{ title }}</h1>
    <li v-for="project in projects" :key="project">
      Project： {{ project }} - <router-link to="/issues">Issues</router-link> - <router-link to="/">Home</router-link>
    </li>
  </div>
</template>

<script>
  export default {
    

    /**
     *
     * Component name
     *
     */
    name: 'project',


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