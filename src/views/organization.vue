<template>

  <div>

    <div id="wrap">
    
      <h1 class="my-4 text-left">{{ orgName }}</h1>

    </div>

    <hr />

    <div id="wrap" class="row">

      <div class="col-8">

        <div class="text-right">

          <!-- <button class="text-right btn btn-success" @click="newProject">新增儲存庫</button> -->

          <router-link class="btn btn-success" to="/project/create" tag="button" active-class="active">
            新增儲存庫
          </router-link>
      
        </div>

        <hr />

        <div class="row my-4">

          <div class="input-group col-10">

            <input type="text" class="form-control p-2" placeholder="搜尋..." aria-label="搜尋" aria-describedby="button-addon2">

            <div class="input-group-append">
              <button class="btn btn-primary" type="button" id="button-addon2">搜尋</button>
            </div>

          </div>
          

          <div class="dropdown">

            <a class="border-0 btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              排序
            </a>

            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">

              <a class="dropdown-item" href="#">最近更新</a>
              <a class="dropdown-item" href="#">最近更新</a>
              <a class="dropdown-item" href="#">最近更新</a>
              <a class="dropdown-item" href="#">最近更新</a>
              
            </div>

          </div>

        </div>

        <ul class="list-group list-group-flush">

          <router-link v-for="project in projects" class="text-left pb-5 list-group-item" :to="{ name: 'project', params: { orgId: orgId, proId: project.proId} }" tag="li">

            <h3>
              <a class="text-decoration-none">{{ project.name }}</a>
            </h3>
            
          </router-link>

        </ul>

      </div>

      <div class="col-4 text-left">

        <div class="py-3 bg-light-theme border-light-theme border-bottom-0">

          <div class="row px-4">
          
            <h5 class="mb-0 pl-2">組織成員</h5>

            <div class="ml-auto mr-4">{{ users.length }}</div>

          </div>
          
        </div>

        <div class="border-light-theme">

          <div class="ml-2">

            <img v-for="user in users" style="width: 60px; height: 60px;" class="rounded my-4 mx-2" :src="'https://www.gravatar.com/avatar/' + user.avatarHash" alt="">

          </div>
          
        </div>

        <div class="mt-5 py-3 bg-light-theme border-light-theme border-bottom-0">

          <div class="row px-4">
          
            <h5 class="mb-0 pl-2">組織團隊</h5>

            <!-- <div class="ml-auto">{{ users.length }}</div> -->

          </div>
          
        </div>

        <div class="border-light-theme border-bottom-0">

            <div class="py-3 ml-3">
              {{ users.length }} 名成員．{{ projects.length }} 個儲存庫
            </div>
          
        </div>

        <div class="border-light-theme">

          <div class="py-3 ml-3">

            <button class="btn btn-primary" @click="">建立團隊</button>
            
          </div>
          
        </div>

      </div>

    </div>

  </div>

</template>

<script>
  import Parse from "parse";

  export default {
    

    name: 'organization',


    data () {
      return {
        orgName: '',
        projectName: '',
        projects: [],
        defaultLabels: [],
        users: '',
      }
    },


    components: {
    },


    computed: {


      orgId () {
        return this.$route.params.orgId;
      },


    },
    

    created () {
      let $vmc = this;
      let ary = [];

      const Label = Parse.Object.extend ('Label');
      const query = new Parse.Query (Label);
      query.equalTo ('proId', 'default');
      query.find ()
        .then (resp => {
          for (let i = 0; i < resp.length; i++) {
            let obj = {};
            let object = resp[i];
            obj.title = object.get ('title');
            obj.labelDesc = object.get ('labelDesc');
            ary.push (obj);
          }
        })

      $vmc.defaultLabels = ary;
    },


    mounted () {
      this.showProject ();
      this.showOrgName ();
      this.showUser ();

    },


    methods: {

      showUser () {
        let $vmc = this;
        const Account = Parse.Object.extend ('Account');
        const query = new Parse.Query (Account);
        let ary = [];

        query.notEqualTo ('username', '');
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let object = resp[i];
              obj.username = object.get ('username');
              obj.avatarHash = object.get ('avatarHash');
              ary.push (obj);
            }

            $vmc.users = ary;
          });
        
      },
      
      showOrgName () {
        let $vmc = this;
        let id = $vmc.$route.params.orgId;

        let Org = Parse.Object.extend ('Organization');
        let query = new Parse.Query (Org);
        query.get (id)
          .then (resp => {
            let name = resp.get ('name');
            $vmc.orgName = name;
          })
      },


      showProject () {
        let $vmc = this;

        let Project = Parse.Object.extend ('Project');
        let query = new Parse.Query (Project);

        query.equalTo ('orgId', $vmc.orgId);
        let proName = [];
        let proId = [];
        let obj = {};
        let ary = [];
        query.find ().then (resp => {

          for (let i = 0; i < resp.length; i++) {
            let data = {};
            let object = resp[i];
            data.name = object.get ('name');

            data.proId = object.id;

            ary.push (data);
          }
          
          $vmc.projects = ary;
        });
      },


      newProject () {
        let $vmc = this;
        let Pro = Parse.Object.extend ('Project');
        let pro = new Pro ();

        pro.set ('name', $vmc.projectName);
        pro.set ('orgId', $vmc.orgId);
        pro.set ('orgName', $vmc.orgName);
        pro.save ()
          .then (resp => {
            $vmc.showProject ();
            let proId = resp.id;
            const Label = Parse.Object.extend ('Label');
            let len = $vmc.defaultLabels.length
            for (let i = 0; i < len; i ++) {
              let label = new Label ();
              let object = $vmc.defaultLabels[i];

              label.set ('title', object.title);
              label.set ('labelDesc', object.labelDesc);
              label.set ('proId', proId);
              label.save ();
            }

            }, (error) => {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              alert('Failed to create new object, with error code: ' + error.message);
            });

        $vmc.projectName = '';
      }

    },


    watch: {
    }
  }
</script>

<style scoped>
</style>