<template>
  <div class="my-5 container">

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
      <li v-for="label in labels" class="py-3 list-group-item">{{ label.title }} {{ label.labelDesc }}</li>
    </ul>

  </div>
</template>

<script>
  import Parse from 'parse';

  export default {
    data() {
      return {
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
      
      $vmc.showLabel ();
    },
    methods: {
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
            // Execute any logic that should take place after the object is saved.
            alert ('New object created with objectId: ' + resp.id);
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