<template>
  <div class="container my-4">
    <h1 class="my-4">{{ title }}</h1>

    <template v-for="issueTitle in issuesTitle">

      <router-link to="/issue" active-class="" class="list-group">
        <button @click="showContent = !showContent" class="list-group-item list-group-item-action">{{ issueTitle }}</button>
      </router-link>
      
    </template>

    
    <router-view v-if="!showContent" />
    

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
        issuesTitle: ['Issue 1.1', 'Issue 1.2', 'Issue 1.2.1'],
        showContent: false,
      }
    }
  }
</script>

<style scoped>
  
</style>