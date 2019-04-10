<template>
  <div>

    <!-- <li class="list-group-item list-group-item-primary mt-5" v-for="project in projects" :key="project">

      <h3>Project： {{ project }}</h3>
      
      <issue :issueGroup="issueGroup" @changeIssueContent="editContent" @editComment="changeComment" />

    </li> -->

    {{ matrix }}

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
        matrix: {},

        issueGroupEmpty: [
          {
            title: '',
            issueContent: '',
            comment: [],
          },
        ],

        issueGroup: [
          {
            title: 'Call Wake 起床尿尿',
            issueContent: '',
            comment: ['Wake 該起床尿尿了'],
          },
          {
            title: 'I2',
            issueContent: '',
            comment: ['c2', 'c3'],
          },
        ],
      }
    },


    computed: {
      project () {
        let len = this.projects.length;

        for (let i = 0; i < len; i ++) {
          console.log (this.matrix);
          this.matrix[this.projects[i]] = this.issueGroupEmpty;
        }
        // return this.matrix[this.projects[0]] = this.issueGroup[0];
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