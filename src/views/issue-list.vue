<template>
  <div class="container my-4">
    <h3>Flag</h3>

    <div class="row">
      <div class="input-group my-3 col-6">
        <input @keyup.enter="addIssue" v-model="newIssue" type="text" class="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2">
        <div class="input-group-append">
          <button @click="addIssue" class="btn btn-outline-secondary" type="button" id="button-addon2">Add issue</button>
        </div>
      </div>

      <div class="input-group my-3 col-6">
        <input @keyup.enter="addLabel" v-model="newLabel" type="text" class="form-control" placeholder="New label" aria-describedby="button-addon2">
        <div class="input-group-append">
          <button @click="addLabel" class="btn btn-outline-secondary" type="button" id="button-addon2">Add label</button>
        </div>
      </div>
    </div>

    <div v-for="(issueData, index) in issuesData">

        <div class="mx-auto col-8 list-group text-white">

          <router-link class="d-block" :to="'issue/' + issueData.issueTag" tag="li" active-class="active">
          <!-- <router-link class="d-block" to="issue/2" tag="li" active-class="active"> -->
            <button class="list-group-item list-group-item-action">
              <!-- {{ issueData.title }} -->
              <span>Issue </span>
              <span class="font-italic text-right">#{{ issueData.issueTag }}</span>
            </button>
          </router-link>


        </div>
    </div>

  </div>
    

</template>

<script>
  import Parse from "parse";

  export default {
    

    name: 'issue-list',


    data () {
      return {
        tagNum: 0,
        issuesData: [],
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
      
      var Project = Parse.Object.extend ("Project");
      var query = new Parse.Query (Project);

      query.get ("ISC7GQpkqC")
        .then (resp => {
          let data = resp.get ('issuesData');
          this.issuesData = data;
          let len = data.length;
          console.log (len);
          this.tagNum = len;

          // console.log (data);
          console.log (this.issuesData);
        }, (error) => {
          console.log (error);
        });
    },


    methods: {


      changeStatus (index) {
        this.issuesData[index].showContent = !this.issuesData[index].showContent
      },

      
      addIssue () {
        this.tagNum += 1;

        this.issuesData.push ({
          issueTag: this.tagNum,
          // title: this.newIssue,
          // titleEditing: false,
          // showContent: false,
          // content: '尚無資訊',
          // // labels: [{feature: false, bug: false, hotfix: false}],
          // labels: [],
          // issueOpened: true,
          // stashContent: '',
          // contentEditing: false,
        });

        console.log (this.tagNum);

        const Project = Parse.Object.extend ("Project");
        const project = new Project ();

        project.id = 'ISC7GQpkqC';

        project.save ().then ((resp) => {
          resp.set ('issuesData', this.issuesData);

          // console.log (this.issuesData);
          alert ('New object created with objectId: ' + project.id);
        }, (error) => {
          alert('Failed to create new object, with error code: ' + error.message);
        });

        this.projectName = '';

        

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