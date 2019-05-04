<template>
  <div class="container my-4">
    <h3>Issue Component</h3>
    <h3>{{ issueId }}</h3>

  </div>
    

</template>

<script>
  import Parse from "parse";


  export default {
    

    name: 'issue',


    computed: {
      issueId () {
        return this.$route.params.issueId; 
      }
    },
  }
</script>

<style scoped>
  
</style>