<template>
  <div>
    <h1>Issue Component</h1>
    <span v-if="feature === true">feature</span>

    <button @click="labelState" class="btn btn-success text-right">Feature</button>
  </div>
</template>

<script>
  export default {
    

    name: 'issue',


    data () {
      return {
        feature: false,
      }
    },


    methods: {
      labelState () {
        this.feature = !this.feature;

        this.$emit ('changeLabel', this.feature);
      }
    },
  }
</script>

<style scoped>
  
</style>