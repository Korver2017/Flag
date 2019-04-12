<template>
  <div class="container mt-5">
    




    <!-- issue list -->

    

    <li class="mt-5 py-5 bg-info text-white list-group-item">
      <template v-for="(data, i) in issuesData">
        <div class="col-6 input-group mb-3 mx-auto">
          <input v-model.trim="issue" type="text" class="form-control" placeholder="" aria-label="" aria-describedby="button-addon2">
          <div class="input-group-append">
            <button @click="addIssue (i)" class="btn btn-primary" type="button" id="button-addon2">Add issue</button>
          </div>
          <br />
        </div>
        
        <template v-if="data.title !== ''">
          <h3>Issue： {{ data.title }}</h3>
          
          <!-- <button @click="editContent" class="btn btn-warning">編輯 Issue 內容</button> -->
          <button class="btn btn-warning">編輯 Issue 內容</button>

          <!-- <div class="bg-primary text-white py-5 mx-auto my-3 col-6" v-if="showEditForm !== true"> -->
          <div class="bg-primary text-white py-5 mx-auto my-3 col-6">
            <h3>Issue content</h3>
            <p v-if="data.issueContent === '' ? data.issueContent = '無 Issue 內容描述' : data.issueContent">
              {{ data.issueContent }}
            </p>
          </div> 

          <!-- <form v-if="showEditForm === true"> -->
          <form>
            <div class="form-group col-6 mx-auto">
              <label for="exampleFormControlTextarea1">編輯 Issue</label>
              
              <textarea v-model="stashIssueContent" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <template>
              <button class="btn btn-success mr-3" @click.prevent="finishEdit (i)">完成編輯</button>
              <button class="btn btn-danger" @click.prevent="cancelEdit">取消編輯</button>
            </template>
          </form>
        </template>


          <!-- <comment :comments="data.comments" /> -->
        
      </template>
    </li>

  </div>
</template>

<style lang="scss">
</style>

<script>
  import Comment from "@/views/comment.vue";


  import { eventBus } from "@/main.js";


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
    props: ['issuesData'],


    data () {
      return {
        issue: '',
        stashIssueContent: '',
      }
    },


    computed: {
      // issues () {
      //   return this.groupValue = (Object.values (this.issueGroup)).map (item => Object.values (item));
      // }
    },

    
    methods: {
      addIssue (i) {
        if (this.issue === '') return;
        
        eventBus.$emit ('newIssue', this.issue, i);
      },


      // editContent () {
      //   this.showEditForm = true;
      //   this.finished = false;
      //   this.stashIssueContent = this.issueContent;
      // },
      

      // finishEdit (i) {
      //   this.finished = true;
      //   this.showEditForm = false;
      //   this.issueContent = this.stashIssueContent;
      //   this.$emit ('changeIssueContent', this.issueContent, i);
      // },


      // cancelEdit () {
      //   this.finished = true;
      //   this.showEditForm = false;

      // },


      // addComment () {
      //   this.commentInfo = this.stashCommentInfo;
      //   this.comments.push (this.commentInfo);
      //   this.stashCommentInfo = '';
      // },

      // editComment (i, c) {
      //   this.$emit ('editComment', 'edited', i, c);
      // }
    },


  }
</script>
