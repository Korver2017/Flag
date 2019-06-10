<template>

  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">

      <div class="dropdown">
        
          <a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">


            <img class="rounded" style="width: 30px; height: 30px" :src="'https://www.gravatar.com/avatar/' + user.avatarHash" alt="">

            <span class="mx-2">{{ user.username }}</span>

          </a>


        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          
          <li class="pb-2 d-flex align-items-center justify-content-center">切換控制面板用戶</li>

          <hr class="mt-0" />

          <a v-for="org in orgs" class="dropdown-item" href="#">{{ org.name }}</a>

          <hr class="mb-0" />

          <router-link class="dropdown-item" to="/org/create" tag="button" active-class="active">
            新增組織
          </router-link>

        </div>

        
        
      </div>
      
    </nav>

    <hr class="m-0" />
    
    <div id="wrap">

      <!-- <template v-if="user.authed"> -->

        <div class="row">
          <div class="col-7">
            <div class="my-3 mx-2 tracker border border-success"></div>

            <ul class="py-0 list-group list-group-flush">

              <li v-for="i in 10" class="list-group-item">
                <div class="row">

                  <div class="avatar border border-success"></div>

                  <div class="ml-3 text-left">
                    <p class="infoTitle">wake pushed to master at Tangency/wingbra</p>
                    <div>
                      <p class="mb-0">Lorem ipsum dolor sit amet.</p>
                      <p class="mb-0">Lorem, ipsum dolor.</p>
                    </div>
                  </div>

                  <i style="font-size: 40px; color: #767676;" class="ml-auto mr-4 fa fa-exclamation-circle" aria-hidden="true"></i>

                </div>


                
              </li>

            </ul>

          </div>

          <div class="px-0 my-3 col-4">

            <div style="color: #767676;" class="px-0 btn-group col-12" role="group" aria-label="Basic example">

              <button @click="switchToRepo" class="py-3 btn btn-outline-secondary col-6">
                儲存庫
              </button>

              <button @click="switchToOrg" class="py-3 btn btn-outline-secondary col-6">
                組織
              </button>

            </div>

            <div v-if="showRepoList === true" class="my-3">

              <ul class="list-group">

                <li class="list-group-item">

                  <div class="row">

                    <p class="ml-3 mb-0">儲存庫<span class="ml-2 badge badge-secondary">{{ projects.length }}</span></p>

                    <i class="d-flex align-items-center ml-auto mr-3 fa fa-plus" aria-hidden="true"></i>

                  </div>

                </li>

                <li class="list-group-item">

                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="搜尋儲存庫..." />
                  </div>

                  <ul class="nav nav-tabs d-flex justify-content-center">
                    <li class="nav-item">
                      <a class="nav-link active" href="#">所有<span class="ml-2 badge badge-secondary">{{ projects.length }}</span></a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">來源</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">複製列表</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">鏡像</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">協同者</a>
                    </li>
                  </ul>

                </li>

                <router-link v-if="projects" v-for="project in projects" class="d-flex align-items-center list-group-item" :to="{ name: 'project', params: { orgId: project.orgId, proId: project.proId }}" tag="button">
                  <i style="font-size: 25px;" class="mr-3 fa fa-lock" aria-hidden="true"></i>

                  {{ project.orgName }} / {{ project.name }}

                  <p class="ml-auto mb-0 d-flex align-items-center">
                    0
                    <i style="font-size: 20px;" class="ml-1 fa fa-star" aria-hidden="true"></i>
                  </p>
                  
                </router-link>

                <router-link class="d-flex align-items-center list-group-item" to="/" tag="button">

                  顯示更多儲存庫...
                  
                </router-link>

              </ul>

            </div>

            <div v-if="showOrgList === true" class="my-3">

              <ul class="list-group">

                <li class="list-group-item">

                  <div class="row">

                    <p class="ml-3 mb-0">我的組織<span class="ml-2 badge badge-secondary">{{ orgs.length }}</span></p>

                    <i class="d-flex align-items-center ml-auto mr-3 fa fa-plus" aria-hidden="true"></i>

                  </div>

                </li>

                <!-- <router-link v-if="orgs" v-for="(org, index) in orgs" class="d-flex align-items-center list-group-item" :to="{ name: 'project', params: { orgId: org.orgId, proId: org.proId } }" tag="button"> -->

                <li v-for="org in orgs" class="d-flex align-items-center list-group-item">

                  <i style="font-size: 25px;" class="mr-3 fa fa-lock" aria-hidden="true"></i>
                  
                  {{ org.name }}

                  <p class="ml-auto mb-0 d-flex align-items-center">
                    0
                    <i style="font-size: 20px;" class="ml-1 fa fa-star" aria-hidden="true"></i>
                  </p>

                </li>

                <!-- </router-link> -->

              </ul>

            </div>

          </div>

        </div>
        
        <!-- <img v-if="avatarHash.length > 0" class="rounded-circle mt-5" :src="'https://www.gravatar.com/avatar/' + avatarHash" alt="">
        <h2 class="nav-item nav-link align-right">Hi, {{ username }}!</h2>
        <h5>Welcome to Flag</h5>

        <div class="container my-5">

          <div class="row my-5">
            <div v-if="orgs.length !== 0" class="col-8 mx-auto">
              <h5 class="text-left">My Organizations</h5>
                <div class="row">
                <router-link v-for="org in orgs" :key="org.id" :to="{ name: 'organization', params: { orgId: org.orgId }}" tag="button" class="col-4 list-group-item list-group-item-action btn btn-success" active-class="active">
                  {{ org.name }}
                </router-link>
                </div>
            </div>

            <form class="col-4 mx-auto">
              <div class="form-group text-left">
                <label @keyup.enter="addOrganization" for="name">Add Organization</label>
                <input v-model.trim="orgName" class="form-control" placeholder="Organization Name" id="name">
              </div>
              <button @click.prevent="addOrganization" class="mx-3 btn btn-success">Add Organization</button>
            </form>

          </div>


          <div class="row my-5">
            <div v-if="projects.length !== 0" class="col-8 mr-auto">
              <h5 class="text-left">My Projects</h5>
                <div class="row">

                  <router-link v-for="project in projects" :key="project.id" :to="project.orgId + '/' + project.proId" tag="button" class="col-4 list-group-item list-group-item-action btn btn-success" active-class="active">
                    {{ project.orgName }} / {{ project.name }}
                  </router-link>

                </div>
            </div>

          </div> -->

          <!-- My Issue -->

          <!-- <div class="row my-5">
            <div v-if="issues.length !== 0" class="col-8 mr-auto">
              <h5 class="text-left">My Issues</h5>
                <div class="row">
                
                  <router-link v-for="issue in issues" :key="issue.id" :to="issue.orgId + '/' + issue.proId + '/' + issue.issueId" tag="button" class="col-4 list-group-item list-group-item-action btn btn-success" active-class="active">
                    {{ issue.orgName }} / {{ issue.proName }} / {{ issue.issueName }}
                  </router-link>

                </div>
            </div>

          </div>

          <div class="row my-5">
            <div class="col-8 mr-auto">
              <h5 class="text-left">指派給我的 Issues</h5>
                <div class="row" v-if="assigneeList.length !== 0">
                
                    <router-link v-for="assignee in assigneeList" :key="assignee.id" :to="assignee.proId + '/' + assignee.proId + '/' + assignee.issueId" tag="button" class="col-4 list-group-item list-group-item-action btn btn-success" active-class="active">
                      {{ assignee.orgName }} / {{ assignee.proName }} / {{ assignee.assignIssue }}
                    </router-link>

                </div>

                <div class="row my-5" v-else>
                  <h4 class="mx-auto font-italic">目前尚無資料</h4>
                </div>
            </div>

          </div>

        </div> -->
          
      <!-- </template> -->

      
      
    </div>

  </div>

