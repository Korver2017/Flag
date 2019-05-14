<template>
  <div class="container mt-5">

    <form class="col-6 ml-auto">

      <div class="form-group text-left">
        <label @keyup.enter="addMilestone" for="name">Add Milestone</label>
        <div class="row">
        <input v-model.trim="mileTitle" class="form-control col-8" placeholder="Milestone Name" id="name">

        <button class="btn btn-success" @click.prevent="addMilestone">New Milestone</button>
        </div>
      </div>
      
    </form>

    <div class="rwo text-left mb-5">

      <button @click="showOpened = true" type="button" class="ml-3 btn btn-info">
        Open <span class="badge badge-light">{{ mileOpened }}</span>
      </button>
      <button @click="showOpened = false" type="button" class="ml-3 btn btn-secondary">
        Closed <span class="badge badge-light">{{ mileClosed }}</span>
      </button>

    </div>

    
    <ul v-for="(mile, index) in milestones" class="list-group list-group-flush">
      <li v-if="mile.mileOpened === false && showOpened === false" class="py-5 text-left list-group-item">

        <div class="row">
          
          <h4>{{ mile.title }}</h4>

          <div class="text-right mb-5 ml-auto mr-5">
        
            <button v-if="milestones[index].titleEditing === false" class="ml-auto btn btn-warning" @click="milestones[index].titleEditing = true">Edit Milestone</button>

            <form v-if="milestones[index].titleEditing === true" class="ml-auto">

              <div class="form-group text-left">

                <label @keyup.enter="editMilestone (index)" for="name">New Milestone</label>
                <input v-model.trim="milestones[index].newTitle" class="form-control" placeholder="New Milestone Name" id="name">

                <div class="text-right mt-3">

                  <button class="mr-3 btn btn-success" @click.prevent="editMilestone (index)">Edit Title</button>
                  <button v-if="milestones[index].mileOpened === true" class="mr-3 btn btn-warning" @click.prevent="closeMilestone (index)">Close Milestone</button>
                  <button v-else class="mr-3 btn btn-primary" @click.prevent="reopenMilestone (index)">Reopen Milestone</button>
                  <button class="mr-3 btn btn-danger" @click.prevent="cancelEditing (index)">Cancel</button>

                </div>
              </div>
              
            </form>

          </div>
        </div>

        <div class="mx-auto row">
          <p class="mx-2">{{ mile.percentage }}% complete</p>
          <p class="mx-2">{{ mile.open }} open</p>
          <p class="mx-2">{{ mile.closed }} closed</p>
        </div>

        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" :style="{ width: mile.percentage + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>

      </li>

      <li v-if="mile.mileOpened === true && showOpened === true" class="py-5 text-left list-group-item">

        <div class="row">
          
          <h4>{{ mile.title }}</h4>

          <div class="text-right mb-5 ml-auto mr-5">
        
            <button v-if="milestones[index].titleEditing === false" class="ml-auto btn btn-warning" @click="milestones[index].titleEditing = true">Edit Milestone</button>

            <form v-if="milestones[index].titleEditing === true" class="ml-auto">

              <div class="form-group text-left">

                <label @keyup.enter="editMilestone (index)" for="name">New Milestone</label>
                <input v-model.trim="milestones[index].newTitle" class="form-control" placeholder="New Milestone Name" id="name">

                <div class="text-right mt-3">

                  <button class="mr-3 btn btn-success" @click.prevent="editMilestone (index)">Edit Title</button>
                  <button v-if="milestones[index].mileOpened === true" class="mr-3 btn btn-warning" @click.prevent="closeMilestone (index)">Close Milestone</button>
                  <button v-else class="mr-3 btn btn-primary" @click.prevent="reopenMilestone (index)">Reopen Milestone</button>
                  <button class="mr-3 btn btn-danger" @click.prevent="cancelEditing (index)">Cancel</button>

                </div>
              </div>
              
            </form>

          </div>
        </div>

        <div class="mx-auto row">
          <p class="mx-2">{{ mile.percentage }}% complete</p>
          <p class="mx-2">{{ mile.open }} open</p>
          <p class="mx-2">{{ mile.closed }} closed</p>
        </div>

        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" :style="{ width: mile.percentage + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>

      </li>
    </ul>
    
  </div>
</template>

<script>
  
  import Parse from "parse";


  export default {


    name: 'milestone',


    data () {
      return {
        milestones: [],
        showOpened: true,
        mileTitle: '',
        mileOpened: 0,
        mileClosed: 0,
      }
    },


    computed: {
      proId () {
        return this.$route.params.proId; 
      }
    },


    created () {
      // Add Milestone
      
      // const Mile = Parse.Object.extend("Milestone");
      // const mile = new Mile();

      // mile.set("title", 'M1');
      // mile.set("proId", this.proId);

      // mile.save()
      // .then((mile) => {
      //   // Execute any logic that should take place after the object is saved.
      //   alert('New object created with objectId: ' + mile.id);
      // }, (error) => {
      //   // Execute any logic that should take place if the save fails.
      //   // error is a Parse.Error with an error code and message.
      //   alert('Failed to create new object, with error code: ' + error.message);
      // });
    },


    mounted () {
      let $vmc = this;

      $vmc.showMile ();
    },


    methods: {
      showMile () {
        let $vmc = this;
        let ary = [];
        let Mile = Parse.Object.extend ('Milestone');
        let query = new Parse.Query (Mile);

        query.equalTo ('proId', $vmc.proId);
        query.find ()
          .then (resp => {
            $vmc.mileOpened = 0;
            $vmc.mileClosed = 0;
            for (let i = 0; i < resp.length; i ++) {
              let object = resp[i];
              if (object.get ('mileOpened')) {
                $vmc.mileOpened += 1;
              } else {
                $vmc.mileClosed += 1;
              }
              
              let Issue = Parse.Object.extend ('Issue');
              let query = new Parse.Query (Issue);
              let obj = {};
              let count = 0;
              obj.title = object.get ('title');
              query.equalTo ('milestone', object.id);
              query.find ()
                .then (resp => {
                  for (let i = 0; i < resp.length; i ++) {
                    if (resp[i].get ('issueOpened') === false) {
                      count += 1;
                    }
                  }
                  let all = resp.length;
                  let closed = count;
                  let open = all - closed;

                  obj.mileId = object.id;
                  obj.mileOpened = object.get ('mileOpened');
                  obj.all = all;
                  obj.closed = closed;
                  obj.open = all - closed;
                  obj.percentage = ((closed / all) * 100).toFixed (0);
                  obj.titleEditing = false;
                  obj.newTitle = '';
                  
                  ary.push (obj);

                  $vmc.milestones = ary;

                });
            }
          })

      },


      addMilestone () {
        let $vmc = this;

        const Mile = Parse.Object.extend ('Milestone');
        const mile = new Mile ();

        mile.set ("title", $vmc.mileTitle);
        mile.set ("proId", $vmc.proId);
        mile.set ("mileOpened", true);

        mile.save ()
          .then (resp => {
            $vmc.showMile ();
            // Execute any logic that should take place after the object is saved.
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
          });
      },


      editMilestone (index) {
        let $vmc = this;
        let Mile = Parse.Object.extend ('Milestone');
        let query = new Parse.Query (Mile);
        query.get ($vmc.milestones[index].mileId)
          .then (resp => {
            resp.set ('title', $vmc.milestones[index].newTitle);
            resp.save ()
              .then (() => {
                $vmc.milestones[index].newTitle = '';
                $vmc.showMile ();
              })
          })
      },


      closeMilestone (index) {
        let $vmc = this;
        let Mile = Parse.Object.extend ('Milestone');
        let query = new Parse.Query (Mile);
        query.get ($vmc.milestones[index].mileId)
          .then (resp => {
            resp.set ('mileOpened', false);
            resp.save ()
              .then (() => {
                $vmc.showMile ();
              })
          })
        
      },


      reopenMilestone (index) {
        let $vmc = this;
        let Mile = Parse.Object.extend ('Milestone');
        let query = new Parse.Query (Mile);
        query.get ($vmc.milestones[index].mileId)
          .then (resp => {
            resp.set ('mileOpened', true);
            resp.save ()
              .then (() => {
                $vmc.showMile ();
              })
          })
        
      },


      cancelEditing (index) {
        let $vmc = this;
        
        $vmc.milestones[index].titleEditing = false;
        $vmc.milestones[index].newTitle = '';
      },
    },
    
  }
</script>

<style scoped>
  
</style>