<template>

  <div class="btn-group" role="group">

    <button @click="state = true" type="button" class="btn btn-outline-secondary" :class="{ active: state }">
      {{ openedCount }} 個開啟中
    </button>

    <button @click="state = false" type="button" class="btn btn-outline-secondary" :class="{ active: !state }">
      {{ closedCount }} 個已關閉
    </button>

  </div>

</template>

<script>
  export default {

    name: 'state-counter',
    
    props: ['openedCount', 'closedCount', 'showOpened'],

    data () {
      return {
        state: this.showOpened,
      }
    },

    watch: {
      state () {
        this.$emit ('changeState', this.state);
      },
    }
    
  }
</script>

<style scoped>
  
</style>