</template>

<script>

  // Import
  import Parse from "parse";


  export default {


    name: 'dashboard',


    /**
     *
     * Inner components
     *
     */
    components: {
    },


    data () {
      return {
        orgName: '',
        orgs: [],
        projects: [],
        issues: [],
        assigneeList: [],
        userData: '',
        token: '',
        payload: '',
        showRepoList: true,
        showOrgList: false,
      }
    },


    created () {
      // let $vmc = this;

      // $vmc.token = $vmc.$cookie.get ('token');

      // let payload = $vmc.$j.jws.JWS.readSafeJSONString($vmc.$base64.decode ($vmc.token.split(".")[1]));

      // $vmc.userId = payload.userId;

      

      // const Account = Parse.Object.extend ('Account');
      // const query = new Parse.Query (Account);

      // query.equalTo ('token', $vmc.token);
      // query.find ()
      //   .then (resp => {
      //     let object = resp[0];
      //     let obj = {};
          
      //     // $vmc.$store.state.user.authed = true;
      //     // $vmc.$store.state.user.input.userId = object.id;

      //     query.get (object.id)
      //       .then (resp => {
      //         obj.avatarHash = resp.get ('avatarHash');
      //         obj.username = resp.get ('username');
      //         obj.uerId = object.id;

      //         $vmc.$store.state.user.userId = object.id;
      //         $vmc.userData = obj;

      //         $vmc.$emit ('updateData', $vmc.userData);
              
      //       })

          
      //   })
    },


     /**
     *
     * Computed
     *
     */
    computed: {
      user () {
        return {
          authed: this.$store.state.user.authed,
          // email: this.$store.state.user.input.email,
          userId: this.$store.state.user.userId,
          avatarHash: this.$store.state.user.avatarHash,
          username: this.$store.state.user.username,
        }
      },

      
    },


    mounted () {
      this.showOrg ();
      this.showUsername ();
      this.showProject ();
      this.showIssue ();
      this.showAssignee ();
    },



    /**
     *
     * Methods
     *
     */
    methods: {
      switchToRepo () {
        let $vmc = this;

        $vmc.showRepoList = true;
        $vmc.showOrgList = false;
      },

      switchToOrg () {
        let $vmc = this;

        $vmc.showRepoList = false;
        $vmc.showOrgList = true;
      },


      /**
       *
       * Display Username
       *
       */
      showUsername () {
        // let $vmc = this;
        // let ary = [];
        // let Account = Parse.Object.extend ('Account');
        // let query = new Parse.Query (Account);
        // query.get ($vmc.userId)
        //   .then (resp => {
        //     $vmc.user.avatarHash = $vmc.$md5 (resp.get ('email'));
        //     $vmc.username = resp.get ('username');
        //     resp.set ('avatarHash', $vmc.user.avatarHash);
        //     return resp.save ();
        //   })
          // .then (resp => {
          //   let query = new Parse.Query (Account);
          //   query.set ('avatarHash', $vmc.avatarHash);
          // });

      },


      /**
       *
       * Display Organization
       *
       */
      showOrg () {
        let $vmc = this;
        let Org = Parse.Object.extend ('Organization');
        let query = new Parse.Query (Org);
        let ary = [];
        // console.log ($vmc.user.userId);
        query.equalTo ('memberId', $vmc.user.userId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let object = resp[i];
              let query = new Parse.Query (Org);
              obj.orgId = object.id;
              query.get (object.id)
                .then (resp => {
                  obj.name = resp.get ('name');
                  ary.push (obj);
                });
            }

            $vmc.orgs = ary;
          })
      },


      addOrganization () {
        let $vmc = this;

        if ($vmc.orgName === '') {
          alert ('組織名稱不可空白');
          return;
        }
        
        let Org = Parse.Object.extend ('Organization')
          , org = new Org ();

        org.set ('name', $vmc.orgName);
        org.set ('memberId', $vmc.payload);

        org.save ()
          .then (resp => {
            // Execute any logic that should take place after the object is saved.
            $vmc.orgName = '';
            $vmc.showOrg ();
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
          });
      },


      showProject () {
        let $vmc = this;
        let ary = [];
        let Org = Parse.Object.extend ('Organization');
        let query = new Parse.Query (Org);
        // console.log ($vmc.user.userId);
        query.equalTo ('memberId', $vmc.user.userId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let object = resp[i];
              let Project = Parse.Object.extend ('Project');
              let query = new Parse.Query (Project);
              query.equalTo ('orgId', object.id);
              query.find ()
                .then (resp => {
                  for (let i = 0; i < resp.length; i++) {
                    let obj = {};
                    let object = resp[i];
                    obj.orgName = object.get ('orgName');
                    obj.name = object.get ('name');
                    obj.orgId = object.get ('orgId');
                    obj.proId = object.id;
                    ary.push (obj);
                  }

                  $vmc.projects = ary;
                });

            }

          })
      },


      showIssue () {
        let $vmc = this;

        let Org = Parse.Object.extend ('Organization');
        let query = new Parse.Query (Org);
        let ary = [];
        query.equalTo ('memberId', $vmc.user.userId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let object = resp[i];
              ary.push (object.id);
            }
            return ary;
          })
          .then (resp => {
            let ary = [];
            let orgId = resp;
            let Project = Parse.Object.extend ('Project');
            let query = new Parse.Query (Project);
            query.containedIn ('orgId', resp);
            query.find ()
              .then (resp => {
                for (let i = 0; i < resp.length; i ++) {
                  let object = resp[i];
                  ary.push (object.id)
                }
                return ary;
              })
              .then (resp => {
                let ary = [];
                let obj = {};
                let Issue = Parse.Object.extend ('Issue');
                let query = new Parse.Query (Issue);

                query.containedIn ('proId', resp);
                query.find ()
                  .then (resp => {
                    
                    for (let i = 0; i < resp.length; i ++) {
                      let object = resp[i];
                      obj.issueId = object.id;
                      obj.orgId = object.get ('orgId');
                      obj.proId = object.get ('proId');
                      obj.proName = object.get ('proName');
                      obj.orgName = object.get ('orgName');
                      obj.issueName = object.get ('name');
                      ary.push (obj);
                      obj = {};
                    }

                    $vmc.issues = ary;
                  })
                  
              })

          })
        
      },


      showAssignee () {
        let $vmc = this;
        let ary = [];
        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);
        query.equalTo ('assigneeId', $vmc.user.id);
        query.find ()
          .then (resp => {
            // The object was retrieved successfully.
            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let object = resp[i];

              obj.assignIssue = object.get ('name');
              obj.issueId = object.id;
              obj.orgId = object.get ('orgId');
              obj.proId = object.get ('proId');
              obj.orgName = object.get ('orgName');
              obj.proName = object.get ('proName');
              ary.push (obj);
            }
          }, (error) => {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          });

        $vmc.assigneeList = ary;
      }
      
    },


    watch: {
    },
  }
</script>

<style scoped>
.tracker {
  height: 150px;
}

.avatar {
  width: 50px;
  height: 50px;
}
</style>