<template>

  <div class="btn-group" role="group" aria-label="Basic example">

    <button @click="showOpened = true" type="button" class="btn btn-outline-secondary">
      {{ opened.length }} 個開啟中
    </button>

    <button @click="showOpened = false" type="button" class="btn btn-outline-secondary">
      {{ closed.length }} 個已關閉
    </button>

  </div>

</template>

<script>
  export default {

    name: 'state-counter',
    
  }
</script>

<style scoped>
  
</style>