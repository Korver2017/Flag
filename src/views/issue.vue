<template>
  <div class="container my-4">
    <!-- <h3>Issue Component</h3> -->
    <h3 class="text-left">{{ title }} - {{ creator }}</h3>

    <div class="card text-left">
      <h4 class="card-body py-5">
        {{ content }}
      </h4>
    </div>

    <div v-for="comment in comments" class="card text-left">
      <div class="card-body">
        {{ comment.content }} - Message by <span class="font-weight-bold">{{ comment.commentor }}</span>
      </div>
    </div>

    <form class="col-8 mx-auto my-5">
      <div class="form-group text-left">
        <label @keyup.enter="addComment" for="content">Comment</label>
        <textarea v-model="commentText" placeholder="Issue content" class="form-control" id="content" rows="3"></textarea>
      </div>
      <button @click.prevent="addComment" class="mx-3 btn btn-success">Add comment</button>
      <!-- <button @click.prevent="cancel" class="mx-3 btn btn-danger">Cancel</button> -->
    </form>

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
        creator: '',
        commentor: '',
        comments: [],
        commentText: '',
      }
    },


    created () {
      // Add comment

      // let Comment = Parse.Object.extend ("Comment");
      // let comment = new Comment ();

      // comment.set ('content', 'Content, Lorem...');

      // comment.save()
      //   .then((comment) => {
      //     alert('New object created with objectId: ' + comment.id);
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
      this.showComment ();
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
        

      }
    },


    watch: {
    }
  }
</script>

<style scoped>
  
</style>