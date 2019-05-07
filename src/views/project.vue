<template>
  <div class="container my-4">
    <h3 class="my-3 text-left">Project: {{ proName }}</h3>

    <div v-if="adding">

      <form class="col-8 mx-auto my-5">
        <div class="form-group text-left">
          <label @keyup.enter="submitIssue" for="title">Issue title</label>
          <input v-model="title" class="form-control" placeholder="Issue title" id="title">
        </div>
        <div class="form-group text-left">
          <label @keyup.enter="submitIssue" for="content">Issue content</label>
          <textarea v-model="content" placeholder="Issue content" class="form-control" id="content" rows="10"></textarea>
        </div>
        <button @click.prevent="submitIssue" class="mx-3 btn btn-success">Add Issue</button>
        <button @click.prevent="cancel" class="mx-3 btn btn-danger">Cancel</button>
      </form>
      
    </div>
    
    <button v-else class="my-3 btn btn-success" @click="addIssue">Add Issue</button>

    <div class="list-group" v-if="issues.length >= 1">

      <router-link :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="button" v-for="issue in issues" type="button" class="text-left list-group-item list-group-item-action" active-class="active">
        {{ issue.name }} - Created by <span class="font-weight-bold mr-3">{{ issue.creator }}</span>

        <span v-for="label in labels" class="py-2 px-3 mx-1 badge badge-primary">{{ label }}</span>
      </router-link>
      
    </div>

    <div v-else class="card text-left">
      <h4 class="card-body py-5 font-italic font-weight-lighter">
        There aren’t any open issues.
        No description provided.
      </h4>
    </div>

  </div>
    

</template>

<script>
  import Parse from "parse";

  export default {
    

    name: 'project',


    components: {
    },


    data () {
      return {
        proName: '',
        issues: [],
        adding: false,
        title: '',
        content: '',
        username: this.$store.state.user.username,
        labels: [],
      }
    },


    
      


    computed: {
      proId () {
        return  this.$route.params.proId;
      },
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

      // console.log ('project mounted');

      $vmc.showProName ();
      $vmc.showIssueName ();

    },


    methods: {

      showProName () {
        let $vmc = this;
        let id = $vmc.$route.params.proId;
        // console.log (id);

        const Pro = Parse.Object.extend ("Project");
        let query = new Parse.Query (Pro);
        query.get (id)
          .then (resp => {
            let name = resp.get ('name');
            $vmc.proName = name;
          })
      },

      showIssueName () {
        let $vmc = this;
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
            obj.creator = object.get ('creator');
            ary.push (obj);

            let arry = [];
            let Label = Parse.Object.extend ("Label");
            let query = new Parse.Query (Label);
            query.equalTo ('issueId', object.id);
            query.find ()
              .then (resp => {
                for (let i = 0; i < resp.length; i ++) {
                  let object = resp[i];
                  arry.push (object.get ('title'));
                  console.log ($vmc.labels);
                }
              })
            $vmc.labels = arry;
          }
        })
        $vmc.issues = ary;
      },


      showLabel () {
        
        // let $vmc = this;
        // let ary = [];
        // let Label = Parse.Object.extend ("Label");
        // let query = new Parse.Query (Label);
        // query.equalTo ('issueId', $vmc.issueId);
        // query.find ()
        //   .then (resp => {
        //     for (let i = 0; i < resp.length; i ++) {
        //       let obj = {};
        //       let object = resp[i];
        //       for (let i = 0; i < $vmc.labels.length; i ++) {
        //         if ($vmc.labels[i].labelId === object.id) {
        //           $vmc.labels[i].added = true;
        //           ary.push ($vmc.labels[i]);
        //         }
        //       }
        //     }
        //   })


        // $vmc.label = ary;
      },
      

      addIssue () {
        this.adding = true;
      },

      submitIssue () {
        let $vmc = this;

        let Issue = Parse.Object.extend ("Issue");
        let issue = new Issue ();

        issue.set ('name', $vmc.title);
        issue.set ('content', $vmc.content);
        issue.set ('proId', $vmc.proId);
        issue.set ('creator', $vmc.$store.state.user.username);

        issue.save()
          .then((issue) => {
            alert('New object created with objectId: ' + issue.id);
            $vmc.title = '';
            $vmc.content = '';
            $vmc.showIssueName ();
            $vmc.adding = false;
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
          });
      },

      cancel () {
        this.adding = false;
        this.title = '';
        this.content = '';
      }
    },

    watch: {
    }
  }
</script>

<style scoped>
  
</style>