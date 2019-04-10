<template>
  <div>
    <div v-for="(list, index) in comments" class="bg-secondary text-white issueContent mx-auto my-3 py-5 col-6">
      <h3>Comment</h3>
      {{ list.comment }}
      <br />
      <div class="mt-5">
        <button @click="editComment (index)" class="mx-1 btn btn-primary">編輯評論</button>
        <button @click="editComment (index)" class="mx-1 btn btn-primary">刪除評論</button>
      </div>
    </div>

    <form v-if="showEditForm !== true">
      <div class="form-group col-6 mx-auto">
        <label for="exampleFormControlTextarea1">Comment here</label>
        
        <textarea v-model.trim="stashCommentInfo" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>

      <!-- <template>
        <button class="btn btn-outline-success mr-3">完成編輯</button>
        <button class="btn btn-outline-danger">取消編輯</button>
      </template> -->
    </form>

    <!-- <button :disabled="stashCommentInfo === ''" class="btn btn-secondary" @click="addComment">Add a comment</button> -->
  </div>
</template>

<script>
  export default {
    

    name: 'comment',

    
  }
</script>

<style scoped>
  
</style>