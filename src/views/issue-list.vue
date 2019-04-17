<template>
  <div class="container my-4">
    <h3>Issue-List</h3>

    <div class="input-group my-3 col-6 mx-auto">
      <input @keyup.enter="addIssue" v-model="newIssue" type="text" class="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button @click="addIssue" class="btn btn-outline-secondary" type="button" id="button-addon2">Add issue</button>
      </div>
    </div>

    <div v-for="(issueData, index) in issuesData">
      <!-- <div> -->

        <div class="list-group text-white">

          <button :disabled="issueData.issueOpened === false" @click="changeStatus(index)" class="mt-3 list-group-item list-group-item-action text-left bg-dark text-white">
            {{ issueData.title }}
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

              <!-- <div v-if="contentEditing === true" class="input-group mb-3">
                <input @keyup.enter="updateContent(index)" v-model="stashContent" type="text" class="form-control" placeholder="New content" aria-describedby="button-addon2">
                <div class="input-group-append">
                  <button @click="updateContent(index)" class="btn btn-outline-secondary" type="button" id="button-addon2">Update content</button>
                </div>
              </div>

              <div v-if="issueData.titleEditing === true" class="input-group mb-3">
                <input @keyup.enter="updateTitle(index)" v-model="issueData.stashTitle" type="text" class="form-control" placeholder="New title" aria-describedby="button-addon2">
                <div class="input-group-append">
                  <button @click="updateTitle(index)" class="btn btn-outline-secondary" type="button" id="button-addon2">Update title</button>
                </div>
              </div> -->
            

              <!-- <template :labels="issueData.issueLabels">

                <template v-for="labels in issueData.issueLabels">
                  {{ labels }}
                   <span v-if="label === true" class="badge badge-success text-right">
                    {{ label }}
                  </span> 
                </template>


                 <span v-if="issueData.labels.feature === true" class="badge badge-success text-right">
                  feature
                </span>

                <span v-if="issueData.labels.bug === true" class="badge badge-danger text-right">
                  Bug
                </span> 

              </template> -->
              
            </div>


          </li>


        </div>

        <div class="mt-3">
        <button v-if="issueData.issueOpened === true" class="btn btn-danger" @click="issueData.issueOpened = !issueData.issueOpened">Close issue</button>
        <button v-else class="btn btn-success" @click="issueData.issueOpened = !issueData.issueOpened">Open issue</button>
        </div>

        <!-- <button :disabled="issueData.issueOpened === false" class="list-group-item list-group-item-action" v-if="issueData.showContent">
        </button> -->

      <!-- </div> -->


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
            labels: {feature: false, bug: false},
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
            labels: {feature: false, bug: false},
            issueOpened: true,
            stashContent: '',
            contentEditing: false,
          }
        ],
        // labels: {feature: false, bug: false},
        newIssue: '',
      }
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
          labels: {feature: false, bug: false, hotfix: false},
          issueOpened: true,
          stashContent: '',
          contentEditing: false,
        });

        this.newIssue = '';

      },


      changeLabelState (index, key) {
        this.labels[key] = !this.labels[key];
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


      check (label, key, l, index) {
        console.log (label, key, l, index);
        console.log (this.issuesData[index].labels[key]);
        this.issuesData[index].labels[key] = !this.issuesData[index].labels[key];
      }

    },
  }
</script>

<style scoped>
  
</style>