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

      <p v-if="showEditForm !== true">
        {{ issueContent !== '' ? issueContent : '目前尚無內容' }}
      </p>

    </li>

  </div>
</template>

<style lang="scss">
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
        issueContent: '',
        stashIssueContent: '',
      }
    },

    
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
        this.showEditForm = false;
        this.issueContent = this.stashIssueContent;
      },


      cancelEdit () {
        this.finished = true;
        this.showEditForm = false;

      },
    },
  }
</script>
