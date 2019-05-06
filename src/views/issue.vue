<template>
  <div class="container my-4">

    <h3 class="text-left">{{ title }} - Created by {{ creator }}</h3>
      <template v-for="label in labels">
        <span class="py-2 px-3 mx-1 badge badge-primary" v-if="label.added === true">{{ label.title }}</span>
      </template>
    <hr />
    <!-- <div class="d-flex flex-row bd-highlight">
      <span v-for="l in label" class="py-2 px-3 mx-1 badge badge-primary">{{ l }}</span>
    </div>
    <div>{{ label }}</div> -->
    
    <div class="row">
      <hr />
        <div class="col-9">

          <!-- <div class="mt-5 card text-left"> -->
            <!-- <h4 class="card-body py-5"> -->
          <p class="text-left mt-4 mb-0">
            Commented by <span class="font-weight-bold">{{ creator }}</span>
          </p>

          <p v-if="content.length === 0" class="p-4 border border-success text-left font-italic font-weight-lighter">No description provided.</p>

          <vue-markdown v-else class="p-4 border border-success text-left" :source="content"></vue-markdown>

              <!-- {{ content }} -->
            <!-- </h4> -->
          <!-- </div> -->
          <template v-for="comment in comments">
            <p class="text-left mt-4 mb-0">
              Commented by <span class="font-weight-bold">{{ comment.commentor }}</span>
            </p>

            <!-- <div class="card-body"> -->
              <vue-markdown class="p-4 border border-success text-left" :source="comment.content"></vue-markdown>
              <!-- {{ comment.content }} -->
            <!-- </div> -->
          </template>

          <form class="mx-auto my-5">
            <div class="form-group text-left">
              <label @keyup.enter="addComment" for="content">Comment</label>
              <textarea v-model="commentText" placeholder="Issue content" class="form-control" id="content" rows="10"></textarea>
            </div>
            <button @click.prevent="addComment" class="mx-3 btn btn-success">Add Comment</button>
            <!-- <button @click.prevent="cancel" class="mx-3 btn btn-danger">Cancel</button> -->
          </form>
        </div>
      

      <div class="col-3">

        <button v-for="(label, index) in labels" @click="toggleLabel (label.added, label.labelId, index)" class="my-3 d-block btn btn-success">{{ label.title }}, {{ label.added }}</button> <br />
        <!-- <button v-for="label in labels" @click="removeLabel (label.labelId)" class="my-3 d-block btn btn-danger">{{ label.title }}</button> <br /> -->

        <div>{{ labels }}</div>

      </div>
    </div>

  </div>
    

</template>

