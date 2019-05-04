<template>
  <div class="container my-4">
    <!-- <h3>Issue Component</h3> -->
    <h3 class="text-left">{{ title }}</h3>

    <div>{{ content }}</div>

  </div>
    

</template>

<script>
  import Parse from "parse";


  export default {
    

    name: 'issue',


    data () {
      return {
        content: '',
        title: '',
      }
    },


    computed: {
      issueId () {
        return this.$route.params.issueId; 
      }
    },


    mounted () {

      let $vmc = this;

      const Issue = Parse.Object.extend ("Issue");
      let query = new Parse.Query (Issue);
      query.get ($vmc.issueId)
        .then (resp => {
          let content = resp.get ('content');
          $vmc.content = content;

          let title = resp.get ('name');
          $vmc.title = title;
        })


      
    },


    watch: {
    }
  }
</script>

<style scoped>
  
</style>