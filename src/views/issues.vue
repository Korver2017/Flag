<template>
  <div class="container mt-5">
    <div class="col-6 input-group mb-3 mx-auto">
      <input v-model.trim="issue" type="text" class="form-control" placeholder="New issue" aria-label="New issue" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button @click="addIssue ()" class="btn btn-outline-success" type="button" id="button-addon2">Add issue</button>
      </div>
      <br />
    </div>
      
    <li v-for="issue in issues" :key="issue">
      Issue： {{ issue }} --- <button @click="editContent" class="btn btn-warning">編輯內容</button>

      <div class="issueContent mx-auto my-3 col-6" v-if="showEditForm !== true">
        <h3>This is issue content</h3>
        {{ issueContent !== '' ? issueContent : '目前尚無內容' }}
      </div>

      <form v-if="showEditForm === true">
        <div class="form-group col-6 mx-auto">
          <label for="exampleFormControlTextarea1">編輯內容</label>
          
          <textarea v-model="stashIssueContent" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <template>
          <button class="btn btn-outline-success mr-3" @click.prevent="finishEdit">完成編輯</button>
          <button class="btn btn-outline-danger" @click.prevent="cancelEdit">取消編輯</button>
        </template>
      </form>

      <!-- <template v-if="showEditForm !== true"> -->
      <template>
        <div v-for="(list, index) in comments" class="issueContent mx-auto my-3 col-6">
          <h3>This is comment area under an issue</h3>
          {{ list.comment }}
          <br />
          <template>
            <button @click="editComment (index)" class="btn btn-outline-primary">編輯評論</button>
            <button @click="editComment (index)" class="btn btn-outline-primary">刪除評論</button>
          </template>
        </div>

        <form v-if="showEditForm !== true">
          <div class="form-group col-6 mx-auto">
            <label for="exampleFormControlTextarea1">Comment here</label>
            
            <textarea v-model.trim="stashCommentInfo" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

          <!-- <template>
            <button class="btn btn-outline-success mr-3">完成編輯</button>
            <button class="btn btn-outline-danger">取消編輯</button>
          </template> -->
        </form>

        <button :disabled="stashCommentInfo === ''" class="btn btn-outline-secondary" @click="addComment">Add a comment</button>
      </template>

    </li>

  </div>
</template>

<style lang="scss">
.issueContent {
  border: 1px solid #000;
  padding: 100px 0;
}

</style>

<script>

  export default {
    name: 'issues',


    data () {
      return {
        issues: ['落實半夜 3 點 call 起來尿尿'],
        issue: '',
        // edit: false,
        showEditForm: false,
        finished: false,
        issueContent: 'Fake content',
        stashIssueContent: '',
        comments: [{comment: 'Wake 起床尿尿了'}],
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
      

      finishEdit () {
        this.finished = true;
        // this.showEditForm = false;
        this.issueContent = this.stashIssueContent;
      },


      cancelEdit () {
        this.finished = true;
        this.showEditForm = false;

      },


      addComment () {
        this.commentInfo = this.stashCommentInfo;
        this.comments.push ({comment: this.commentInfo});
        this.stashCommentInfo = '';
      },

      editComment (index) {
        this.$set (this.comments[index], 'comment', 'qq');
      }
    },
  }
</script>
