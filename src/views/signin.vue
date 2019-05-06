<template>
  <div class="mt-5">

    <div v-if="authed === false" class="container mx-auto col-3 my-4">

      <p class="text-left">Email</p>

      <input @keyup.enter="signin" v-model="email" type="email" class="form-control" placeholder="User name" aria-describedby="button-addon2" autofocus>

      <br />

      <p class="text-left">Password</p>
      <input @keyup.enter="signin" v-model="password" type="" class="form-control" placeholder="Password" aria-describedby="button-addon2">

      <button @click="signin" class="btn btn-success my-5">Sign in</button>

    </div>

  </div>
</template>

<script>


  // Import
  // import Parse from "parse";

  import {mapState, mapActions} from 'vuex';

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
        // $vmc.$router.push ({ path: '/dashboard' })
      },
    },
  }
</script>

<style scoped>
  
</style>