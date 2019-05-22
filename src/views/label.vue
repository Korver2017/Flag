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
        <button class="mr-3 btn btn-danger" @click="cancelAddLabel">Cancel</button>
      </div>
    </div>


    <ul class="my-3 list-group list-group-flush text-left">
      <li v-for="(label, index) in labels" class="py-3 list-group-item">

        <div class="row" v-if="labels[index].editingLabel === false">
          <div class="col-4">{{ label.title }}</div>
          <div class="col-4">{{ label.labelDesc }}</div>
          <button class="ml-auto mr-3 btn btn-warning" @click="editingLabel (index)">Edit</button>
          
          <button v-if="labels[index].editingLabel === false" class="mr-3 btn btn-danger" @click="deleteLabel (index)">Delete</button>
        </div>

        <div v-if="labels[index].editingLabel === true" class="d-flex justify-content-center form-group text-left">

          <div class="col-3">
            <label for="labelName">Label Name</label>
            <input v-model="labels[index].newLabelName" type="text" class="form-control" aria-describedby="button-addon2" id="newLabelName">
          </div>
          <div class="col-5">
            <label for="labelDesc">Description</label>
            <input v-model="labels[index].newLabelDesc" type="text" class="form-control" aria-describedby="button-addon2" id="newLabelDesc">
          </div>
          <div class="d-flex align-items-end">
            <button class="mr-3 btn btn-success" @click="updateLabel (index)">Save Changes</button>
            <button class="mr-3 btn btn-danger" @click="cancelUpdateLabel (index)">Cancel</button>
          </div>

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
        // editingLabel: false,
        newLabelName: '',
        newLabelDesc: '',
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

        let Project = Parse.Object.extend ('Project');
        let query = new Parse.Query (Project);

        query.get ($vmc.proId)
          .then (resp => {
            $vmc.orgName = resp.get ('orgName');
            $vmc.proName = resp.get ('name');
          }, (error) => {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          });
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
              obj.labelId = object.id;
              obj.title = object.get ('title');
              obj.labelDesc = object.get ('labelDesc');
              obj.editingLabel = false;
              obj.newLabelName = '';
              obj.newLabelDesc = '';
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
            $vmc.cancelAddLabel ();
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert ('Failed to create new object, with error code: ' + error.message);
          });
      },
      cancelAddLabel () {
        let $vmc = this;

        $vmc.labelName = '';
        $vmc.labelDesc = '';
        $vmc.addingLabel = false;
      },
      editingLabel (index) {
        let $vmc = this;
        let label = $vmc.labels[index];

        label.editingLabel = true;
        label.newLabelName = label.title;
        label.newLabelDesc = label.labelDesc;
      },
      updateLabel (index) {
        let $vmc = this;
        let labelId = $vmc.labels[index].labelId;
        let Label = Parse.Object.extend ('Label');
        let query = new Parse.Query (Label);
        query.get (labelId)
          .then (resp => {
            resp.set ('title', $vmc.labels[index].newLabelName);
            resp.set ('labelDesc', $vmc.labels[index].newLabelDesc);
            resp.save ()
              .then (resp => {
                $vmc.showLabel ();
              });
          }, (error) => {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          });
      },
      cancelUpdateLabel (index) {
        let $vmc = this;

        $vmc.newLabelName = '';
        $vmc.newLabelDesc = '';
        $vmc.labels[index].editingLabel = false;
      },
      deleteLabel (index) {
        let $vmc = this;

        let labelId = $vmc.labels[index].labelId;

        let Label = Parse.Object.extend ('Label');
        let query = new Parse.Query (Label);
        query.get (labelId)
          .then (resp => {
            if (confirm ('確定要刪除這個 Label 嗎？')) {
              resp.destroy ()
                .then (resp => {
                  $vmc.showLabel ();
                }, (error) => {
                  // The delete failed.
                  // error is a Parse.Error with an error code and message.
                });
            }
          })
      }
    },
  }
</script>

<style scoped>
  
</style>