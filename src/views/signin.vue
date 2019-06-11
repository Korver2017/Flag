<template>

  <div id="wrap">

    <div class="my-5 col-8 mx-auto">

      <div class="py-3 d-flex justify-content-center align-items-center bg-light-theme  border-light-theme border-bottom-0">
        <h5 class="mb-0">登入</h5>
      </div>

      <div class="border-light-theme">

        <form>
        
          <div class="col-8 form-group mx-auto mt-5">

            <div class="row d-flex align-items-center justify-content-end">

              <div>
                <label for="email">電子郵件地址</label>
              </div>

              <div class="col-8 input-group mb-3">
                <input v-model="email" type="emial" class="form-control" id="email">
              </div>

            </div>

            <div class="row d-flex align-items-center justify-content-end">

              <div>
                <label for="password">密碼</label>
              </div>

              <div class="col-8 input-group mb-3">
                <input v-model="password" type="password" class="form-control" id="password">
              </div>
              
              <div class="col-8 text-left">
                <button class="btn btn-success" @click.prevent="signin">登入</button>
              </div>

            </div>
            
            
          </div>
          
        </form>

      </div>

    </div>

  </div>

</template>

<script>


  // Import

  import { mapState, mapActions } from 'vuex';

  export default {


    name: 'signin',


    components: {
    },


    /**
     *
     * Data
     *
     */
    data () {
      return {
        state: false,
      }
    },

    created () {

    },


    /**
     *
     * Computed
     *
     */
    computed: {

      ...mapState ({
        authed: state => state.user.authed,
        account: state => state.user.account
      }),

      email: {
        get () {
          return this.$store.state.user.input.email
        },
        
        set (value) {
          this.$store.commit ('user/input', {email: value});
        }
      },

      password: {
        get () {
          return this.$store.state.user.input.password
        },
        set (value) {
          this.$store.commit ('user/input', {password: value});
        }
      }
    },


    /**
     *
     * Methods
     *
     */
    methods: {


      /**
       *
       * Signin
       *
       */
      signin () {

        let $vmc = this;

        if ($vmc.email === '' || $vmc.password === '') return alert ('請輸入完整登入資訊');

        $vmc.$store.dispatch ('user/signin');
      },
    },

    watch: {
    }
  }
</script>

<style scoped>
  
</style>