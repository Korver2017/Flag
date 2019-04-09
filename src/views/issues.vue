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
      Issue： {{ issue }} --- <button @click="editContent = !editContent" class="btn btn-warning">編輯內容</button>

      <form v-if="editContent">
        <div class="form-group col-6 mx-auto">
          <label for="exampleFormControlTextarea1">編輯內容</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button class="btn btn-outline-success mr-3" @click="editContent = !editContent">完成編輯</button>
        <button class="btn btn-outline-danger" @click="editContent = !editContent">取消編輯</button>
      </form>

       <!-- - <router-link to="/">Home</router-link> -->
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
        editContent: false,
      }
    },

    
    methods: {
      addIssue () {
        if (this.issue === '') return;

        this.issues.push (this.issue);
        this.issue = '';
      },
      
    },
  }
</script>
