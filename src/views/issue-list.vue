<template>
  <div class="container my-4">
    <h3>Issue-List</h3>

    <div class="input-group my-3 col-6 mx-auto">
      <input @keyup.enter="addIssue" v-model="newIssue" type="text" class="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button @click="addIssue" class="btn btn-outline-secondary" type="button" id="button-addon2">Add issue</button>
      </div>
    </div>

    <template v-for="(issueData, index) in issuesData">

      <div class="list-group">
      

        <a @click="changeStatus(index)" class="mt-3 list-group-item list-group-item-action text-left bg-dark text-white">
          {{ issueData.title }}
        </a>

        <a class="list-group-item list-group-item-action" v-if="issueData.showContent">
          <div>

            {{ issueData.content }}
            <button v-if="editing === false" class="btn btn-warning" @click="editing = !editing">Edit</button>
            <template v-else>

              <div class="input-group mb-3">
                <input @keyup.enter="updateContent(index)" v-model="stashContent" type="text" class="form-control" placeholder="New content" aria-describedby="button-addon2">
                <div class="input-group-append">
                  <button @click="updateContent(index)" class="btn btn-outline-secondary" type="button" id="button-addon2">Update content</button>
                </div>
              </div>

            </template>

            <template :labels="issueData.issueLabels">

              <template v-for="labels in issueData.issueLabels">
                {{ labels }}
                <!-- <span v-if="label === true" class="badge badge-success text-right">
                  {{ label }}
                </span> -->
              </template>


              <!-- <span v-if="issueData.labels.feature === true" class="badge badge-success text-right">
                feature
              </span>

              <span v-if="issueData.labels.bug === true" class="badge badge-danger text-right">
                Bug
              </span> -->

            </template>
            
          </div>

        </a>


      </div>

      <template v-if="issueData.showContent" v-for="(label, key) in labels">
        <button @click="changeLabelState(index, key)" class="mt-3 btn btn-outline-primary">{{ key }}</button>
      </template>

    </template>


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
            showContent: false,
            content: 'content-1 description',
            issueLabels: {},
            // labels: {feature: false, bug: false},
          }, {
            title: '#2',
            showContent: false,
            content: 'content-2 description',
            issueLabels: {},
            // labels: {feature: false, bug: false},
          }
        ],
        labels: {feature: false, bug: false},
        newIssue: '',
        stashContent: '',
        editing: false,
      }
    },


    methods: {


      changeStatus (index) {
        this.issuesData[index].showContent = !this.issuesData[index].showContent
      },


      addIssue () {
        // let issueTitle = this.newIssue;

        this.issuesData.push ({
          title: this.newIssue,
          showContent: false,
          content: '尚無資訊',
          labels: {feature: false, bug: false},
        });

        this.newIssue = '';

      },


      changeLabelState (index, key) {
        this.labels[key] = !this.labels[key];
      },


      updateContent (index) {
        this.issuesData[index].content = this.stashContent;
        this.stashContent = '';
        this.editing = false;
      }

    },
  }
</script>

<style scoped>
  
</style>