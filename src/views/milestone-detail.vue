<template>

<div>

<div id="wrap" class="my-3">


  <h3>{{ mileId }}</h3>


      <div class="row my-4">

        <div class="mb-0 d-flex align-items-center">

          <h4 class="text-left">

            <router-link :to="{ name: 'organization'}" tag="a" active-class="active">
              <a>{{ orgName }}</a>
            </router-link>
            / <router-link :to="{ name: 'project' }" tag="a" active-class="active">
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
        <router-link class="nav-item" :to="{ name: 'project' }" tag="li" active-class="active">
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

        <h4>{{ mileTitle }}</h4>

        <router-link class="ml-auto mr-2 btn btn-secondary" :to="{ name: 'milestone-detail' }" tag="button" active-class="active">
          編輯里程碑
        </router-link>

        <router-link class="btn btn-success" :to="{ name: 'milestone-detail' }" tag="button" active-class="active">
          建立問題
        </router-link>

      </div>

      <div class="row mt-3">

        <h5 class="mr-3">{{ dueDate }}</h5>

        <h5>{{ percentage }}% Completed</h5>
        
      </div>

      <hr />

      <div class="row">

        <div class="btn-group" role="group" aria-label="Basic example">
          <button @click="showOpened = true" type="button" class="btn btn-outline-secondary">
            {{ opened.length }} 個開啟中
          </button>
          <button @click="showOpened = false" type="button" class="btn btn-outline-secondary">
            {{ closed.length }} 個已關閉
          </button>
        </div>












    <div v-if="checked.length === 0" class="row ml-auto">

      <div class="dropdown mx-3">
        <button class="btn btn-outline-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          標籤篩選
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>

      <div class="dropdown mx-3">
        <button class="btn btn-outline-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          里程碑篩選
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>

      <div class="dropdown mx-3">
        <button class="btn btn-outline-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          指派人篩選
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>

      <div class="dropdown mx-3">
        <button class="btn btn-outline-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          類型篩選
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>

      <div class="dropdown mx-3">
        <button class="btn btn-outline-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          順序
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>

    </div>

    <div v-else class="row ml-auto">

      <div class="dropdown mx-3">

        <button @click="closeIssue" class="btn btn-outline-danger">
          關閉
        </button>

      </div>

      <div class="dropdown mx-3">

        <button class="btn btn-outline-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          標籤
        </button>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a @click="addLabelTo (label.labelId)" v-for="label in labels" class="dropdown-item" href="#">{{ label.title }}</a>
        </div>

      </div>

      <div class="dropdown mx-3">

        <button class="btn btn-outline-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          負責人
        </button>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a @click="assignTo (user.assigneeId, user.avatarHash)" v-for="user in users" class="dropdown-item" href="#">{{ user.name }}</a>
        </div>

      </div>

    </div>
    
    </div>









    <div class="mt-3 list-group list-group-flush" v-if="issues.length >= 1">

      <template v-for="issue in issues">

        <!-- Opened Issue-List Start-->

        <router-link v-if="issue.issueOpened === true && showOpened === true" :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="li" type="li"  class="list-group-item" active-class="active">

          <div class="row d-flex align-items-center">

            <input class="mr-3" type="checkbox" :value='issue.issueId' v-model="checked">
            <span class="px-3 py-2 badge badge-primary">#1</span>
            <a style="font-size: 20px;" class="ml-3 text-decoration-none">{{ issue.name }}</a>
            
            <span v-for="label in issue.labels" class="px-3 py-2 ml-3 badge badge-primary">{{ label }}</span>

            <span v-if="issue.mileTitle !== ''">
              <i class="ml-3 fa fa-map-signs" aria-hidden="true"></i> {{ issue.mileTitle }}
            </span>

          </div>

          <div class="row d-flex align-items-center">
            <div>由 Korver 建立</div>

            <div class="ml-auto">
              <img v-if="issue.avatarHash.length > 0" v-for="hash in issue.avatarHash" :src="'https://www.gravatar.com/avatar/' + hash" style="width: 30px" class="mr-3 rounded" alt="">
            </div>

          </div>
          
        </router-link>

        <!-- Opened Issue-List End -->

        <!-- Closed Issue-List Start -->

        <router-link v-else-if="issue.issueOpened === false && showOpened === false" :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="li" type="li" class="list-group-item" active-class="active">

          <div class="row d-flex align-items-center">

            <input class="mr-3" type="checkbox" :value='issue.issueId' v-model="checked">

            <span class="px-3 py-2 badge badge-primary">#1</span>
            <a style="font-size: 20px;" class="ml-3 text-decoration-none">{{ issue.name }}</a>
            
            <span v-for="label in issue.labels" class="px-3 py-2 ml-3 badge badge-primary">{{ label }}</span>

            <span v-if="issue.mileTitle !== ''">
              <i class="ml-3 fa fa-map-signs" aria-hidden="true"></i> {{ issue.mileTitle }}
            </span>

          </div>

          <div class="row d-flex align-items-center">
            <div>由 Korver 建立</div>

            <div class="ml-auto">
              <img v-if="issue.avatarHash.length > 0" v-for="hash in issue.avatarHash" :src="'https://www.gravatar.com/avatar/' + hash" style="width: 30px" class="mr-3 rounded" alt="">
            </div>

          </div>
          
        </router-link>

      </template>
        
    </div>



      <!-- <ul class="mt-5 list-group list-group-flush" v-if="issues.length >= 1">

        <li v-if="issue.issueOpened === true && showOpened === true" v-for="issue in issues" s tag="li" type="li" class="d-flex align-items-center list-group-item text-left" active-class="active">


            <input class="mr-3" type="checkbox" :value="{ issueId: issue.issueId, assigneeId: issue.assigneeId }" v-model="checked">

            <router-link :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="a" active-class="active">
              <a>{{ issue.name }}</a>
            </router-link>
            

            <span v-for="label in issue.labels" class="py-2 px-3 ml-3 badge badge-primary">{{ label }}</span>

          <template v-if="issue.avatarHash.length > 0" v-for="hash in issue.avatarHash">
            <img :src="'https://www.gravatar.com/avatar/' + hash" style="width: 50px" class="ml-auto float-right rounded" alt="">
          </template>
          
        </li>

        <li v-if="issue.issueOpened === false && showOpened === false" v-for="issue in issues" style="line-height: 50px" tag="li" type="li" class="clearfix text-left list-group-item list-group-item-action" active-class="active">

          <input class="mr-3" type="checkbox" :value="{ issueId: issue.issueId, assigneeId: issue.assigneeId }" v-model="checked">

          <router-link :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="a" active-class="active">
            <a>{{ issue.name }}</a>
          </router-link>

          <span v-for="label in issue.labels" class="py-2 px-3 ml-3 badge badge-primary">{{ label }}</span>

          <template v-if="issue.avatarHash.length > 0" v-for="hash in issue.avatarHash">
            <img :src="'https://www.gravatar.com/avatar/' + hash" style="width: 50px" class="ml-3 float-right rounded" alt="">
          </template>
          
        </li>

      </ul> -->

    </div>


  </div>

    

