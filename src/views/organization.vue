<template>

  <div class="container">
    <hr />
    <h1>Organization</h1>
    <h1>Organization: {{ orgId }}</h1>

    <div class="row col-6 mx-auto my-4">
      <input @keyup.enter="newProject" v-model.trim="projectName" type="text" class="form-control col-8" placeholder="New project" aria-describedby="button-addon2">
      <button class="btn btn-success col-4" @click="newProject">New project</button>
    </div>

    <div class="row">
      <div v-for="project in projects" class="projectItem col-4 border border-danger mt-3 py-5">
        <router-link class="d-block" :to="'/' + orgId + '/' + project.proId" tag="li" active-class="active">
          <a>
            <h4>{{ project.name }}</h4>
          </a>
        </router-link>
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
        projectName: '',
        projects: [],
      }
    },


    computed: {
      orgId () {
        return this.$route.params.orgId; 
      },
    },
    

    created () {
    },


    mounted () {
      this.showProject ();
    },


    methods: {
      showProject () {
        let $vmc = this;

        const Project = Parse.Object.extend("Project");
        let query = new Parse.Query(Project);

        console.log ($vmc.orgId);

        query.equalTo ("orgId", $vmc.orgId);
        let proName = [];
        let proId = [];
        let obj = {};
        let ary = [];
        query.find().then (resp => {

          for (let i = 0; i < resp.length; i++) {
            let data = {};
            let object = resp[i];
            data.name = object.get('name');

            data.proId = object.id;

            ary.push (data);

            // console.log (ary);
          }
          
          $vmc.projects = ary;
        });
      },


      newProject () {
        let $vmc = this;

        let Pro = Parse.Object.extend("Project");
        var Org = Parse.Object.extend("Organization");
        var org = new Org ();
        let pro = new Pro();

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
        this.showProject ();
      }
    }
  }
</script>

<style scoped>
</style>