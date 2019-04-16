<template>
  <div class="container my-4">
    <h1 class="my-4">{{ title }}</h1>

        <div class="list-group">
          <a @click="showContent = !showContent" class="list-group-item list-group-item-action text-left">{{ issueTitle }}
            <span v-if="feature === true" class="badge badge-success text-right">
              Feature
            </span>
            <span v-if="bug === true" class="badge badge-danger text-right">
              bug
            </span>
          </a>

          <template v-if="showContent">
          <div class="text-left my-5 border border-primary">
            1. 新增 Issue <br />
            2. 新增 label
            <span v-if="feature === true" class="badge badge-success text-right">
              Feature
            </span>
            <span v-if="bug === true" class="badge badge-danger text-right">
              bug
            </span>
          </div>

          <div>
            <button @click="feature = !feature" class="btn btn-success">Feature</button>
            <button @click="bug = !bug" class="btn btn-danger">Bug</button>
          </div>

          </template>

        </div>

      </div>
    

</template>

<script>
  import Issue from "@/views/issue.vue";

  export default {
    

    name: 'issue-list',


    components: {
      Issue,
    },


    data () {
      return {
        title: 'Issue-List Component',
        issueTitle: '#1-Issue',
        showContent: false,
        feature: false,
        bug: false,
      }
    },


    methods: {
    },
  }
</script>

<style scoped>
  
</style>