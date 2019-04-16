<template>
  <div class="container my-4">
    <h3>Issue-List</h3>

    <div class="input-group my-3 col-6 mx-auto">
      <input @keyup.enter="addIssue" v-model="newIssue" type="text" class="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button @click="addIssue" class="btn btn-outline-secondary" type="button" id="button-addon2">Add issue</button>
      </div>
    </div>

    <div class="list-group">
      <template v-for="(issueData, index) in issuesData">

        <a @click="changeStatus(index)" class="list-group-item list-group-item-action text-left bg-dark text-white">
          {{ issueData.title }}
        </a>

        <div class="mb-5" v-if="issueData.showContent">
          <div class="text-left border border-primary">

            <template v-for="content in issueData.contents">
              {{ content }}
            </template>

            <template>

              <span v-if="issueData.labels.feature === true" class="badge badge-success text-right">
                feature
              </span>

              <span v-if="issueData.labels.bug === true" class="badge badge-danger text-right">
                Bug
              </span>

            </template>
            
          </div>

          <div>
            <template v-for="(label, key) in issueData.labels">
              <button @click="changeLabelState(index, key)" class="btn btn-outline-primary">{{ key }}</button>
            </template>
          </div>

        </div>

      </template>

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
            showContent: false,
            contents: ['content-1 description'],
            labels: {feature: false, bug: false},
          }, {
            title: '#2',
            showContent: false,
            contents: ['content-2 description'],
            labels: {feature: false, bug: false},
          }
        ],
        newIssue: '',
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
          contents: ['content-2 description'],
          labels: {feature: false, bug: false},
        });

        this.newIssue = '';

      },


      changeLabelState (index, key) {
        this.issuesData[index].labels[key] = !this.issuesData[index].labels[key];
      }

    },
  }
</script>

<style scoped>
  
</style>