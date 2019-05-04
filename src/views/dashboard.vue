<template>
  <div>
    <h1>Dashboard</h1>

    <form class="col-8 mx-auto my-5">
        <div class="form-group text-left">
          <label @keyup.enter="addOrganization" for="name">Organization name</label>
          <input v-model="name" class="form-control" placeholder="Organization name" id="name">
        </div>
        <!-- <div class="form-group text-left">
          <label @keyup.enter="submitIssue" for="content">Issue content</label>
          <textarea v-model="content" placeholder="Issue content" class="form-control" id="content" rows="3"></textarea>
        </div> -->
        <button @click.prevent="addOrganization" class="mx-3 btn btn-success">Add organization</button>
        <!-- <button @click.prevent="cancel" class="mx-3 btn btn-danger">Cancel</button> -->
      </form>

  </div>
</template>

<script>
  import Parse from "parse";


  export default {


    name: 'dashboard',
    

    data () {
      return {
        name: '',
      }
    },


    created () {
    },


    computed: {
    },


    methods: {
      addOrganization () {
        console.log ('kk');
        let $vmc = this;
        // console.log ($vmc.$store.state.user.input.userId);
        // Add org
        
        let Org = Parse.Object.extend ("Organization");
        let org = new Org ();

        org.set ('name', $vmc.name);
        org.set ('memberId', [$vmc.$store.state.user.input.userId]);

        org.save()
          .then((org) => {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + org.id);
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
          });
      }
    },
  }
</script>

<style scoped>
  
</style>