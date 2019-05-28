<template>
  <div class="mt-5">

    <div v-if="authed === false" class="container mx-auto col-3 my-4">



      <form class="col-10 mx-auto my-5">
        <div class="form-group text-left">
          <label @keyup.enter="signin" for="email">Email</label>
          <input v-model="email" class="form-control" placeholder="Your Email" id="email" autofocus>
        </div>
        <div class="form-group text-left">
          <label @keyup.enter="signin" for="password">Password</label>
          <input v-model="password" type="password" placeholder="Password" class="form-control" id="password" rows="10">
        </div>
        <button @click.prevent="signin" class="mx-3 btn btn-success">Submit</button>
      </form>


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

        if ($vmc.email === '' || $vmc.password === '')
          return alert ('請輸入完整登入資訊');

        $vmc.$store.dispatch ('user/signin');
        // $vmc.$router.push ({ path: '/dashboard' })
      },
    },

    watch: {
    }
  }
</script>

<style scoped>
  
</style>