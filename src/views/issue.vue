<template>
  <div class="container mt-5">
    <div class="col-6 input-group mb-3 mx-auto">
      <input v-model.trim="issue" type="text" class="form-control" placeholder="New issue" aria-label="New issue" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button @click="addIssue ()" class="btn btn-outline-success" type="button" id="button-addon2">Add issue</button>
      </div>
      <br />
    </div>




    <!-- issue list -->

    


    <li class="mt-5 py-5 bg-info text-white list-group-item" v-for="(issue, i) in issueGroup">
      <h3>Issue： {{ issue.title }}</h3><button @click="editContent" class="btn btn-warning">編輯 Issue 內容</button>

      <div class="bg-primary text-white py-5 mx-auto my-3 col-6" v-if="showEditForm !== true">
        <h3>Issue content</h3>
        <p v-if="issue.issueContent === '' ? issue.issueContent = '無 Issue 內容描述' : issue.issueContent">
          {{ issue.issueContent }}
        </p>
      </div>

      <form v-if="showEditForm === true">
        <div class="form-group col-6 mx-auto">
          <label for="exampleFormControlTextarea1">編輯 Issue</label>
          
          <textarea v-model="stashIssueContent" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <template>
          <button class="btn btn-success mr-3" @click.prevent="finishEdit (i)">完成編輯</button>
          <button class="btn btn-danger" @click.prevent="cancelEdit">取消編輯</button>
        </template>
      </form>

      <!-- <template v-if="showEditForm !== true"> -->
      <template v-for="(comment, c) in issue.comment">
        <div class="bg-secondary text-white issueContent mx-auto my-3 py-5 col-6">
          <h3>Comment</h3>
          {{ comment }}
          <br />
          <div class="mt-5">
            <button @click="editComment (i, c)" class="mx-1 btn btn-primary">編輯評論</button>
            <!-- <button @click="editComment (index)" class="mx-1 btn btn-primary">刪除評論</button> -->
          </div>
        </div>

          <!-- <template>
            <button class="btn btn-outline-success mr-3">完成編輯</button>
            <button class="btn btn-outline-danger">取消編輯</button>
          </template> -->
        
      </template>

      <form v-if="showEditForm !== true">
        <div class="form-group col-6 mx-auto">
          <label for="exampleFormControlTextarea1">Comment here</label>
          
          <textarea v-model.trim="stashCommentInfo" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
      </form>

      <button :disabled="stashCommentInfo === ''" class="btn btn-secondary" @click="addComment">Add a comment</button>

    </li>

  </div>
</template>

<style lang="scss">
</style>

<script>
  export default {


    /**
     *
     * Component name
     *
     */
    name: 'issue',


    /**
     *
     * Inner components
     *
     */
    components: {
      Comment,
    },


    // props: ['issues'],
    props: ['issueGroup'],


    data () {
      return {
        // issues: ['落實半夜 3 點 call 起來尿尿'],
        issue: '',
        // edit: false,
        showEditForm: false,
        finished: false,
        // issueContent: 'Fake content',
        issueContent: '',
        stashIssueContent: '',
        comments: ['Wake 起床尿尿了'],
        // comment: '',
        // getComment: '',
        commentInfo: '',
        stashCommentInfo: '',
      }
    },


    // computed: {
    //   getComment: {
    //     get () {
    //       console.log('computed getter');
    //     },
    //     set (value) {
    //       console.log(value);
    //     }
    //   }
    // },

    
    methods: {
      addIssue () {
        if (this.issue === '') return;

        this.issues.push (this.issue);
        this.issue = '';
      },


      editContent () {
        this.showEditForm = true;
        this.finished = false;
        this.stashIssueContent = this.issueContent;
      },
      

      finishEdit (i) {
        this.finished = true;
        this.showEditForm = false;
        this.issueContent = this.stashIssueContent;
        this.$emit ('changeIssueContent', this.issueContent, i);
      },


      cancelEdit () {
        this.finished = true;
        this.showEditForm = false;

      },


      addComment () {
        this.commentInfo = this.stashCommentInfo;
        this.comments.push (this.commentInfo);
        this.stashCommentInfo = '';
      },

      editComment (i, c) {
        this.$emit ('editComment', 'edited', i, c);
      }
    },
  }
</script>
