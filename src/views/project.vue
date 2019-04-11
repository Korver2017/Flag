<template>
  <div>
    <template >
      <li class="list-group-item list-group-item-primary mt-5" v-for="project in projects">

        <h3>Project： {{ project.projectName }}</h3>
        
        <issue :issuesData="project.issueGroup" @changeIssueContent="editContent" @editComment="changeComment" />

      </li>
    </template>
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
        issueGroupEmpty: {
          title: '',
          issueContent: '',
          comment: [],
        },
        // issueGroup: [
        //   {
        //     title: 'Call Wake 起床尿尿',
        //     issueContent: '',
        //     comments: ['Wake 該起床尿尿了'],
        //   },
        // ],
      }
    },


    computed: {
      issuesData () {
        return this.issueGroup;
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


    watch: {
    }
  }
</script>

<style scoped>
  
</style>