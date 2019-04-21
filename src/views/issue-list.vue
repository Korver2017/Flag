<template>
  <div class="container my-4">
    <h3>Issue-List</h3>

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

      <h5 class="text-left">Please select a label to edit name</h5> <br />
      <div class="row" v-for="(label, l) in labels">
        <button @click="checkEditLabel(l)" class="btn btn-outline-success">
          {{ Object.keys (label)[0] }}
        </button>

        <template v-if="labels[l].labelEditing === true">
          <input @keyup.enter="updateLabel (Object.keys (label)[0], l)" v-model.trim="labels[l].editedLabel" type="text" class="form-control col-3" placeholder="Edit label" aria-describedby="button-addon2">
          <button class="btn btn-outline-warning" @click="updateLabel (Object.keys (label)[0], l)">Update label</button>
        </template>
      </div>

    <div v-for="(issueData, index) in issuesData">

        <div class="list-group text-white">

          <button :disabled="issueData.issueOpened === false" @click="changeStatus (index)" class="mt-3 list-group-item list-group-item-action text-left bg-dark text-white">
            {{ issueData.title }}

            <template v-for="label in issueData.labels">
              <!-- <template v-for="(val, key) in label"> -->
                <!-- {{ Object.keys (label)[0] }} -->
                <span v-if="Object.values (label)[0] === true" class="mx-1 badge badge-light">{{ Object.keys (label)[0] }}</span>
              <!-- </template> -->
            </template>

            <span v-if="issueData.issueOpened === false"> (Closed)</span>
          </button>

          <li :class="{ 'disabled': issueData.issueOpened === false }" class="list-group-item list-group-item-action bg-secondary" v-if="issueData.showContent">
            <div>
              <p class="text-left text-white">{{ issueData.content }}</p>

              <div v-if="issueData.contentEditing === true" class="col-6 mx-auto input-group mb-3">
                <input @keyup.enter="updateContent(index)" v-model="issueData.stashContent" type="text" class="form-control" placeholder="New content" aria-describedby="button-addon2">
                <div class="input-group-append">
                  <button @click="updateContent(index)" class="btn btn-warning" type="button" id="button-addon2">Update content</button>
                </div>
              </div>

              <div v-if="issueData.titleEditing === true" class="col-6 mx-auto input-group mb-3">
                <input @keyup.enter="updateTitle(index)" v-model="issueData.stashTitle" type="text" class="form-control" placeholder="New title" aria-describedby="button-addon2">
                <div class="input-group-append">
                  <button @click="updateTitle(index)" class="btn btn-warning" type="button" id="button-addon2">Update title</button>
                </div>
              </div>

              <template>
                <button class="mx-2 btn btn-warning" @click="issueData.contentEditing = !issueData.contentEditing">Edit content</button>
                <button class="mx-2 btn btn-warning" @click="issueData.titleEditing = !issueData.titleEditing">Edit title</button>
              </template>
              
            </div>


          </li>


        </div>

        <div class="mt-3">
          <button v-if="issueData.issueOpened === true" class="mr-3 btn btn-danger" @click="issueData.issueOpened = !issueData.issueOpened">Close issue</button>
          <button v-else class="mr-3 btn btn-success" @click="issueData.issueOpened = !issueData.issueOpened">Open issue</button>

          <template v-for="(label, l) in issueData.labels">
            <!-- <template v-for="(v, k) in label"> -->
              <button class="btn btn-outline-primary" @click="checkLabel (Object.keys (label)[0], index, l)">{{ Object.keys (label)[0] }}</button>
          </template>

        </div>

    </div>


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
            showContent: false,
            content: '#1 - Lorem...',
            issueLabels: {},
            // labels: {feature: false, bug: false, hotfix: false},
            labels: [{feature: false},{bug: false},{hotfix: false}],
            issueOpened: true,
            stashTitle: '',
            stashContent: '',
            contentEditing: false,
          }, {
            title: '#2',
            titleEditing: false,
            showContent: false,
            content: '#2 - Lorem...',
            issueLabels: {},
            // labels: {feature: false, bug: false, hotfix: false},
            labels: [{feature: false},{bug: false},{hotfix: false}],
            issueOpened: true,
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