<template>

  <div class="container">
    <hr />
    <h1>{{ orgName }}</h1>

    <div class="row col-6 mx-auto my-4">
      <input @keyup.enter="newProject" v-model.trim="projectName" type="text" class="form-control col-8" placeholder="New project" aria-describedby="button-addon2">
      <button class="btn btn-success col-4" @click="newProject">New project</button>
    </div>

    <div class="row">
      <div v-for="project in projects" class="projectItem border border-success col-3 py-2 ">
        <!-- <router-link class="d-block" :to="'/' + orgId + '/' + project.proId" tag="li" active-class="active"> -->
        <router-link class="d-block" :to="{ name: 'project', params: { proId: project.proId }}" tag="li" active-class="active">
          <a>
            <h4>{{ project.name }}</h4>
            <h4>{{ project.proId }}</h4>
          </a>
        </router-link>
      </div>
    </div>

    <!-- <router-view /> -->

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
        // title: this.$route.params.orgId,
      }
    },


    computed: {


      orgId () {
        console.log (this.$route.params.orgId);
        return this.$route.params.orgId;
      }
    },
    

    created () {
    },


    mounted () {
      this.showProject ();
      this.showOrgName ();

    },


    methods: {
      showOrgName () {
        let $vmc = this;
        let id = $vmc.$route.params.orgId;
        console.log (id);

        const Org = Parse.Object.extend ("Organization");
        let query = new Parse.Query (Org);
        query.get (id)
          .then (resp => {
            let name = resp.get ('name');
            $vmc.orgName = name;
          })
      },


      showProject () {
        let $vmc = this;

        const Project = Parse.Object.extend ("Project");
        let query = new Parse.Query (Project);

        query.equalTo ("orgId", $vmc.orgId);
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

            // console.log (ary);
          }
          
          $vmc.projects = ary;
        });
      },


      newProject () {
        let $vmc = this;

        let Pro = Parse.Object.extend ("Project");
        var Org = Parse.Object.extend ("Organization");
        var org = new Org ();
        let pro = new Pro ();

        pro.set ('name', $vmc.projectName);
        pro.set ('orgId', [$vmc.orgId]);

        pro.save()
          .then((pro) => {
            $vmc.projects.push ($vmc.projectName);
            $vmc.showProject ();
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + pro.orgId);
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
          })

        $vmc.projectName = '';

      }

    },


    watch: {
      orgId () {
        this.showOrgName ();
        this.showProject ();
      }
    }
  }
</script>

<style scoped>
</style>