<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand nav-item nav-link" to="/">
        <a>Home</a>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">

          <a v-if="user.authed" @click.prevent="logOut" class="nav-item nav-link" href="#">Log out</a>

          <router-link v-else to="/signin" class="nav-item nav-link" href="#">Sign in</router-link>
          
        </div>
      </div>
    </nav>

    <template v-if="user.authed">
    <h1 class="nav-item nav-link align-right mt-5">Hello, {{ username }}!</h1>
    <h5>Welcome to Flag</h5>

    <div v-if="orgs.length !== 0" class="container mx-auto">
      <h5 class="text-left">My Organization</h5>
      <div class="row">
        <router-link v-for="org in orgs" :key="org.id" :to="{ name: 'organization', params: { orgId: org.orgId }}" tag="button" class="list-group-item list-group-item-action btn btn-success col-2" active-class="active">
          {{ org.name }}
        </router-link>
      </div>

      <form class="col-8 mx-auto my-5">
        <div class="form-group text-left">
          <label @keyup.enter="addOrganization" for="name">Add organization</label>
          <input v-model="orgName" class="form-control" placeholder="Organization name" id="name">
        </div>
        <button @click.prevent="addOrganization" class="mx-3 btn btn-success">Add organization</button>
      </form>

    </div>
    
    </template>

    

    <router-view />

  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
</style>

<script>


  // Import
  import Parse from "parse";
  import VueMarkdown from "vue-markdown";


  export default {


    name: 'Home',


    /**
     *
     * Inner components
     *
     */
    components: {
      VueMarkdown,
    },


    data () {
      return {
        username: '',
        orgName: '',
        orgs: [],
      }
    },


    created () {

      let res = this.$md5 ('korver@protype.tw');
      console.log (res);


      if (this.$store.state.user.authed === false) {
        this.$router.push ({ path: '/signin' })
      }

      // Add user

      // let Account = Parse.Object.extend ("Account");
      // let account = new Account ();

      // account.set ('username', 'k');
      // account.set ('password', 'k123456');
      // account.set ('email', 'k@protype.tw');

      // account.save()
      //   .then((account) => {
      //     alert('New object created with objectId: ' + account.id);
      //   }, (error) => {
      //     // Execute any logic that should take place if the save fails.
      //     // error is a Parse.Error with an error code and message.
      //     alert('Failed to create new object, with error code: ' + error.message);
      //   });

    },


     /**
     *
     * Computed
     *
     */
    computed: {
      user () {
        return {
          authed: this.$store.state.user.authed,
          email: this.$store.state.user.input.email,
          id: this.$store.state.user.input.userId
        }
      },
      
    },


    methods: {
      showOrg () {
        let $vmc = this;
        let Org = Parse.Object.extend ("Organization");
        let query = new Parse.Query (Org);
        let ary = [];
        query.equalTo ('memberId', $vmc.user.id);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let object = resp[i];
              let query = new Parse.Query (Org);
              obj.orgId = object.id;
              query.get (object.id)
                .then (resp => {
                  obj.name = resp.get ('name');
                  ary.push (obj);
                });
            }

            $vmc.orgs = ary;
          })
      },


      showUsername () {
        let $vmc = this;
        let ary = [];
        const Account = Parse.Object.extend ("Account");
        let query = new Parse.Query (Account);
        query.get ($vmc.user.id)
          .then (resp => {
            $vmc.username = resp.get ('username');
        });
      },


      logOut () {
        let $vmc = this;
        $vmc.$store.dispatch ('user/logOut');
        $vmc.$router.push ({ path: '/signin' })
      },


      addOrganization () {
        let $vmc = this;
        
        let Org = Parse.Object.extend ("Organization");
        let org = new Org ();

        org.set ('name', $vmc.orgName);
        org.set ('memberId', [$vmc.$store.state.user.input.userId]);

        org.save()
          .then((org) => {
            // Execute any logic that should take place after the object is saved.
            $vmc.orgName = '';
            $vmc.showOrg ();
            alert('New object created with objectId: ' + org.id);
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
          });
      }
    },


    watch: {
      user () {

        this.showOrg ();
        this.showUsername ();
      },
    },
  }
</script>
