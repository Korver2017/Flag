<template>

    <div id="wrap" class="my-3">

      <div class="row my-4">

        <div class="mb-0 d-flex align-items-center">

          <h4 class="text-left">

            <router-link :to="{ name: 'organization'}" tag="a" active-class="active">
              <a>{{ orgName }}</a>
            </router-link>
            / <router-link :to="{ name: 'project'}" tag="a" active-class="active">
              <a>{{ proName }}</a>
            </router-link>

          </h4>

        </div>

        <div class="ml-auto">

          <div class="pr-3 btn-group btn-group-toggle" data-toggle="buttons">
            <label class="border border-dark btn">
              <input type="radio" name="options" id="option1" autocomplete="off" checked> 取消關注
            </label>
            <label class="border border-dark btn">
              <input type="radio" name="options" id="option2" autocomplete="off"> 8
            </label>
          </div>

          <div class="pr-3 btn-group btn-group-toggle" data-toggle="buttons">
            <label class="border border-dark btn">
              <input type="radio" name="options" id="option1" autocomplete="off" checked> 收藏
            </label>
            <label class="border border-dark btn">
              <input type="radio" name="options" id="option2" autocomplete="off"> 0
            </label>
          </div>

          <div class="pr-3 btn-group btn-group-toggle" data-toggle="buttons">
            <label class="border border-dark btn">
              <input type="radio" name="options" id="option1" autocomplete="off" checked> 複製
            </label>
            <label class="border border-dark btn">
              <input type="radio" name="options" id="option2" autocomplete="off"> 0
            </label>
          </div>

        </div>

      </div>

      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" href="#">程式碼</a>
        </li>
        <router-link class="nav-item" :to="{ name: 'project', params: { orgId: orgId, proId: proId } }" tag="li" active-class="active">
          <a class="nav-link active">問題 <span class="ml-2 badge badge-secondary">123</span></a>
        </router-link>
        <li class="nav-item">
          <a class="nav-link" href="#">合併請求<span class="ml-2 badge badge-secondary">0</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">版本發佈<span class="ml-2 badge badge-secondary">0</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Wiki</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">活動</a>
        </li>
        <li class="ml-auto nav-item">
          <a class="nav-link" href="#">儲存庫設定</a>
        </li>
      </ul>

      <div class="row my-4 d-flex justify-content-between">

        <div class="btn-group" role="group" aria-label="Basic example">

          <router-link :to="{ name: 'label-list', params: { proId: proId }}" tag="button" class="btn btn-outline-secondary" active-class="active">
            標籤
          </router-link>

          <router-link :to="{ name: 'milestone', params: { proId: proId } }" tag="button" class="btn btn-outline-secondary" active-class="active">
            里程碑
          </router-link>
          
        </div>

        <div>
          <router-link :to="{ name: 'new-milestone', params: { orgId: orgId, proId: proId, orgName: orgName, proName: proName } }" tag="button" class="btn btn-success" active-class="active">
            新的里程碑
          </router-link>
        </div>

      </div>

      <hr />

      <div class="row">

        <div class="btn-group" role="group" aria-label="Basic example">
          <button @click="showOpened = true" type="button" class="btn btn-outline-secondary">
            {{ mileOpened }} 個開啟中
          </button>
          <button @click="showOpened = false" type="button" class="btn btn-outline-secondary">
            {{ mileClosed }} 個已關閉
          </button>
        </div>

      </div>



    <div class="container my-4">
      
      <ul v-for="(mile, index) in milestones" class="list-group list-group-flush">

        <li v-if="mile.mileOpened === true && showOpened === true" class="text-left list-group-item">

          <div v-if="milestones[index].mileEditing === false">

            <div class="row">
              
              <div class="col-6">

              <router-link v-if="milestones" :to="{ name: 'milestone-detail', params: { mileId: mile.mileId } }" class="text-decoration-none" tag="a" active-class="active">
                <h3 class="">{{ mile.title }}</h3>
              </router-link>

                <p v-if="milestones[index].dueDate !== ''">Due Date by {{ milestones[index].dueDate }}</p>
                <p v-if="milestones[index].mileDesc !== ''">{{ milestones[index].mileDesc }}</p>

              </div>

              <div class="col-6">

                <div class="progress">
                  <div class="progress-bar bg-success" role="progressbar" :style="{ width: mile.percentage + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                <div class="mt-2 text-right">

                  <button v-if="milestones[index].mileEditing === false" class="mr-3 btn btn-success" @click.prevent="milestones[index].mileEditing = true">Edit</button>
                  <button v-if="milestones[index].mileOpened === true && milestones[index].mileEditing === false" class="mr-3 btn btn-warning" @click.prevent="closeMilestone (index)">Close</button>
                  <button v-else-if="milestones[index].mileOpened === false && milestones[index].mileEditing === false" class="mr-3 btn btn-primary" @click.prevent="reopenMilestone (index)">Reopen</button>
                  <button v-if="milestones[index].mileEditing === false" class="mr-3 btn btn-danger" @click="deleteMile (index)">Delete</button>

                </div>

              </div>

            </div>

          </div>

















          <div v-else class="col-8 mx-auto form-group text-left">

            <label>Milestone Title</label>
            <input v-model.trim="milestones[index].title" class="mb-3 form-control">

            <label>Due Date (Optional)</label>
            <date-picker v-model="milestones[index].dueDate" :config="options"></date-picker>

            <label class="mt-3" for="description">Description</label>
            <textarea v-model="milestones[index].mileDesc" class="form-control mb-3" rows="10" id="description"></textarea>

            <div class="text-center">

              <button class="mx-1 btn btn-success" @click.prevent="updateMile (index)">Update</button>
              <button class="mx-1 btn btn-danger" @click.prevent="cancelEditing (index)">Cancel</button>

            </div>

          </div>

        </li>

        <li v-if="mile.mileOpened === false && showOpened === false" class="py-5 text-left list-group-item">

          <div v-if="milestones[index].mileEditing === false">

            <!-- <router-link v-if="milestones" :to="{ name: 'milestone-detail', params: { mileId: mile.mileId, mileTitle: mile.title }}" class="text-decoration-none" tag="a" active-class="active">
              <h3 class="my-3">{{ mile.title }}</h3>
            </router-link> -->

            <div class="row">

              <div class="col-6">

                <p v-if="milestones[index].dueDate !== ''">Due Date by {{ milestones[index].dueDate }}</p>
                <p v-if="milestones[index].mileDesc !== ''">{{ milestones[index].mileDesc }}</p>

              </div>

              <div class="col-6">

                <div class="mx-auto row">
                  <p class="mx-2">{{ mile.percentage }}% Complete</p>
                  <p class="mx-2">{{ mile.open }} open</p>
                  <p class="mx-2">{{ mile.closed }} closed</p>
                </div>

                <div class="progress">
                  <div class="progress-bar bg-success" role="progressbar" :style="{ width: mile.percentage + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

              </div>

              <div class="text-right mb-5 ml-auto mr-5">

                <div class="text-right mt-3">

                  <button v-if="milestones[index].mileEditing === false" class="mr-3 btn btn-success" @click.prevent="milestones[index].mileEditing = true">Edit</button>
                  <button v-if="milestones[index].mileOpened === true && milestones[index].mileEditing === false" class="mr-3 btn btn-warning" @click.prevent="closeMilestone (index)">Close</button>
                  <button v-else-if="milestones[index].mileOpened === false && milestones[index].mileEditing === false" class="mr-3 btn btn-primary" @click.prevent="reopenMilestone (index)">Reopen</button>
                  <button v-if="milestones[index].mileEditing === false" @click="deleteMile (index)" class="mr-3 btn btn-danger">Delete</button>

                </div>

              </div>

            </div>

          </div>

          <div v-else class="col-8 mx-auto form-group text-left">

            <label>Milestone Title</label>
            <input v-model.trim="milestones[index].title" class="mb-3 form-control">

            <label>Due Date (Optional)</label>
            <date-picker v-model="milestones[index].dueDate" :config="options"></date-picker>

            <label class="mt-3" for="description">Description</label>
            <textarea v-model="milestones[index].mileDesc" class="form-control mb-3" rows="10" id="description"></textarea>

            <div class="text-center">

              <button class="mx-1 btn btn-success" @click.prevent="updateMile (index)">Update</button>
              <button class="mx-1 btn btn-danger" @click.prevent="cancelEditing (index)">Cancel</button>

            </div>

          </div>

        </li>

      </ul>

    </div>

    </div>


