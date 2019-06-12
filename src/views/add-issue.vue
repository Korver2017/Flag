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

        <router-link :to="{ name: 'label-list', params: { proId: proId, issues: issues, } }" tag="button" class="btn btn-outline-secondary" active-class="active">
          標籤
        </router-link>

        <router-link :to="{ name: 'milestone', params: { proId: proId } }" tag="button" class="btn btn-outline-secondary" active-class="active">
          里程碑
        </router-link>
        
      </div>

    </div>

    <hr />


    <!-- Input-Form Start -->


    <div class="row">

      <div class="col-9">

        <div class="row">
  
          <img style="width: 50px; height: 50px;" v-if="avatarHash.length > 0" class="rounded" :src="'https://www.gravatar.com/avatar/' + avatarHash" alt="">

          <form style="border: 1px solid rgba(34,36,38,.15);" class="rounded ml-3 col-11">
            
            <div class="form-group text-left">
              <label @keyup.enter="submitIssue" for="title"></label>
              <input v-model.trim="title" class="form-control" placeholder="標題" id="title">
            </div>

            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link active" href="#">Write</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Preview</a>
              </li>
            </ul>
            
            <div class="form-group text-left">
              <label @keyup.enter="submitIssue" for="content"></label>
              <textarea v-model="content" class="form-control" id="content" rows="10"></textarea>
            </div>

            <div class="py-5 d-flex justify-content-center border border-primary">拖放檔案或是點擊此處上傳</div>
            
            <button @click.prevent="submitIssue" class="d-block ml-auto my-3 btn btn-success">建立問題</button>

          </form>

        </div>

      </div>


      <!-- Input-Form End -->
      

      <div class="col-3">

        <ul style="border: 1px solid rgba(34,36,38,.15);" class="text-left list-group list-group-flush">
          <li class="list-group-item">
            <input type="text" class="form-control" placeholder="未指定分支或標籤">
          </li>

          <li class="list-group-item">
            <div class="dropdown">
              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                標籤
              </a>


              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                
                <a v-for="(label, index) in labels" @click="toggleLabel (label.added, label.labelId, index)" class="dropdown-item" href="#">{{ label.title }}</a>
              </div>

              <template v-for="(label, index) in labels">
                <h5 v-if="labels[index].added === true"><span class="badge badge-secondary">{{ labels[index].title }}</span></h5>

              </template>

            </div>

          </li>

          <li class="pb-3 list-group-item">里程碑</li>
          <li class="pb-3 list-group-item">指派成員</li>

        </ul>
        
      </div>

    </div>

  </div>


</template>

