<template>
  <div class="container my-4">

      <div class="row" v-if="editTitle === false">
        <h3 class="text-left">{{ title }} - Created by {{ creator }}</h3>
        <button class="btn btn-warning ml-5" @click="editTitle = true">Edit Title</button>
      </div>

      <div v-else class="row">

        <input @keyup.enter="changeTitle" v-model="stashTitle" type="text" class="col-6 form-control" placeholder="New Title" aria-label="New Title" aria-describedby="button-addon2">

        <button @click="changeTitle" class="ml-3 btn btn-success" type="button" id="button-addon2">Submit</button>
        <button @click="cancelChange" class="ml-3 btn btn-danger" type="button" id="button-addon2">Cancel</button>
        
      </div>

    
    <div class="row">
      <span v-for="label in labels" class="py-2 px-3 mx-1 badge badge-primary" v-if="label.added === true">{{ label.title }}</span>
    </div>
    <hr />
    
    <div class="row">

      <div class="col-9">

        <div class="row mb-3">
          <p class="text-left mb-0">
            Commented by <span class="font-weight-bold">{{ creator }}</span>
          </p>

          <button v-if="editing === false" class="ml-auto mr-5 btn btn-warning" @click="editIssueContent">Edit</button>
        </div>

        <form v-if="editing === true" class="mx-auto my-5">

          <div class="form-group text-left">
            <label @keyup.enter="newContent" for="stashIssueContent">Comment</label>
            <textarea v-model="stashIssueContent" placeholder="Comment Here" class="form-control" id="stashIssueContent" rows="10"></textarea>
          </div>

          <button @click.prevent="newContent" class="mx-3 btn btn-success">Submit</button>
          <button @click.prevent="cancelEdit" class="mx-3 btn btn-danger">Cancel</button>

        </form>

          

        <vue-markdown v-if="content.length > 0" class="p-4 border border-success text-left" :source="content"></vue-markdown>
        <p v-else class="p-4 border border-success text-left font-italic">No description provided.</p>


        <!-- Comment -->


        <div class="mt-5" v-for="(comment, index) in comments">
          <div class="row mb-3">
            <p class="text-left mb-0">
              Commented by <span class="font-weight-bold">{{ comment.commentor }}</span>
            </p>
            <div class="row ml-auto mr-5">
              <button class="btn mr-3 btn-warning" @click="editComment (comment.commentId, index)">Edit</button>
              <button class="btn btn-danger" @click="deleteComment (comment.commentId, index)">Delete</button>
            </div>
          </div>

          <vue-markdown v-if="comment.commentEditing === false" class="p-4 border border-success text-left" :source="comment.content"></vue-markdown>

          <form v-else class="mx-auto my-5">

            <div class="form-group text-left">
              <label for="commentContent">Edit Comment</label>
              <textarea v-model="stashComment" placeholder="Comment Here" class="form-control" id="commentContent" rows="10"></textarea>
            </div>
            <button @click.prevent="editedComment (comment.commentId, index)" class="mx-3 btn btn-success">Submit</button>
            <button @click.prevent="cancelEditComment (index)" class="mx-3 btn btn-danger">Cancel</button>

          </form>

        </div>



        <form class="mx-auto my-5">

          <div class="form-group text-left">
            <label for="content">New Comment</label>
            <textarea v-model="commentText" placeholder="Comment Here" class="form-control" id="content" rows="10"></textarea>
          </div>
          <button @click.prevent="addComment" class="mx-3 btn btn-success">Add Comment</button>

        </form>
        
      </div>
    
      <!-- Toggle Label -->
      <!-- Add or Remove Label -->

      <div class="col-3">

        <button v-for="(label, index) in labels" @click="toggleLabel (label.added, label.labelId, index)" class="my-3 d-block btn btn-primary">{{ label.title }}</button>
        <hr />


        <!-- New / Edit Label -->
      
        <p class="mt-5">New Label</p>
        <div class="row">
          <input @keyup.enter="addLabel" v-model.trim="newLabel" type="text" class="col-8 form-control" placeholder="New Label" aria-label="New Label" aria-describedby="button-addon2">

          <button @click="addLabel" class="btn btn-success" type="button" id="button-addon2">Submit</button>
        </div>
        
        <p class="mt-5">Edit Label</p>
        <template v-for="(label, index) in labels">
        
          <button @click="editLabel (label.labelId, index)" class="my-3 d-block btn btn-warning">{{ label.title }}</button>

          <div class="text-left" v-if="label.editMode === true">
            <input @keyup.enter="updateLabel (label.labelId, index)" v-model.trim="updateLabelTitle" type="text" class="mb-3 col-8 form-control" placeholder="Update Label" aria-label="Update Label" aria-describedby="button-addon2">

            <button @click="updateLabel (label.labelId, index)" class="btn btn-success" type="button" id="button-addon2">Submit</button>
            <button @click="cancelUpdate (index)" class="ml-3 btn btn-danger" type="button" id="button-addon2">Cancel</button>
          </div>
        </template>
      
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
        editTitle: false,
        stashTitle: '',
        creator: '',
        commentor: '',
        comments: [],
        commentText: '',
        labels: [],
        label: [],
        newLabel : '',
        updateLabelTitle: '',
        editing: false,
        stashIssueContent : '',
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
      },
    },


    mounted () {

      this.showIssueInfo ();
      this.allLabel ();
      this.showComment ();

    },


    methods: {

      
      showIssueInfo () {

        let $vmc = this;
        let ary = [];

        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);
        query.get ($vmc.issueId)
          .then (resp => {
            $vmc.title = resp.get ('name');
            $vmc.creator = resp.get ('creator');
            $vmc.content = resp.get ('content');
          });
          
      },

      
      addComment () {
        let $vmc = this;
        let Comment = Parse.Object.extend ('Comment');
        let comment = new Comment ();

        comment.set ('content', $vmc.commentText);
        comment.set ('issueId', $vmc.issueId);
        comment.set ('commentor', $vmc.$store.state.user.username);

        comment.save ()
          .then (resp => {
            $vmc.commentText = '';
            $vmc.showComment ();
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
        query.notEqualTo ("title", "");
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i++) {
              let obj = {};
              let object = resp[i];
              obj.labelId = object.id;
              obj.title = object.get ('title');
              obj.added = false;
              obj.editMode = false;
              ary.push (obj);

              let arry = [];
              let query = new Parse.Query (Label);
              query.equalTo ('issueId', $vmc.issueId);
              query.find ()
                .then (resp => {
                  for (let i = 0; i < resp.length; i ++) {
                    let obj = {};
                    let object = resp[i];
                    for (let i = 0; i < $vmc.labels.length; i ++) {
                      if ($vmc.labels[i].labelId === object.id) {
                        $vmc.labels[i].added = true;
                        arry.push ($vmc.labels[i]);
                      }
                    }
                  }
                })
              $vmc.label = arry;
            }
          });
        $vmc.labels = ary;
      },


      showComment () {
        let $vmc = this;
        let ary = [];
        let Comment = Parse.Object.extend ('Comment');
        let query = new Parse.Query (Comment);
        query.equalTo ('issueId', $vmc.issueId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let object = resp[i];
              obj.commentId = object.id;
              obj.content = object.get ('content');
              obj.commentor = object.get ('commentor');
              obj.commentEditing = false;
              obj.stashComment = '';
              ary.push (obj);
            }
          });
          $vmc.comments = ary;

      },


      toggleLabel (added, labelId, index) {
        let $vmc = this;
        
        $vmc.labels[index].added = !$vmc.labels[index].added;

        if ($vmc.labels[index].added === true) {
          let Label = Parse.Object.extend ("Label");
          let query = new Parse.Query (Label);
        
          query.get (labelId)
            .then (resp => {
              resp.addUnique ('issueId', $vmc.issueId);
              resp.save ();
            });
        } else {
          let Label = Parse.Object.extend ("Label");
          let query = new Parse.Query (Label);
          query.get (labelId)
            .then (resp => {
              resp.remove ("issueId", $vmc.issueId);
              resp.save ();
            });
        }
          
      },


      addLabel () {
        let $vmc = this;
        var Label = Parse.Object.extend ('Label');
        var label = new Label ();

        label.set ('title', $vmc.newLabel);
        label.set ('issueId', []);
        $vmc.newLabel = '';

        label.save ()
          .then (resp => {
            // Execute any logic that should take place after the object is saved.
            $vmc.allLabel ();
            alert ('New object created with objectId: ' + resp.id);
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert ('Failed to create new object, with error code: ' + error.message);
          });
      },


      editLabel (labelId, index) {
        let $vmc = this;

        for (let i = 0; i < $vmc.labels.length; i ++) {
          $vmc.labels[i].editMode = false;
        }

        $vmc.labels[index].editMode = true;

      },


      updateLabel (labelId, index) {
        let $vmc = this;
        let Label = Parse.Object.extend ('Label');
        let query = new Parse.Query (Label);

        $vmc.labels[index].title = $vmc.updateLabelTitle;
        query.get (labelId)
          .then (resp => {
            // Now let's update it with some new data. In this case, only cheatMode and score
            // will get sent to the cloud. playerName hasn't changed.
            resp.set ('title', $vmc.updateLabelTitle);
            resp.save ()
              .then (() => {
                $vmc.updateLabelTitle = '';
                $vmc.labels[index].editMode = false;
              });
            
          }, (error) => {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          });
        $vmc.showIssueInfo ();
      },


      cancelUpdate (index) {
        let $vmc = this;
        $vmc.updateLabelTitle = '';
        $vmc.labels[index].editMode = false;
        
      },


      changeTitle () {
        let $vmc = this;
        $vmc.title = $vmc.stashTitle;
        $vmc.editTitle = false;

        let Issue = Parse.Object.extend ("Issue");
        let query = new Parse.Query (Issue);
        
        query.get ($vmc.issueId)
        .then (resp => {
          resp.set ('name', $vmc.title);
          return resp.save();
          // The object was retrieved successfully.
        }, (error) => {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
        });
      },


      cancelChange () {
        let $vmc = this;
        $vmc.stashTitle = '';
        $vmc.editTitle = false;
      },


      editIssueContent () {
        let $vmc = this;
        $vmc.editing = true;
        $vmc.stashIssueContent = $vmc.content;
      },


      newContent () {
        let $vmc = this;
        $vmc.content = $vmc.stashIssueContent;

        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);
        query.get ($vmc.issueId)
          .then (resp => {
            resp.set ('content', $vmc.content);
            return resp.save ();
          })
        

        $vmc.editing = false;
      },


      cancelEdit () {
        let $vmc = this;
        $vmc.stashIssueContent = $vmc.content;
        $vmc.editing = false;
      },


      editComment (commentId, index) {
        let $vmc = this;
        $vmc.comments[index].commentEditing = true;
        $vmc.stashComment = $vmc.comments[index].content;
      },


      editedComment (commentId, index) {
        let $vmc = this;
        $vmc.comments[index].content = $vmc.stashComment;
        $vmc.comments[index].commentEditing = false;

        let Comment = Parse.Object.extend ('Comment');
        let query = new Parse.Query (Comment);
        
        query.get (commentId)
        .then (resp => {
          resp.set ('content', $vmc.stashComment);
          return resp.save();
          // The object was retrieved successfully.
        }, (error) => {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
        });
      },


      cancelEditComment (index) {
        let $vmc = this;
        $vmc.comments[index].commentEditing = false;
      },


      deleteComment (commentId, index) {
        let $vmc = this;
        let Comment = Parse.Object.extend ('Comment');
        let query = new Parse.Query (Comment);
        query.get (commentId)
        .then (resp => {
          if (confirm ('確定刪除此評論？')) {
            resp.destroy ()
            .then (() => {
              $vmc.showComment ();
            })
          }
          else return;
          
          // The object was retrieved successfully.
        }, (error) => {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
        });

        console.log ('delete');
      },
      

    },


    watch: {
    }
  }
</script>

<style scoped>
  
</style>