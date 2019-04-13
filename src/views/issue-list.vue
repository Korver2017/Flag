<template>
  <div class="container my-4">
    <h1 class="my-4">{{ title }}</h1>

    <div v-for="issueTitle in issuesTitle" class="list-group">
      <button type="button" class="list-group-item list-group-item-action">
        {{ issueTitle }}
      </button>
    </div>

  </div>
</template>

<script>
  export default {
    

    name: 'issue-list',


    data () {
      return {
        title: 'Issue-List Component',
        issuesTitle: ['Issue 1.1', 'Issue 1.2', 'Issue 1.2.1']
      }
    }
  }
</script>

<style scoped>
  
</style>