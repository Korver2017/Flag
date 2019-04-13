<template>
  <div>
    <h1>{{ title }}</h1>
    
  </div>
</template>

<script>
  export default {
    

    name: 'issue-list',


    data () {
      return {
        title: 'Issue-List Component',
        projectData: {
          projectName: ['Project-1', 'Project-2'],
          issuesInfo: [[
            {
              title: '#1 Issue-1',
              issueContent: 'Issue-content',
              comments: ['Comment-1'],
            },
            {
              title: '#1.1',
              issueContent: 'Issue-content',
              comments: ['Comment-1'],
            },
          ], [
            {
              title: '#2',
              issueContent: '66-content',
              comments: ['66-1'],
            },
          ]],
        },
      }
    },
  }
</script>

<style scoped>
  
</style>