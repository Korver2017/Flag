<template>
  <div class="my-5 container">

    <h3 class="my-5 text-left">

      <router-link :to="{ name: 'organization'}" tag="a" active-class="active">
        <a>{{ orgName }}</a>
      </router-link> / 
      
      <router-link :to="{ name: 'project'}" tag="a" active-class="active">
        <a>{{ proName }}</a>
      </router-link>

    </h3>

    <h1 class="mb-5">Label Component</h1>

    <h3>{{ proId }}</h3>

    <div v-if="addingLabel === false" class="text-right mr-5">
      <button class="btn btn-success" @click="addingLabel = true">Add Label</button>
    </div>

    <div v-if="addingLabel === true" class="d-flex justify-content-center row form-group text-left">
      <div class="col-3">
        <label for="labelName">Label Name</label>
        <input v-model="labelName" type="text" class="form-control" aria-describedby="button-addon2" id="labelName">
      </div>
      <div class="col-5">
        <label for="labelDesc">Description</label>
        <input v-model="labelDesc" type="text" class="form-control" aria-describedby="button-addon2" id="labelDesc">
      </div>
      <div class="d-flex align-items-end">
        <button class="mr-3 btn btn-success" @click="newLabel">Create Label</button>
        <button class="mr-3 btn btn-danger" @click="cancelLabel">Cancel</button>
      </div>
    </div>


    <ul class="my-3 list-group list-group-flush text-left">
      <li v-for="label in labels" class="py-3 list-group-item">
        <div class="row">
          <div class="col-4">{{ label.title }}</div>
          <div class="col-4">{{ label.labelDesc }}</div>
          <button class="ml-auto mr-3 btn btn-warning" @click="">Edit</button>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
  import Parse from 'parse';

  export default {
    data() {
      return {
        orgName: '',
        proName: '',
        labels: [],
        addingLabel: false,
        labelName: '',
        labelDesc:'',
      }
    },
    computed: {
      proId () {
        return this.$route.params.proId; 
      }
    },

    mounted () {
      let $vmc = this;
      
      $vmc.showRouteName ();
      $vmc.showLabel ();
    },
    methods: {
      showRouteName () {
        let $vmc = this;

        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);
        query.equalTo ('proId', $vmc.proId)
        query.find ()
          .then (resp => {
            let query = new Parse.Query (Issue);
            query.get (resp[0].id)
              .then (resp => {
                $vmc.orgName = resp.get ('orgName');
                $vmc.proName = resp.get ('proName');
              })
          })
      },
      showLabel () {
        let $vmc = this;
        const Label = Parse.Object.extend ('Label');
        const query = new Parse.Query (Label);
        let ary = [];
        query.equalTo ('proId', $vmc.proId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i++) {
              let obj = {};
              let object = resp[i];
              obj.title = object.get ('title');
              obj.labelDesc = object.get ('labelDesc');
              ary.push (obj);
            }
          });
        
        $vmc.labels = ary;
      },
      newLabel () {
        let $vmc = this;
        const Label = Parse.Object.extend ('Label');
        const label = new Label ();

        label.set ('title', $vmc.labelName);
        label.set ('labelDesc', $vmc.labelDesc);
        label.set ('proId', $vmc.proId);
        label.save ()
          .then (resp => {
            $vmc.showLabel ();
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert ('Failed to create new object, with error code: ' + error.message);
          });
      },
      cancelLabel () {
        let $vmc = this;
        $vmc.labelName = '';
        $vmc.labelDesc = '';
        $vmc.addingLabel = false;
      },
    },
  }
</script>

<style scoped>
  
</style>