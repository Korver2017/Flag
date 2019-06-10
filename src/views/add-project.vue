<template>
  <div id="wrap">

    <div class="mt-5 col-8 mx-auto">

      <div class="py-3 d-flex justify-content-center align-items-center bg-light-theme  border-light-theme border-bottom-0">
        <h4 class="mb-0">新增儲存庫</h4>
      </div>

      <div class="border-light-theme">

        <div>

          <form>
          
            <div class="col-8 form-group mx-auto mt-5">

              <div class="row d-flex align-items-center justify-content-center">
              
                <label class="d-flex align-items-center mr-3 mb-0" for="name">儲存庫名稱</label>
                <input v-model="newProjectName" type="text" class="col-8 form-control" id="name">

              </div>

              <small class="form-text text-muted">好的儲存庫名稱通常是簡短的、好記的、且獨特的。</small>
            </div>
            
          </form>

        </div>

        <div class="my-5">

          <button class="mx-2 btn btn-success" @click="">建立儲存庫</button>
          <button class="mx-2 btn btn-secondary" @click="">取消</button>
          
        </div>
        
      </div>

    </div>
    
  </div>
</template>

<script>
  import Parse from "parse";

  export default {
    
    name: 'add-project',

    data () {
      return {
        newProjectName: '',
      }
    },

    computed: {
      user () {
        return {
          authed: this.$store.state.user.authed,
          userId: this.$store.state.user.userId,
          avatarHash: this.$store.state.user.avatarHash,
          username: this.$store.state.user.username,
        }
      },
    },

    methods: {
    },

  }
</script>

<style scoped>
  
</style>