<template>
  <div>
    <template >
      <li class="list-group-item list-group-item-primary mt-5" v-for="project in projects">

        <h3>Project： {{ project }}</h3>
        
        <issue :issuesData="issuesData" @changeIssueContent="editContent" @editComment="changeComment" />

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
        matrix: [],

        issueGroupEmpty: {
          title: '',
          issueContent: '',
          comment: [],
        },

        issueGroup: [
          {
            title: 'Call Wake 起床尿尿',
            issueContent: '',
            comments: ['Wake 該起床尿尿了'],
          },
          // {
          //   title: 'I2',
          //   issueContent: '',
          //   comments: ['c2', 'c3'],
          // },
        ],
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