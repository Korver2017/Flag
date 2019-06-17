<template>

  <div id="wrap" class="my-3">

    <div class="row my-4">

      <div class="mb-0 d-flex align-items-center">

        <h4 class="text-left">

          <router-link :to="{ name: 'organization' }" tag="a" active-class="active">
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
      <router-link class="nav-item" :to="{ name: 'project' }" tag="li" active-class="active">
        <a class="nav-link active">問題 <span class="ml-2 badge badge-secondary">{{ issues.length }}</span></a>
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

        <router-link :to="{ name: 'label-list', params: { proId: proId, issues: issues } }" tag="button" class="btn btn-outline-secondary" active-class="active">
          標籤
        </router-link>

        <router-link :to="{ name: 'milestone', params: { proId: proId } }" tag="button" class="btn btn-outline-secondary" active-class="active">
          里程碑
        </router-link>
        
      </div>

      <div>

        <div class="input-group">
          <input type="text" class="form-control p-2" placeholder="搜尋..." aria-label="搜尋..." aria-describedby="button-addon2">
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" id="button-addon2">搜尋</button>
          </div>
        </div>

      </div>

      <div>

        <router-link class="btn btn-success" :to="{ name: 'add-issue' }" tag="button" active-class="active">
          建立問題
        </router-link>

      </div>

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
            里程碑
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a @click="addIssueTo (mile.mileId, mile.title)" v-for="mile in milestones" class="dropdown-item" href="#">{{ mile.title }}</a>
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

    <!-- Issue List -->

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

    <nav class="my-3 d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true">上一頁</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active" aria-current="page">
          <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">下一頁</a>
        </li>
      </ul>
    </nav>

  </div>

</template>

<script>
  import Parse from "parse";

  export default {
    

    name: 'project',


    components: {
    },


    data () {
      return {
        proName: '',
        orgName: '',
        issues: [],
        labels: [],
        checked: [],
        opened: [],
        closed: [],
        showOpened: true,
        milestones: [],
        users: [],
      }
    },


    computed: {

      orgId () {
        return this.$route.params.orgId;
      },
      
      proId () {
        return this.$route.params.proId;
      },


      userId () {
        return this.$store.state.user.input.userId;
      },

      
      username () {
        return this.$store.state.user.username
      },


      checking () {
        let $vmc = this;
        if ($vmc.checked.length === 0) return false;
      }
    },


    created () {
    },


    mounted () {
      let $vmc = this;
      
      $vmc.showUser ();
      $vmc.showProName ();
      $vmc.showIssue ();
      $vmc.showLabel ();
      $vmc.showMilestone ();
    },


    methods: {


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
            // $vmc.orgId = orgId;
            query.get ($vmc.orgId)
              .then (resp => {
                let results = resp.get ('memberId');
                for (let i = 0; i < results.length; i ++) {
                  let obj = {};
                  let object = results[i];
                  let Account = Parse.Object.extend ('Account');
                  let query = new Parse.Query (Account);
                  query.get (object)
                    .then (resp => {
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

      showIssue () {
        let $vmc = this;
        const Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);

        query.equalTo ('proId', $vmc.proId);
        let ary = [];
        let opened = [];
        let closed = [];
        query.find ().then (resp => {
          for (let i = 0; i < resp.length; i++) {
            let obj = {};
            let object = resp[i];

            obj.name = object.get ('name');
            obj.issueId = object.id;
            obj.creator = object.get ('creator');
            obj.issueOpened = object.get ('issueOpened');
            obj.avatarHash = object.get ('avatarHash');
            obj.assigneeId = object.get ('assigneeId');
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
            ary.push (obj);

            if (obj.issueOpened === true) {
              opened.push (obj);
            } else if (obj.issueOpened === false) {
              closed.push (obj);
            }
          }
        });

        $vmc.issues = ary;
        $vmc.opened = opened;
        $vmc.closed = closed;
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


      closeIssue () {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');

        for (let i = 0; i < $vmc.checked.length; i ++) {
          let query = new Parse.Query (Issue);

          query.get ($vmc.checked[i])
            .then (resp => {
              resp.set ('issueOpened', false);
              resp.save ()
                .then (() => {
                  $vmc.showIssue ();
                })
            }, (error) => {
          });
        }
        $vmc.checked = [];
      },


      showMilestone () {
        let $vmc = this;
        let Mile = Parse.Object.extend ('Milestone');
        let query = new Parse.Query (Mile);
        let ary = [];
        query.equalTo ('proId', $vmc.proId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i++) {
              let obj = {};
              let object = resp[i];
              obj.mileId = object.id;
              obj.title = object.get ('title');
              ary.push (obj)
            }
          });

        $vmc.milestones = ary;
      },


      addLabelTo (labelId) {
        let $vmc = this;
        let Label = Parse.Object.extend ('Label');
        let query = new Parse.Query (Label);

        query.get (labelId)
          .then (resp => {
            for (let i = 0; i < $vmc.checked.length; i ++) {
              let object = $vmc.checked[i];
              
              resp.addUnique ('issueId', object);
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


      addIssueTo (mileId, mileTitle) {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let ary = [];

        for (let i = 0; i < $vmc.checked.length; i ++) {
          let query = new Parse.Query (Issue);
          
          query.get ($vmc.checked[i])
            .then (resp => {
              resp.set ('milestone', mileId);
              resp.set ('mileTitle', mileTitle);

              resp.save ()
                .then (resp => {
                  $vmc.showIssue ();
                  $vmc.checked = [];
                });
              
              let Mile = Parse.Object.extend ('Milestone');
              let query = new Parse.Query (Mile);
              query.get (mileId)
                .then (resp => {
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
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let ary = [];
        let query = new Parse.Query (Issue);
        
        query.containedIn ('objectId', $vmc.checked);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let object = resp[i];
              let query = new Parse.Query (Issue);
              query.get (object.id)
                .then (resp => {
                  resp.addUnique ('avatarHash', avatarHash);
                  resp.addUnique ('assigneeId', assigneeId);
                  // obj.assignee = userId;
                  // obj.avatarHash = avatarHash;
                  // resp.addUnique ('assignee', obj);
                  resp.save ()
                    .then (() => {
                      $vmc.showIssue ();
                      $vmc.checked = [];
                    })
                })

            }
          })

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
}

.list-group-item {
  border: 0;
  border-bottom: 3px dotted rgba(0, 0, 0, .125);
}
</style>