<template>

  <div>

    <div id="wrap">
    
      <h1 class="my-4 text-left">{{ orgName }}</h1>

    </div>

    <hr />

    <div id="wrap">

      <div class="col-8">

        <div class="text-right">

          <!-- <button class="text-right btn btn-success" @click="newProject">新增儲存庫</button> -->

          <router-link class="btn btn-success" to="/project/create" tag="button" active-class="active">
            新增儲存庫
          </router-link>
      
        </div>

        <hr />

        <div class="row">

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

          <h3>{{ projects }}</h3>

        </div>

        <ul class="list-group list-group-flush">

          <router-link v-for="project in projects" class="text-left pb-5 list-group-item" :to="{ name: 'project', params: { orgId: orgId, proId: project.proId} }" tag="li">

            <h3>
              <a class="text-decoration-none">{{ project.name }}</a>
            </h3>
            
          </router-link>

        </ul>

      </div>












      <div class="col-4">

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

    },


    methods: {
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