<template>
  <div class="container mt-5 d-flex">
    
    <li v-for="issueData in issuesData" class="mt-5 py-5 bg-info text-white list-group-item">

      <h1>Issue： {{ issueData.title }}</h1>
      <button class="btn btn-warning">編輯 Issue 內容</button>

      <div class="bg-primary text-white py-5 mx-auto my-3 col-6">
        <h3>Issue content</h3>
        <p v-if="issueData.issueContent === '' ? issueData.issueContent = '無 Issue 內容描述' : issueData.issueContent">
          {{ issueData.issueContent }}
        </p>
      </div>

      <form>
        <div class="form-group col-6 mx-auto">
          <textarea v-model="stashIssueContent" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <button class="btn btn-success mr-3" @click.prevent="finishEdit (i)">完成編輯</button>
        <button class="btn btn-danger" @click.prevent="cancelEdit">取消編輯</button>
      </form>

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

    props: ['issuesData', 'position'],


    data () {
      return {
        issue: '',
        stashIssueContent: '',
      }
    },


    computed: {
    },

    
    methods: {
    },

  }
</script>
