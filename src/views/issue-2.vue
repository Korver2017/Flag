<template>
  <div class="container my-4">
    <h3>Issue-#2</h3>
  </div>
    

</template>

<script>

  export default {
    

    name: 'issue-list',


    data () {
      return {
        issuesData: [
          {
            title: '#1',
            titleEditing: false,
            showContent: true,
            content: '#1',
            issueLabels: {},
            // labels: {feature: false, bug: false, hotfix: false},
            labels: [{feature: false},{bug: false},{hotfix: false}],
            issueOpened: true,
            stashTitle: '',
            stashContent: '',
            contentEditing: false,
          },
          {
            title: '#2',
            titleEditing: false,
            showContent: true,
            content: '#2',
            issueLabels: {},
            // labels: {feature: false, bug: false, hotfix: false},
            labels: [{feature: false},{bug: false},{hotfix: false}],
            issueOpened: true,
            stashTitle: '',
            stashContent: '',
            contentEditing: false,
          }
        ],
        labels: [
          {
            feature: false,
            labelEditing: false,
            editedLabel: '',
          },
          {
            bug: false,
            labelEditing: false,
            editedLabel: '',
          },
          {
            hotfix: false,
            labelEditing: false,
            editedLabel: '',
          }
        ],
        newIssue: '',
        newLabel: '',
        labelEditing: false,
      }
    },


    created () {
    },


    methods: {


      changeStatus (index) {
        this.issuesData[index].showContent = !this.issuesData[index].showContent
      },


      addIssue () {

        this.issuesData.push ({
          title: this.newIssue,
          titleEditing: false,
          showContent: false,
          content: '尚無資訊',
          // labels: {feature: false, bug: false, hotfix: false},
          labels: this.labels,
          issueOpened: true,
          stashContent: '',
          contentEditing: false,
        });

        this.newIssue = '';

      },


      addLabel () {
        this.$set (this.labels, this.newLabel, false);
      },


      checkLabel (name, index, l) {
        console.log (index, l);

        console.log (this.issuesData[index].labels[l]);

        this.issuesData[index].labels[l][name] = !this.issuesData[index].labels[l][name];
      },


      checkEditLabel (index) {
        this.labels[index].labelEditing = true;

        // obj[this.newLabel] = true;
        // this.$set (this.labels, index, obj);
        // console.log (this.labels);
      },


      updateLabel (key, index) {
        let obj = {};

        if (this.labels[index][key] === true)
          obj[this.labels[index].editedLabel] = true;
        else
          obj[this.labels[index].editedLabel] = false;
        
        obj.labelEditing = false;
        obj.editedLabel = '',

        this.$set (this.labels, index, obj);
      },


      updateContent (index) {
        this.issuesData[index].content = this.issuesData[index].stashContent;
        this.issuesData[index].stashContent = '';
        this.issuesData[index].contentEditing = false;
      },


      updateTitle (index) {
        this.issuesData[index].title = this.issuesData[index].stashTitle;
        this.issuesData[index].stashTitle = '';
        this.issuesData[index].titleEditing = false;

      },

    },
  }
</script>

<style scoped>
  
</style>