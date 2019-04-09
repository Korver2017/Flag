<template>
  <div class="container mt-5">
    <div class="col-6 input-group mb-3 mx-auto">
      <input v-model.trim="issue" type="text" class="form-control" placeholder="New issue" aria-label="New issue" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button @click="addIssue ()" class="btn btn-outline-success" type="button" id="button-addon2">Add issue</button>
      </div>
      <br />
    </div>
      
    <li v-for="issue in issues" :key="issue">
      issue: {{ issue }} - <router-link to="/issues">Issues</router-link> - <router-link to="/">Home</router-link>
    </li>

  </div>
</template>

<style lang="scss">
</style>

<script>

  export default {
    name: 'issues',


    data () {
      return {
        issues: [],
        issue: '',
      }
    },

    
    methods: {
      addIssue () {
        if (this.issue === '') return;

        this.issues.push (this.issue);
        this.issue = '';
      }
    },
  }
</script>
