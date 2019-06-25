<template>

    <div id="wrap" class="my-3">

      <sub-navbar :issueCount="issueCount" :orgId="orgId" :orgName="orgName" :proId="proId" :proName="proName" />

      <!-- <div class="row my-4">

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
          <a class="nav-link active">問題 <span class="ml-2 badge badge-secondary">{{ issueCount }}</span></a>
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
      </ul> -->

      <div class="row my-4 d-flex justify-content-between">

        <div class="btn-group" role="group" aria-label="Basic example">

          <router-link :to="{ name: 'label-list', params: { orgId: orgId, proId: proId, orgName: orgName, proName: proName }}" tag="button" class="btn btn-outline-secondary" active-class="active">
            標籤
          </router-link>

          <router-link :to="{ name: 'milestone', params: { orgId: orgId, proId: proId, orgName: orgName, proName: proName } }" tag="button" class="btn btn-outline-secondary" active-class="active">
            里程碑
          </router-link>
          
        </div>

        <div>
          <router-link :to="{ name: 'new-milestone', params: { orgId: orgId, proId: proId } }" tag="button" class="btn btn-success" active-class="active">
            新的里程碑
          </router-link>
        </div>

      </div>

      <hr />

      <state-counter @changeState="updateState" :openedCount="mileOpened" :closedCount="mileClosed" :showOpened="showOpened" />

      <div class="container my-4">
        
        <ul v-for="(mile, index) in milestones" class="list-group list-group-flush">

          <li v-if="mile.mileOpened === true && showOpened === true" class="text-left list-group-item">

              <div class="row">
                
                <div class="col-6">

                  <router-link v-if="milestones" :to="{ name: 'milestone-detail', params: { mileId: mile.mileId } }" class="text-decoration-none" tag="a" active-class="active">
                    <h3 class="">{{ mile.title }}</h3>
                  </router-link>

                  <div class="row text-left">

                    <div v-if="milestones[index].dueDate !== '' || undefined || null" class="mr-3">{{ milestones[index].dueDate }}</div>

                    <div class="mr-3">{{ milestones[index].open }} 個開啟中</div>
                    <div class="">{{ milestones[index].closed }} 個已關閉</div>

                  </div>

                </div>

                <div class="col-6">

                  <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" :style="{ width: mile.percentage + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>

                  <div class="mt-2 text-right">

                    <router-link class="mr-3 btn btn-success" :to="{ name: 'edit-milestone', params: { mileId: milestones[index].mileId } }" tag="button" active-class="active">
                      編輯
                    </router-link>

                    <button v-if="milestones[index].mileOpened === true && milestones[index].mileEditing === false" class="mr-3 btn btn-warning" @click.prevent="closeMilestone (index)">關閉</button>

                    <button v-else-if="milestones[index].mileOpened === false && milestones[index].mileEditing === false" class="mr-3 btn btn-primary" @click.prevent="reopenMilestone (index)">重新開啟</button>

                    <button v-if="milestones[index].mileEditing === false" class="mr-3 btn btn-danger" @click="deleteMile (index)">刪除</button>

                  </div>

                </div>

              </div>


          </li>

          <li v-if="mile.mileOpened === false && showOpened === false" class="py-5 text-left list-group-item">

              <div class="row">
                
                <div class="col-6">

                  <router-link v-if="milestones" :to="{ name: 'milestone-detail', params: { mileId: mile.mileId } }" class="text-decoration-none" tag="a" active-class="active">
                    <h3 class="">{{ mile.title }}</h3>
                  </router-link>

                  <div class="row text-left">

                    <div v-if="milestones[index].dueDate !== '' || undefined || null" class="mr-3">{{ milestones[index].dueDate }}</div>

                    <div class="mr-3">{{ milestones[index].open }} 個開啟中</div>
                    <div class="">{{ milestones[index].closed }} 個已關閉</div>

                  </div>

                </div>

                <div class="col-6">

                  <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" :style="{ width: mile.percentage + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>

                  <div class="mt-2 text-right">

                    <router-link class="mr-3 btn btn-success" :to="{ name: 'edit-milestone', params: { mileId: milestones[index].mileId } }" tag="button" active-class="active">
                      編輯
                    </router-link>

                    <button v-if="milestones[index].mileOpened === true && milestones[index].mileEditing === false" class="mr-3 btn btn-warning" @click.prevent="closeMilestone (index)">關閉</button>

                    <button v-else-if="milestones[index].mileOpened === false && milestones[index].mileEditing === false" class="mr-3 btn btn-primary" @click.prevent="reopenMilestone (index)">重新開啟</button>

                    <button v-if="milestones[index].mileEditing === false" class="mr-3 btn btn-danger" @click="deleteMile (index)">刪除</button>

                  </div>

                </div>

              </div>

          </li>

        </ul>

      </div>

    </div>

</template>

<script>
  
  import Parse from "parse";
  import stateCounter from "@/components/state-counter.vue";
  import subNavbar from "@/components/sub-navbar.vue";

  export default {


    name: 'milestone',


    components: {
      stateCounter,
      subNavbar,
    },


    data () {
      return {
        milestones: [],
        showOpened: true,
        mileOpened: 0,
        mileClosed: 0,
        // orgName: '',
        // proName: '',
        mileIssues: [],
        issueCount: '',
      }
    },


    computed: {
      orgId () {
        return this.$route.params.orgId;
      },

      proId () {
        return this.$route.params.proId; 
      },

      orgName () {
        return this.$route.params.orgName;
      },

      proName () {
        return this.$route.params.proName;
      },

    },


    created () {
    },


    mounted () {
      console.log (this.$route.params);
      let $vmc = this;

      $vmc.showMile ();
      // $vmc.showRouteName ();      
      $vmc.showIssueCount ();
    },


    methods: {
      updateState (newState) {
        this.showOpened = newState;
      },
      
      showIssueCount () {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);

        query.equalTo ('proId', $vmc.proId);
        query.find ()
          .then (resp => {
            $vmc.issueCount = resp.length;
          });

      },

      // showRouteName () {
      //   let $vmc = this;
      //   let Project = Parse.Object.extend ('Project');
      //   let query = new Parse.Query (Project);

      //   query.get ($vmc.proId)
      //     .then (resp => {
      //       $vmc.orgName = resp.get ('orgName');
      //       $vmc.proName = resp.get ('name');
      //     }, (error) => {
      //       // The object was not retrieved successfully.
      //       // error is a Parse.Error with an error code and message.
      //     });
      // },
      
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


      deleteMile (index) {
        let $vmc = this;
        let mileId = $vmc.milestones[index].mileId;
        let Mile = Parse.Object.extend ('Milestone');
        let query = new Parse.Query (Mile);

        query.get (mileId)
          .then (resp => {
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
    
    }
  }
</script>

<style scoped>
  
</style>