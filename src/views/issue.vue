<template>
  <div class="container my-4">
    <!-- <h3>Issue Component</h3> -->
    <h3 class="text-left">{{ title }}</h3>

    <div class="card text-left">
      <h4 class="card-body py-5">
        {{ content }}
      </h4>
    </div>

    <div v-for="comment in comments" class="card text-left">
      <div class="card-body">
        {{ comment }}
      </div>
    </div>

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
        comments: [],
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

      let $vmc = this;
      let ary = [];

      const Issue = Parse.Object.extend ("Issue");
      let query = new Parse.Query (Issue);
      query.get ($vmc.issueId)
        .then (resp => {
          let content = resp.get ('content');
          $vmc.content = content;

          let title = resp.get ('name');
          $vmc.title = title;
        })
        .then (() => {
          const Comment = Parse.Object.extend ("Comment");
          let query = new Parse.Query (Comment);
          query.equalTo ('issueId', $vmc.issueId);
          query.find ()
            .then (resp => {
              for (let i = 0; i < resp.length; i ++) {
                var object = resp[i];
                ary.push (object.get ('content'));
                $vmc.comments = ary;
              }
            });

        });


      
    },


    watch: {
    }
  }
</script>

<style scoped>
  
</style>