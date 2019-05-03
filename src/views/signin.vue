<template>
  <div class="mt-5">
    <h1>Sign in component!</h1>

    <div v-if="authed === false" class="container row mx-auto my-4">

      <input @keyup.enter="signin" v-model="email" type="text" class="form-control col-5" placeholder="User name" aria-describedby="button-addon2" autofocus>
      <input @keyup.enter="signin" v-model="password" type="text" class="form-control col-5" placeholder="Password" aria-describedby="button-addon2">

      <button @click="signin" class="btn btn-success col-2">Sign in</button>

    </div>
    
  </div>
</template>

<script>


  // Import
  // import Parse from "parse";

  import {mapState, mapActions} from 'vuex';

  export default {


    /**
     *
     * Data
     *
     */
    data () {
      return {
        state: false
      }
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

        if ($vmc.email === '' || $vmc.password === '')
          return alert ('請輸入完整登入資訊');

        $vmc.$store.dispatch ('user/signin');
      },
    },
  }
</script>

<style scoped>
  
</style>