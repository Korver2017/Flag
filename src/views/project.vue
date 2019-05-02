<template>
  <div class="container my-4">
    <h1>Project</h1>
    <h1>Project: {{ proId }}</h1>

    <div class="list-group">
      <button v-for="issue in issues" type="button" class="list-group-item list-group-item-action">
        {{ issue }}
      </button>
    </div>

  </div>
    

</template>

<script>
  import Parse from "parse";

  export default {
    

    name: 'project',


    data () {
      return {
        issues: [],
      }
    },


    computed: {
      proId () {
        return  this.$route.params.proId;
      }
    },


    created () {
    },


    mounted () {
      let $vmc = this;

      const Issues = Parse.Object.extend ("Issues");
      let query = new Parse.Query (Issues);
      query.equalTo ("projectId", $vmc.proId);
      let ary = [];
      query.find().then (resp => {
        for (let i = 0; i < resp.length; i++) {
          var object = resp[i];
          ary.push (object.get ('name'));
        }
      })
      $vmc.issues = ary;
    },


    methods: {

    },
  }
</script>

<style scoped>
  
</style>