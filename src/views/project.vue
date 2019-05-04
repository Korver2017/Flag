<template>
  <div class="container my-4">
    <h1 class="my-3">Project: {{ proName }}</h1>

    <div class="list-group">

      <router-link :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="button" v-for="issue in issues" type="button" class="text-left list-group-item list-group-item-action" active-class="active">
        <a>
          {{ issue }}
        </a>
      </router-link>

      
      
    </div>

  </div>
    

</template>

<script>
  import Parse from "parse";

  export default {
    

    name: 'project',


    data () {
      return {
        proName: '',
        issues: [],
      }
    },


    computed: {
      proId () {
        return  this.$route.params.proId;
      }
    },


    created () {


      // Add issue

      // let Issue = Parse.Object.extend ("Issue");
      // let issue = new Issue ();

      // issue.set ('name', 'Issue-1');

      // issue.save()
      //   .then((issue) => {
      //     alert('New object created with objectId: ' + issue.id);
      //   }, (error) => {
      //     // Execute any logic that should take place if the save fails.
      //     // error is a Parse.Error with an error code and message.
      //     alert('Failed to create new object, with error code: ' + error.message);
      //   });
    },


    mounted () {
      let $vmc = this;


      $vmc.showProName ();


      const Issue = Parse.Object.extend ("Issue");
      let query = new Parse.Query (Issue);
      query.equalTo ("proId", $vmc.proId);
      let ary = [];
      query.find().then (resp => {
        for (let i = 0; i < resp.length; i++) {
          let obj = {};
          let object = resp[i];
          obj.name = object.get ('name');
          obj.issueId = object.id;
          ary.push (obj);
        }
      })
      $vmc.issues = ary;


    },


    methods: {


      showProName () {
        let $vmc = this;
        let id = $vmc.$route.params.proId;
        console.log (id);

        const Pro = Parse.Object.extend ("Project");
        let query = new Parse.Query (Pro);
        query.get (id)
          .then (resp => {
            let name = resp.get ('name');
            $vmc.proName = name;
          })
      },
    },
  }
</script>

<style scoped>
  
</style>