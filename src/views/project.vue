<template>
  <div>

    <li class="list-group-item list-group-item-primary mt-5" v-for="project in projects" :key="project">

      <h3>Project： {{ project }}</h3>
      
      <issue :issueGroup="issueGroup" @changeIssueContent="editContent" @editComment="changeComment" />

    </li>

  </div>
</template>

<script>
  import Issue from "@/views/issue.vue";

  export default {
    

    /**
     *
     * Component name
     *
     */
    name: 'project',


    /**
     *
     * Inner components
     *
     */
    components: {
      Issue,
    },


    props: ['projects'],


    data () {
      return {
        issueGroup: [
          {
            title: 'Call Wake 起床尿尿',
            issueContent: '',
            comment: ['c1'],
          },
          {
            title: 'i2',
            issueContent: '',
            comment: ['c2', 'c3'],
          },
        ],
      }
    },


    methods: {
      editContent (val, i) {
        this.issueGroup[i].issueContent = val;
      },
      changeComment (val, i, c) {
        console.log (val, i, c);
        this.issueGroup[i].comment.splice (c, 1, val);
      }
    },


  }
</script>

<style scoped>
  
</style>