</template>

<script>
  import Parse from "parse";

  export default {
    

    name: 'milestone-detail',


    components: {
    },


    data () {
      return {
        proName: '',
        issues: [],
        username: this.$store.state.user.username,
        checked: [],
        opened: [],
        closed: [],
        showOpened: true,
        milestones: [],
        users: [],
        orgName: '',
        orgId: '',
        percentage: 0,
        labels: [],
        dueDate: '',

      }
    },


    computed: {
      mileId () {
        return this.$route.params.mileId;
      },


      mileTitle () {
        return this.$route.params.mileTitle;
      },


      proId () {
        return this.$route.params.proId;
      },


      userId () {
        return this.$store.state.user.input.userId;
      },


      checking () {
        let $vmc = this;
        if ($vmc.checked.length === 0) return false;
      }
    },


    mounted () {
      let $vmc = this;
      
      $vmc.showUser ();
      $vmc.showProName ();
      $vmc.showIssue ();
      $vmc.showMilestone ();
      $vmc.showLabel ();
    },


    methods: {
      addLabelTo (labelId) {
        let $vmc = this;

        let Label = Parse.Object.extend ('Label');
        let query = new Parse.Query (Label);
        let ary = [];

        query.get (labelId)
          .then (resp => {
            for (let i = 0; i < $vmc.checked.length; i ++) {
              
              resp.addUnique ('issueId', $vmc.checked[i].issueId);
              
            }
            
            resp.save ()
              .then (resp => {
                $vmc.showIssue ();
              });
          }, (error) => {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          });
      },
      

      showLabel () {
        let $vmc = this;
        let Label = Parse.Object.extend ('Label');
        let query = new Parse.Query (Label);
        let ary = [];

        query.equalTo ('proId', $vmc.proId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let object = resp[i];
              
              obj.labelId = object.id;
              obj.title = object.get ('title');
              obj.labelDesc = object.get ('labelDesc');
              obj.issueId = object.get ('issueId');
              ary.push (obj);
            }
          }, (error) => {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          });

        $vmc.labels = ary;
      },
      
      showIssue () {

        console.log ('issue');
        
        let $vmc = this;
        let ary = [];
        const Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);
        query.equalTo ('milestone', $vmc.mileId);
        query.find ()
          .then (resp => {
            $vmc.opened = [];
            $vmc.closed = [];

            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let object = resp[i];

              obj.name = object.get ('name');
              obj.issueId = object.id;
              obj.avatarHash = object.get ('avatarHash');
              obj.mileTitle = object.get ('mileTitle');

              let arry = [];
              let Label = Parse.Object.extend ('Label');
              let query = new Parse.Query (Label);

              query.equalTo ('issueId', object.id);
              query.find ()
                .then (resp => {
                  for (let i = 0; i < resp.length; i ++) {
                    let object = resp[i];
                    arry.push (object.get ('title'));
                  }
                });

              obj.labels = arry;
              obj.issueOpened = object.get ('issueOpened');

              if (obj.issueOpened === true) {
                $vmc.opened.push (object.id);
              } else {
                $vmc.closed.push (object.id);
              }

              ary.push (obj);
            }
          })
          .then (resp => {
            let closed = $vmc.closed.length;
            let opened = $vmc.opened.length
            if (opened + closed === 0) {
              $vmc.percentage = 0;
            } else {
              $vmc.percentage = ((closed / (opened + closed)) * 100).toFixed (0);
            }
          })

          $vmc.issues = ary;
      },


      showUser () {
        let $vmc = this;
        let Project = Parse.Object.extend ('Project');
        let query = new Parse.Query (Project);
        let ary = [];
        query.get ($vmc.proId)
          .then (resp => {
            let orgId = resp.get ('orgId');
            let Org = Parse.Object.extend ('Organization');
            let query = new Parse.Query (Org);
            $vmc.orgId = orgId;
            query.get (orgId)
              .then (resp => {
                let results = resp.get ('memberId');
                for (let i = 0; i < results.length; i ++) {
                  let obj = {};
                  let object = results[i];
                  let Account = Parse.Object.extend ('Account');
                  let query = new Parse.Query (Account);
                  query.get (object)
                    .then (resp => {
                      // obj.uerId = object;
                      obj.name = resp.get ('username');
                      obj.assigneeId = object;
                      obj.avatarHash = resp.get ('avatarHash');
                      obj.email = resp.get ('email');

                      ary.push (obj);
                    });
                }
              });

              $vmc.users = ary;
          }, (error) => {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          });

      },


      showProName () {
        let $vmc = this;
        let id = $vmc.$route.params.proId;

        const Pro = Parse.Object.extend ('Project');
        let query = new Parse.Query (Pro);
        query.get (id)
          .then (resp => {
            $vmc.proName = resp.get ('name');
            $vmc.orgName = resp.get ('orgName');
          });
      },


      closeIssue () {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');

        for (let i = 0; i < $vmc.checked.length; i ++) {
          let query = new Parse.Query (Issue);
          query.get ($vmc.checked[i].issueId)
            .then (resp => {
              resp.set ('issueOpened', false);
              resp.save ()
                .then (() => {
                  $vmc.showIssue ();
                })
              }, (error) => {});
        }

        $vmc.checked = [];
      },


      reopenIssue () {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        for (let i = 0; i < $vmc.checked.length; i ++) {
          let query = new Parse.Query (Issue);
          query.get ($vmc.checked[i].issueId)
          .then (resp => {
            resp.set ('issueOpened', true);
            resp.save ()
              .then (() => $vmc.showIssue ());
            // The object was retrieved successfully.
            }, (error) => {
              // The object was not retrieved successfully.
              // error is a Parse.Error with an error code and message.
            });
        }

        $vmc.checked = [];
      },













      showMilestone () {
        let $vmc = this;
        let Mile = Parse.Object.extend ('Milestone');
        let query = new Parse.Query (Mile);
        query.get ($vmc.mileId)
          .then (resp => {
            $vmc.dueDate = resp.get ('dueDate');
          })



        
        // let ary = [];
        // query.equalTo ('proId', $vmc.proId);
        // query.find ()
        //   .then (resp => {
        //     for (let i = 0; i < resp.length; i++) {
        //       let obj = {};
        //       let object = resp[i];
        //       obj.mileId = object.id;
        //       obj.title = object.get ('title');
        //       $vmc.dueDate = object.get ('dueDate');
        //       ary.push (obj)
        //     }
        //   });
        // $vmc.milestones = ary;
      },


















      addIssueTo (mileId) {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let ary = [];

        for (let i = 0; i < $vmc.checked.length; i ++) {
          let query = new Parse.Query (Issue);
          
          query.get ($vmc.checked[i].issueId)
            .then (resp => {
              
              resp.set ('milestone', mileId);
              resp.save ()
                .then (resp => {
                  $vmc.showIssue ();
                  $vmc.checked = [];
                });
              
              let Mile = Parse.Object.extend ('Milestone');
              let query = new Parse.Query (Mile);
              query.get (mileId)
                .then (resp => {
                  // The object was retrieved successfully.
                  resp.set ('proId', $vmc.proId);
                  return resp.save ();
                }, (error) => {
                  // The object was not retrieved successfully.
                  // error is a Parse.Error with an error code and message.
                });
              
            }, (error) => {
              // The object was not retrieved successfully.
              // error is a Parse.Error with an error code and message.
            });

        }
      },


      assignTo (assigneeId, avatarHash) {

        console.log (assigneeId, avatarHash);
        
        let $vmc = this;
        let ary = [];
        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);


        console.log ($vmc.checked);

        for (let i = 0; i < $vmc.checked.length; i ++) {
          let object = $vmc.checked[i];
          let query = new Parse.Query (Issue);

          query.get (object)
            .then (resp => {
                resp.addUnique ('avatarHash', avatarHash);
                resp.addUnique ('assigneeId', assigneeId);

                console.log (assigneeId, avatarHash);
                
                resp.save ()
                  .then (() => {
                    $vmc.showIssue ();
                    $vmc.checked = [];
                  })
              })
        }
        
        // query.containedIn ('objectId', checkedIds);
        // query.find ()
        //   .then (resp => {
        //     for (let i = 0; i < resp.length; i ++) {
        //       let obj = {};
        //       let object = resp[i];
        //       let query = new Parse.Query (Issue);
        //       query.get (object.id)
        //         .then (resp => {
        //           resp.addUnique ('avatarHash', avatarHash);
        //           resp.addUnique ('assigneeId', assigneeId);

        //           console.log (assigneeId, avatarHash);
                  
        //           resp.save ()
        //             .then (() => {
        //               $vmc.showIssue ();
        //               $vmc.checked = [];
        //             })
        //         })

        //     }
        //   })

      },


      
      addMilestone () {
        let $vmc = this;

        const Mile = Parse.Object.extend ('Milestone');
        const mile = new Mile ();

        mile.set ('title', $vmc.mileTitle);
        mile.set ('proId', $vmc.proId);
        mile.set ('orgId', $vmc.orgId);
        mile.set ('mileOpened', true);

        mile.save ()
          .then (resp => {
            $vmc.mileTitle = '';
            $vmc.showMilestone ();
            // $vmc.showMile ();
            // Execute any logic that should take place after the object is saved.
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert ('Failed to create new object, with error code: ' + error.message);
          });
      },
    },

    watch: {
    }
  }
</script>

<style scoped>
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  };
</style>