</template>

<script>
  
  import Parse from "parse";
  // import DatetimePicker from "@/components/datetime-picker.vue";
  
  // Import this component
  import datePicker from 'vue-bootstrap-datetimepicker';
  
  // Import date picker css
  import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

  export default {


    name: 'milestone',


    components: {
      datePicker
    },


    data () {
      return {
        date: '',
        options: {
          format: 'DD/MM/YYYY',
          useCurrent: false,
        },
        addingMile: false,
        mileDesc: '',
        milestones: [],
        showOpened: true,
        mileTitle: '',
        mileOpened: 0,
        mileClosed: 0,
        // orgId: '',
        orgName: '',
        proName: '',
        mileIssues: [],
        editingMile: false,
      }
    },


    computed: {
      proId () {
        return this.$route.params.proId; 
      },

      orgId () {
        return this.$route.params.orgId;
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
      $vmc.showRouteName ();      
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
                  obj.dueDate = object.get ('dueDate');
                  obj.mileDesc = object.get ('mileDesc');
                  obj.mileOpened = object.get ('mileOpened');
                  obj.all = all;
                  obj.closed = closed;
                  obj.open = all - closed;

                  if (all === 0) {
                    obj.percentage = 0;
                  } else {
                    obj.percentage = ((closed / all) * 100).toFixed (0);
                  }
                  
                  obj.titleEditing = false;
                  obj.newTitle = '';
                  obj.mileEditing = false,
                  
                  ary.push (obj);

                  $vmc.milestones = ary;

                });
            }
          })

      },


      // addMilestone () {
      //   let $vmc = this;

      //   const Mile = Parse.Object.extend ('Milestone');
      //   const mile = new Mile ();

      //   mile.set ('title', $vmc.mileTitle);
      //   mile.set ('proId', $vmc.proId);
      //   mile.set ('orgId', $vmc.orgId);
      //   mile.set ('mileOpened', true);
      //   mile.set ('dueDate', $vmc.date);
      //   mile.set ('mileDesc', $vmc.mileDesc);

      //   mile.save ()
      //     .then (resp => {
      //       $vmc.mileTitle = '';
      //       $vmc.showMile ();
      //       $vmc.cancelAddMile ();
      //       // $vmc.showMile ();
      //       // Execute any logic that should take place after the object is saved.
      //     }, (error) => {
      //       // Execute any logic that should take place if the save fails.
      //       // error is a Parse.Error with an error code and message.
      //       alert ('Failed to create new object, with error code: ' + error.message);
      //     });
      // },


      cancelAddMile () {
        let $vmc = this;
        $vmc.mileTitle = '';
        $vmc.date = '';
        $vmc.addingMile = false;
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


      updateMile (index) {
        let $vmc = this;
        let mileId = $vmc.milestones[index].mileId;
        let Mile = Parse.Object.extend ('Milestone');
        let query = new Parse.Query (Mile);

        query.get (mileId)
          .then (resp => {
            // Now let's update it with some new data. In this case, only cheatMode and score
            // will get sent to the cloud. playerName hasn't changed.
            resp.set ('title', $vmc.milestones[index].title);
            resp.set ('dueDate', $vmc.milestones[index].dueDate);
            resp.set ('mileDesc', $vmc.milestones[index].mileDesc);
            resp.save ()
              .then (resp => {
                $vmc.cancelEditing (index);
              })
          })
      },


      deleteMile (index) {
        let $vmc = this;
        let mileId = $vmc.milestones[index].mileId;
        let Mile = Parse.Object.extend ('Milestone');
        let query = new Parse.Query (Mile);

        query.get (mileId)
          .then (resp => {
            // Now let's update it with some new data. In this case, only cheatMode and score
            // will get sent to the cloud. playerName hasn't changed.
            if (confirm ('確定要刪除此 Milestone 嗎？')) {
              resp.destroy ()
                .then (resp => {
                  $vmc.showMile ();
                // The object was deleted from the Parse Cloud.
              }, (error) => {
                // The delete failed.
                // error is a Parse.Error with an error code and message.
              });
            }
            
            else return;
          })
      },


      cancelEditing (index) {
        let $vmc = this;
        let mileId = $vmc.milestones[index].mileId;
        let Mile = Parse.Object.extend ('Milestone');
        let query = new Parse.Query (Mile);

        query.get (mileId)
          .then (resp => {
            $vmc.milestones[index].title = resp.get ('title');
            $vmc.milestones[index].dueDate = resp.get ('dueDate');
            $vmc.milestones[index].mileDesc = resp.get ('mileDesc');
          })
          .then (resp => {
            $vmc.milestones[index].mileEditing = false;
          });
      },


      showMileDetail (mileId) {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);
        let ary = [];
        query.equalTo ('milestone', mileId);
        query.find()
          .then (resp => {
            for (let i = 0; i < resp.length; i++) {
              let object = resp[i];
              ary.push (object.get ('name'));
            }
          })

        $vmc.mileIssues = ary;
        
      }
    },
    
  }
</script>

<style scoped>
  
</style>