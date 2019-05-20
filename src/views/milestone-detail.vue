<template>
  <div class="container my-4">

    <h1>Milestone Detail Component</h1>
    <!-- <h1>{{ mileId }}</h1> -->
    
    <h3 class="my-5 text-left">

      <router-link :to="{ name: 'organization'}" tag="a" active-class="active">
        <a>{{ orgName }}</a>
      </router-link>
       / 
      <router-link :to="{ name: 'project'}" tag="a" active-class="active">
        <a>{{ proName }}</a>
      </router-link>

      <h1 class="my-3">{{ mileTitle }}</h1>

    </h3>
    

    <!-- Mark-As Dropdown Menu -->

    <div class="row">

      <div class="rwo text-left mb-5">

        <button @click="showOpened = true" type="button" class="ml-3 btn btn-info">
          Open <span class="badge badge-light">{{ opened.length }}</span>
        </button>
        <button @click="showOpened = false" type="button" class="ml-3 btn btn-secondary">
          Closed <span class="badge badge-light">{{ closed.length }}</span>
        </button>

      </div>
      
      <div class="dropdown ml-auto mr-3 mb-3">
        <button :disabled="checking === false" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Mark as
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button @click="reopenIssue" class="dropdown-item">Open</button>
          <button @click="closeIssue" class="dropdown-item">Closed</button>
        </div>
      </div>

      <!-- Milestone Dropdown Menu -->

      <div class="dropdown mr-3">
        <button :disabled="checking === false" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          加入到 Milestone
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button @click="addIssueTo (mile.mileId)" v-for="(mile, index) in milestones" class="dropdown-item">

            {{ mile.title }}

            <template v-if="mileId === mile.mileId">
              <i class="ml-2 fa fa-check" aria-hidden="true"></i>
            </template>

            </button>
        </div>
      </div>

      <!-- Assign-To Dropdown Menu -->

      <div class="dropdown mr-3">
        <button :disabled="checking === false" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Assign to
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button v-for="user in users" @click="assignTo (user.assigneeId, user.avatarHash)" class="dropdown-item">

            {{ user.name }}

            <!-- <template v-for="c in checked">

              <template v-for="assigneeId in c.assigneeId">
                {{ user.name }}
                <i v-if="assigneeId === user.assigneeId" class="ml-2 fa fa-check" aria-hidden="true"></i>

              </template>
              
            </template> -->
            
          </button>
        
        </div>
      </div>
      
    </div>

    <h3 class="text-left">{{ percentage }}% Complete</h3>

    <!-- Issue List -->

    <div class="progress">
      <div class="progress-bar bg-success" role="progressbar" :style="{ width: percentage + '%' }" aria-valuemin="0" aria-valuemax="100"></div>
    </div>

    <div class="mt-5 list-group" v-if="issues.length >= 1">

        <li v-if="issue.issueOpened === true && showOpened === true" v-for="issue in issues" style="line-height: 50px" tag="li" type="li" class="clearfix text-left list-group-item list-group-item-action" active-class="active">

          <input class="mr-3" type="checkbox" :value="{ issueId: issue.issueId, assigneeId: issue.assigneeId }" v-model="checked">

          <router-link :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="a" active-class="active">
            <a>{{ issue.name }}</a>
          </router-link>
          

          <span v-for="label in issue.labels" class="py-2 px-3 ml-3 badge badge-primary">{{ label }}</span>

          <template v-if="issue.avatarHash.length > 0" v-for="hash in issue.avatarHash">
            <img :src="'https://www.gravatar.com/avatar/' + hash" style="width: 50px" class="ml-3 float-right rounded" alt="">
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
        adding: false,
        title: '',
        content: '',
        username: this.$store.state.user.username,
        labels: [],
        checked: [],
        opened: [],
        closed: [],
        showOpened: true,
        milestones: [],
        users: [],
        orgName: '',
        orgId: '',
        percentage: 0,
        // proId: '',
        // mileTitle: '',
      }
    },


    computed: {
      mileId () {
        return this.$route.params.mileId;
      },


      mileTitle () {
        return this.$route.params.mileTitle;
      },


      // checkExist () {
      //   let $vmc = this;
      //   $vmc.checked.forEach (item => {
      //     console.log (item);
      //   })
      // },


      proId () {
        return  this.$route.params.proId;
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
    },


    methods: {
      showIssue () {
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
              obj.assigneeId = object.get ('assigneeId');

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
      

      addIssue () {
        this.adding = true;
      },

      submitIssue () {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let issue = new Issue ();
        let query = new Parse.Query (Issue);

        issue.set ('name', $vmc.title);
        issue.set ('content', $vmc.content);
        issue.set ('creator', $vmc.$store.state.user.username);
        issue.set ('creatorId', $vmc.$store.state.user.input.userId);
        issue.set ('issueOpened', true);
        issue.set ('milestone', []);
        issue.set ('avatarHash', []);
        // issue.set ('userId', []);
        // issue.set ('issueId', )
        issue.set ('orgId', $vmc.orgId);
        issue.set ('proId', $vmc.proId);
        issue.set ('orgName', $vmc.orgName);
        issue.set ('proName', $vmc.proName);

        issue.save ()
          .then (resp => {
            $vmc.title = '';
            $vmc.content = '';
            $vmc.showIssue ();
            $vmc.adding = false;
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert ('Failed to create new object, with error code: ' + error.message);
          });
      },

      cancel () {
        this.adding = false;
        this.title = '';
        this.content = '';
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
            }, (error) => {
          });
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
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let ary = [];
        let query = new Parse.Query (Issue);
        let checkedIds = $vmc.checked.map (item => item.issueId);
        query.containedIn ('objectId', checkedIds);
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