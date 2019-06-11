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

    <div id="wrap" class="row">
      
      <div class="mt-3 col-3">

        <ul class="list-group list-group-flush">

          <button class="text-left my-1 list-group-item border-0">屬於該用戶儲存庫的</button>
          <button class="text-left my-1 list-group-item border-0">指派給您的</button>
          <button class="text-left my-1 list-group-item border-0">由您建立的</button>

        </ul>

        <hr />

        <ul class="list-group list-group-flush">

          <button class="text-left my-1 list-group-item border-0">屬於該用戶儲存庫的</button>
          <button class="text-left my-1 list-group-item border-0">指派給您的</button>
          <button class="text-left my-1 list-group-item border-0">由您建立的</button>

        </ul>
        
      </div>

      <div class="col-9">


        <div class="row">

          <div class="btn-group" role="group" aria-label="Basic example">
            <button @click="showOpened = true" type="button" class="btn btn-outline-secondary">
              {{  }} 個開啟中
            </button>
            <button @click="showOpened = false" type="button" class="btn btn-outline-secondary">
              {{  }} 個已關閉
            </button>
          </div>

        </div>

        <!-- <h3>{{ issues }}</h3>
        <h3 v-for="i in issues">{{ i.orgName }} | {{ i.proName }} | {{ i.issueName }}</h3> -->

            <!-- Issue List -->

        <div class="mt-3 list-group list-group-flush " v-if="issues.length >= 1">

          <template v-for="issue in issues">

            <!-- Opened Issue-List Start-->

            <!-- <router-link v-if="issue.issueOpened === true && showOpened === true" :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="button" type="button"  class="text-left list-group-item"> -->

              <div class="text-left list-group-item">

                <div class="row my-3">

                  <span class="d-flex align-items-center rounded py-2 px-3 bg-light-theme mr-3">{{ issue.orgName }}/{{ issue.proName }}</span>



                  <router-link v-if="issues.length > 0" :to="{ name: 'issue', params: { issueId: issue.issueId, orgId: issue.orgId, proId: issue.proId }}" tag="button" type="button" class="btn">

                    <h4>{{ issue.issueName }}</h4>

                  </router-link>


                  

                  

                  <!-- <h5 class="d-flex align-items-center mb-0">{{ issue.issueName }}</h5> -->

                </div>

                <div>由 Korver 建立</div>

              </div>

              

              <!-- <div class="row">
                
                <span v-for="label in issue.labels" class="px-3 py-2 ml-3 badge badge-primary">{{ label }}</span>

              </div> -->
              
              <!-- <div class="row d-flex align-items-center">
                <div>由 Korver 建立</div>

                <div class="ml-auto">

                  <img v-if="issue.avatarHash.length > 0" v-for="hash in issue.avatarHash" :src="'https://www.gravatar.com/avatar/' + hash" style="width: 30px" class="mr-3 rounded" alt="">
                </div>

              </div> -->
            <!-- </router-link> -->

            <!-- Opened Issue-List End -->

            <!-- Closed Issue-List Start -->

            <!-- <router-link v-else-if="issue.issueOpened === false && showOpened === false" :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="li" type="li" class="list-group-item" active-class="active">

              <div class="row d-flex align-items-center">

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
              
            </router-link> -->

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
    },
    
    methods: {
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
                      // obj.labels = object.get ('')
                      ary.push (obj);
                    }

                    $vmc.issues = ary;

                  })
                  
              })

          })
        
      },

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
          });
      },
    },

    watch: {
      user () {
        this.showIssue ();
      }
    }
  }
</script>

<style scoped>
  
</style>