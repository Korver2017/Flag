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

          <a class="dropdown-item" href="#">{{ user.username }}</a>
          <a v-for="org in orgs" class="dropdown-item" href="#">{{ org.name }}</a>

          <hr class="mb-0" />

          <router-link class="dropdown-item" to="/org/create" tag="button" active-class="active">
            新增組織
          </router-link>

        </div>
        
      </div>
      
    </nav>

    <hr class="m-0" />

    <div id="wrap" class="row my-3">
      
      <div class="col-3">

        <ul class="list-group list-group-flush">

          <button class="d-flex justify-content-between text-left my-1 list-group-item border-0">屬於該用戶儲存庫的 <span>{{ openedCount }}</span></button>
          <button class="d-flex justify-content-between text-left my-1 list-group-item border-0">指派給您的 <span>{{ assignToMe }}</span></button>
          <button class="d-flex justify-content-between text-left my-1 list-group-item border-0">由您建立的 <span>{{ createByMe }}</span></button>

        </ul>

        <hr />

        <ul v-for="openedIssue in openedIssueList" class="list-group list-group-flush">

          <h3>{{ openedIssue }}</h3>

          <button class="d-flex justify-content-between text-left my-1 list-group-item border-0">
            {{ openedIssue.orgName }}/{{ openedIssue.proName }}
          </button>

        </ul>
        
      </div>

      <div class="col-9">

        <div class="row">

          <div class="btn-group" role="group" aria-label="Basic example">
            <button @click="showOpened = true" type="button" class="btn btn-outline-secondary">
              {{ openedCount }} 個開啟中
            </button>
            <button @click="showOpened = false" type="button" class="btn btn-outline-secondary">
              {{ closedCount }} 個已關閉
            </button>
          </div>

        </div>

        <div class="mt-3 list-group list-group-flush " v-if="issues.length >= 1">

          <template v-for="issue in issues">

            <div v-if="issue.issueOpened === true && showOpened === true" class="text-left list-group-item">

              <div class="row my-3">

                <span class="d-flex align-items-center rounded py-2 px-3 bg-light-theme mr-3">{{ issue.orgName }}/{{ issue.proName }}</span>

                <router-link v-if="issues.length > 0" :to="{ name: 'issue', params: { issueId: issue.issueId, orgId: issue.orgId, proId: issue.proId }}" tag="button" type="button" class="btn">

                  <h4>{{ issue.issueName }}</h4>

                </router-link>

              </div>

              <div>由 Korver 建立</div>

            </div>

            <div v-if="issue.issueOpened === false && showOpened === false" class="text-left list-group-item">

              <div class="row my-3">

                <span class="d-flex align-items-center rounded py-2 px-3 bg-light-theme mr-3">{{ issue.orgName }}/{{ issue.proName }}</span>

                <router-link v-if="issues.length > 0" :to="{ name: 'issue', params: { issueId: issue.issueId, orgId: issue.orgId, proId: issue.proId }}" tag="button" type="button" class="btn">

                  <h4>{{ issue.issueName }}</h4>

                </router-link>

              </div>

              <div>由 Korver 建立</div>

            </div>

          </template>
            
        </div>

      </div>

    </div>
  
  </div>
</template>

<script>
  import Parse from "parse";

  export default {

    name: 'my-issue',

    data () {
      return {
        orgs: '',
        issues: '',
        showOpened: true,
        openedCount: 0,
        closedCount: 0,
        assignToMe: 0,
        createByMe: 0,
        openedIssueList: '',
      }
    },

    computed: {
      user () {
        return {
          authed: this.$store.state.user.authed,
          userId: this.$store.state.user.userId,
          avatarHash: this.$store.state.user.avatarHash,
          username: this.$store.state.user.username,
        }
      },
    },

    mounted () {
      this.showIssue ();
      this.showAssignee ();
      this.showCreator ();
    },
    
    methods: {
      showCreator () {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);

        query.equalTo ('creator', $vmc.user.username);
        query.find ()
          .then (resp => {
            $vmc.createByMe = resp.length;
          });
      },

      showAssignee () {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);

        query.equalTo ('assigneeId', $vmc.user.userId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let object = resp[i];

              if (object.get ('issueOpened') === true) {
                $vmc.assignToMe += 1;
              };
              
            };
          });
          
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
                let arry = [];
                let Issue = Parse.Object.extend ('Issue');
                let query = new Parse.Query (Issue);

                query.containedIn ('proId', resp);
                query.find ()
                  .then (resp => {
                    
                    for (let i = 0; i < resp.length; i ++) {
                      let obj = {};
                      let object = resp[i];
                      obj.issueId = object.id;
                      obj.orgId = object.get ('orgId');
                      obj.proId = object.get ('proId');
                      obj.proName = object.get ('proName');
                      obj.orgName = object.get ('orgName');
                      obj.issueName = object.get ('name');
                      obj.issueOpened = object.get ('issueOpened');

                      if (obj.issueOpened === true) {
                        $vmc.openedCount += 1;
                        arry.push (obj);
                      } else {
                        $vmc.closedCount += 1;
                      }
                      
                      ary.push (obj);
                    }

                    let newArry = arry;
                    
                    $vmc.issues = ary;
                    return newArry;

                  })
                  .then (resp => {
                    for (let i = 0; i < resp.length; i++) {
                      let object = resp[i];
                      
                    }
                  })
                  
              })

          })
      },

    },

    watch: {
      user () {
        this.showIssue ();
        this.showAssignee ();
        this.showCreator ();
      }
    }
  }
</script>

<style scoped>
  
</style>