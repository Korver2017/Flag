<template>

  <div class="container mt-4">
    
    <h1>{{ orgName }}</h1>

    <div class="row col-6 mx-auto my-5">
      <input @keyup.enter="newProject" v-model.trim="projectName" type="text" class="form-control col-8" placeholder="New Project" aria-describedby="button-addon2">
      <button class="btn btn-success" @click="newProject">New Project</button>
    </div>

    <div v-for="project in projects" class="list-group-flush">
      <router-link class="py-3 text-left list-group-item list-group-item-action" :to="{ name: 'project', params: { proId: project.proId, orgId: orgId }}" tag="button" active-class="active">
         <h5>{{ project.name }}</h5>
      </router-link>
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