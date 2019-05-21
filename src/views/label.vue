<template>
  <div class="my-5 container">

    <h1 class="mb-5">Label Component</h1>

    <button v-if="addingLabel === false" class="btn btn-success" @click="addingLabel = true">New Label</button>


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
      <li v-for="label in labels" class="py-3 list-group-item">{{ label }}</li>
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
    mounted () {
      let $vmc = this;
      const Label = Parse.Object.extend ('Label');
      const query = new Parse.Query (Label);
      let ary = [];
      query.notEqualTo ('title', '');
      query.find ()
        .then (resp => {
          for (let i = 0; i < resp.length; i++) {
            let object = resp[i];
            ary.push (object.get ('title'));
          }
        });
      
      $vmc.labels = ary;
    },
    methods: {
      newLabel () {
        let $vmc = this;
        console.log ($vmc.labelName, $vmc.labelDesc);
      },
      cancelLabel () {
        let $vmc = this;
        $vmc.labelName = '';
        $vmc.labelDesc = '';
        $vmc.addingLabel = false;
      }
    },
  }
</script>

<style scoped>
  
</style>