<script>
  import Parse from "parse";
  import AddIssue from "@/views/add-issue.vue";

  export default {
    

    name: 'add-issue',


    components: {
      AddIssue,
    },


    data () {
      return {
        proName: '',
        issues: [],
        issueAdding: false,
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
        // proId: '',
        mileTitle: '',
        avatarHash: '',
      }
    },


    computed: {
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


    created () {
      let $vmc = this;
      let Account = Parse.Object.extend ('Account');
      let query = new Parse.Query(Account);
      query.get ($vmc.userId)
        .then (resp => {
          $vmc.avatarHash = resp.get ('avatarHash')
          // The object was retrieved successfully.
        }, (error) => {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
        });

      
      // Add Milestone

      // let Milestone = Parse.Object.extend ("Milestone");
      // let milestone = new Milestone ();

      // milestone.set ('issues', []);

      // milestone.save()
      //   .then((milestone) => {
      //     alert('New object created with objectId: ' + milestone.id);
      //   }, (error) => {
      //     // Execute any logic that should take place if the save fails.
      //     // error is a Parse.Error with an error code and message.
      //     alert('Failed to create new object, with error code: ' + error.message);
      //   });
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

      showLabel () {
        let $vmc = this;
        let Label = Parse.Object.extend ('Label');
        let query = new Parse.Query (Label);
        let ary = [];

        console.log ($vmc.proId);

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
              obj.added = false;

              ary.push (obj);
            }
          }, (error) => {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          });

        $vmc.labels = ary;

      },

      toggleLabel (added, labelId, index) {
        let $vmc = this;

        console.log (added, labelId, index);
        
        $vmc.labels[index].added = !$vmc.labels[index].added;

        // if ($vmc.labels[index].added === true) {
        //   let Label = Parse.Object.extend ("Label");
        //   let query = new Parse.Query (Label);
        
        //   query.get (labelId)
        //     .then (resp => {
        //       resp.addUnique ('issueId', $vmc.issueId);
        //       resp.save ();
        //     });
        // }
        // else {
        //   let Label = Parse.Object.extend ("Label");
        //   let query = new Parse.Query (Label);
        //   query.get (labelId)
        //     .then (resp => {
        //       resp.remove ("issueId", $vmc.issueId);
        //       resp.save ();
        //     });
        // }
          
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
                      obj.name = resp.get ('username');
                      obj.assigneeId = object;
                      obj.avatarHash = resp.get ('avatarHash');
                      obj.email = resp.get ('email');

                      // obj.avatarHash = $vmc.$md5 (email);
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


      
      

      addIssue () {
        this.issueAdding = true;
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
        issue.set ('milestone', '');
        issue.set ('mileTitle', '');
        issue.set ('avatarHash', []);
        // issue.set ('userId', []);
        // issue.set ('issueId', )
        issue.set ('orgId', $vmc.orgId);
        issue.set ('proId', $vmc.proId);
        issue.set ('orgName', $vmc.orgName);
        issue.set ('proName', $vmc.proName);

        issue.save ()
          .then (resp => {
            let issueId = resp.id;
            console.log (issueId);

            let Label = Parse.Object.extend ("Label");
            let query = new Parse.Query (Label);
            console.log ($vmc.proId);
            query.equalTo ('proId', $vmc.proId)
            query.find ()
              .then (resp => {
                console.log (issueId);
                for (let i = 0; i < resp.length; i ++) {
                  let object = resp[0];
                  // object.addUnique ('issueId')
                  // console.log (object.get ('title'));

                  // object.addUnique ('issueId', [issueId]);
                  // object.save ();

                }
              })
              .then (resp => {
                $vmc.title = '';
                $vmc.content = '';
                $vmc.showIssue ();
                $vmc.issueAdding = false;
                $vmc.$router.push ({ name: 'project' });
              })
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert ('Failed to create new object, with error code: ' + error.message);
          });
      },

      cancel () {
        this.issueAdding = false;
        this.title = '';
        this.content = '';
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


      reopenIssue () {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        for (let i = 0; i < $vmc.checked.length; i ++) {
          let query = new Parse.Query (Issue);
          query.get ($vmc.checked[i])
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


      addLabelTo (labelId) {
        let $vmc = this;

        let Label = Parse.Object.extend ('Label');
        let query = new Parse.Query (Label);

        query.get (labelId)
          .then (resp => {
            for (let i = 0; i < $vmc.checked.length; i ++) {
              let object = $vmc.checked[i];
              
              resp.addUnique ('issueId', object);
              console.log (object);
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


      
      // addMilestone () {
      //   let $vmc = this;

      //   const Mile = Parse.Object.extend ('Milestone');
      //   const mile = new Mile ();

      //   mile.set ('title', $vmc.mileTitle);
      //   mile.set ('proId', $vmc.proId);
      //   mile.set ('orgId', $vmc.orgId);
      //   mile.set ('mileOpened', true);

      //   mile.save ()
      //     .then (resp => {
      //       $vmc.mileTitle = '';
      //       $vmc.showMilestone ();
      //       // $vmc.showMile ();
      //       // Execute any logic that should take place after the object is saved.
      //     }, (error) => {
      //       // Execute any logic that should take place if the save fails.
      //       // error is a Parse.Error with an error code and message.
      //       alert ('Failed to create new object, with error code: ' + error.message);
      //     });
      // },
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

</style>