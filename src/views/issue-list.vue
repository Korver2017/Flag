<template>
  <div class="container my-4">
    <h1 class="my-4">{{ title }}</h1>

        <div class="list-group">
          <a @click="showContent = !showContent" class="list-group-item list-group-item-action text-left">{{ issueTitle }}<span v-if="feature === true" class="badge badge-success text-right">Feature</span></a>

          <template v-if="showContent">
          <div class="text-left my-5 border border-primary">
            1. 新增 Issue <br />
            2. 新增 label
            <span v-if="feature === true" class="badge badge-success text-right">Feature</span>
          </div>

          <div>
            <button @click="feature = !feature" class="btn btn-success">Feature</button>
          </div>

          </template>

        </div>

        

        

        <!-- <Issue v-if="showContent" @labelState="changeLabel" /> -->
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
      }
    },


    methods: {
      changeLabel (val) {
        console.log (val);

        this.feature = val;
      }
    },
  }
</script>

<style scoped>
  
</style>