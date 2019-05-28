<template>
  <div>

    <template v-if="user.authed">
      
      <img v-if="avatarHash.length > 0" class="rounded-circle mt-5" :src="'https://www.gravatar.com/avatar/' + avatarHash" alt="">
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

        </div>

        <!-- My Issue -->

        <div class="row my-5">
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

      </div>
        
    </template>

    
    
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
        username: '',
        orgName: '',
        orgs: [],
        avatarHash: '',
        projects: [],
        issues: [],
        assigneeList: [],
      }
    },


    created () {
      if (this.$store.state.user.authed === false) {
        this.$router.push ('/signin');
      }
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
          email: this.$store.state.user.input.email,
          id: this.$store.state.user.input.userId
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


      /**
       *
       * Display Username
       *
       */
      showUsername () {
        let $vmc = this;
        let ary = [];
        let Account = Parse.Object.extend ('Account');
        let query = new Parse.Query (Account);
        query.get ($vmc.user.id)
          .then (resp => {
            $vmc.avatarHash = $vmc.$md5 (resp.get ('email'));
            $vmc.username = resp.get ('username');
            resp.set ('avatarHash', $vmc.avatarHash);
            return resp.save ();
          })
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
        query.equalTo ('memberId', $vmc.user.id);
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
        org.set ('memberId', $vmc.$store.state.user.input.userId);

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
        query.equalTo ('memberId', $vmc.user.id);
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
        query.equalTo ('memberId', $vmc.user.id);
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
  
</style>