<script>
  import Parse from "parse";
  import VueMarkdown from "vue-markdown";


  export default {
    

    name: 'issue',


    components: {
      VueMarkdown,
    },


    data () {
      return {
        content: '',
        title: '',
        creator: '',
        commentor: '',
        comments: [],
        commentText: '',
        labels: [],
        label: [],
      }
    },


    created () {
      // Add Label

      // let Label = Parse.Object.extend ("Label");
      // let label = new Label ();

      // label.set ('title', 'Feature');
      // label.set ('title', 'Bug');
      // label.set ('title', 'Hotfix');
      // label.set ('title', 'Enhancement');
      // label.set ('title', 'Done');

      // label.save()
      //   .then((label) => {
      //     alert('New object created with objectId: ' + label.id);
      //   }, (error) => {
      //     // Execute any logic that should take place if the save fails.
      //     // error is a Parse.Error with an error code and message.
      //     alert('Failed to create new object, with error code: ' + error.message);
      //   });
    },


    computed: {
      issueId () {
        return this.$route.params.issueId; 
      }
    },


    mounted () {
      let $vmc = this;

      $vmc.showComment ();
      $vmc.allLabel ();
      $vmc.showLabel ();

      console.log ($vmc.issueId);

      // console.log ($vmc.labels);
    },


    methods: {

      
      showComment () {

      let $vmc = this;
      let ary = [];

      const Issue = Parse.Object.extend ("Issue");
      let query = new Parse.Query (Issue);
      query.get ($vmc.issueId)
        .then (resp => {
          $vmc.content = resp.get ('content');
          $vmc.title = resp.get ('name');
          $vmc.creator = resp.get ('creator');
        })
        .then (() => {
          const Comment = Parse.Object.extend ("Comment");
          let query = new Parse.Query (Comment);
          query.equalTo ('issueId', $vmc.issueId);
          query.find ()
            .then (resp => {
              for (let i = 0; i < resp.length; i ++) {
                let obj = {};
                let object = resp[i];
                obj.content = object.get ('content');
                obj.commentor = object.get ('commentor');
                ary.push (obj);
              }
              $vmc.comments = ary;
            });

        });
      },

      
      addComment () {

        
        let $vmc = this;
        let Comment = Parse.Object.extend ("Comment");
        let comment = new Comment ();

        comment.set ('content', $vmc.commentText);
        comment.set ('issueId', $vmc.issueId);
        comment.set ('commentor', $vmc.$store.state.user.username);

        comment.save()
          .then((comment) => {
            $vmc.showComment ();
            alert('New object created with objectId: ' + comment.id);
            $vmc.commentText = '';
            $vmc.commentText = '';
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
          });
      },


      allLabel () {
        let $vmc = this;
        let Label = Parse.Object.extend ("Label");
        let query = new Parse.Query (Label);
        let ary = [];
        query.notEqualTo ("title", "qq");
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i++) {
              let obj = {};
              let object = resp[i];
              obj.labelId = object.id;
              obj.title = object.get ('title');
              obj.added = false;
              ary.push (obj);
            }
          });
        $vmc.labels = ary;
        // console.log ($vmc.labels);
      },


      showLabel () {
        let $vmc = this;
        let ary = [];
        let Label = Parse.Object.extend ("Label");
        let query = new Parse.Query (Label);
        query.equalTo ('issueId', $vmc.issueId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let object = resp[i];
              // console.log (object.id);
              // $vmc.labels.labelId = object.id;
              // $vmc.labels.title

              
              // obj.labelId = object.id;
              // obj.title = object.get ('title');
              // console.log ($vmc.labels);
              // obj.added = true;
              for (let i = 0; i < $vmc.labels.length; i ++) {
                if ($vmc.labels[i].labelId === object.id) {
                  $vmc.labels[i].added = true;
                  ary.push ($vmc.labels[i]);
                }
              }
              
            }
          })


        $vmc.label = ary;
      },


      toggleLabel (added, labelId, index) {
        let $vmc = this;
        
        $vmc.labels[index].added = !$vmc.labels[index].added;

        // console.log ($vmc.labels);
        


        // let Label = Parse.Object.extend ("Label");
        // let query = new Parse.Query (Label);
      
        // query.get (labelId)
        //   .then (resp => {
        //     resp.addUnique ("issueId", $vmc.issueId);
        //     resp.save ();
            
        //   })
        //   .then (() => {
        //     $vmc.showLabel ()
        //   });
          
      },


      // removeLabel (labelId) {
      //   let $vmc = this;

      //   let Label = Parse.Object.extend ("Label");
      //   let query = new Parse.Query (Label);
      
      //   query.get (labelId)
      //     .then (resp => {
      //       resp.remove ("issueId", $vmc.issueId);
      //       resp.save ();
            
      //     })
      //     .then (() => {
      //       $vmc.showLabel ();
      //     })
      // },
    },


    // beforeRouteLeave (to, from, next) {
    //   let $vmc = this;
    //   // let id = $vmc.issueId;
    //   // console.log (id);
    //   // console.log ($vmc.labels);
    //   let Label = Parse.Object.extend ("Label");
    //   let query = new Parse.Query (Label);
    //   let ary = [];
    
    //   for (let i = 0; i < $vmc.labels.length; i ++) {
    //     query.get ($vmc.labels[i].labelId)
    //       .then ((resp) => {
    //         console.log (resp);
    //         // console.log ($vmc.issueId);
    //         // resp.addUnique ("issueId", $vmc.issueId);
    //         // console.log ($vmc.issueId);
    //         // resp.save ();
    //       })
        
    //     // console.log (ary);
    //   }

    //   // .then (() => {
    //   //       console.log ('kk');
    //   //       next ();
    //   //     })
      
    //   // query.get ()
    //   //   .then (resp => {
    //   //     resp.addUnique ("issueId", $vmc.issueId);
    //   //     resp.save ();
    //   //   });
      
    // },


    watch: {
    }
  }
</script>

<style scoped>
  
</style>