<template>
  <div class="container my-4">
    <h3 class="my-3 text-left">Project: {{ proName }}</h3>

    <div v-if="adding">

      <form class="col-8 mx-auto my-5">
        <div class="form-group text-left">
          <label @keyup.enter="submitIssue" for="title">Issue Title</label>
          <input v-model.trim="title" class="form-control" placeholder="Issue Title" id="title">
        </div>
        <div class="form-group text-left">
          <label @keyup.enter="submitIssue" for="content">Issue Content</label>
          <textarea v-model="content" placeholder="Issue Content" class="form-control" id="content" rows="10"></textarea>
        </div>
        <button @click.prevent="submitIssue" class="mx-3 btn btn-success">Add Issue</button>
        <button @click.prevent="cancel" class="mx-3 btn btn-danger">Cancel</button>
      </form>
      
    </div>
    
    <button class="my-3 btn btn-success" @click="addIssue">Add Issue</button>

    <router-link :to="{ name: 'milestone', params: { proId: proId } }" tag="button" class="ml-3 btn btn-primary" active-class="active">
      Milestone
    </router-link>

    <div class="rwo text-left">
      <button @click="showOpened = true" type="button" class="ml-3 btn btn-info">
        Opened <span class="badge badge-light">{{ opened.length }}</span>
      </button>
      <button @click="showOpened = false" type="button" class="ml-3 btn btn-secondary">
        Closed <span class="badge badge-light">{{ closed.length }}</span>
      </button>
    </div>

    <!-- Mark-As Dropdown Menu -->

    <div class="row">
      
      <div class="dropdown ml-auto mr-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Mark as
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button @click="reopenIssue" class="dropdown-item">Open</button>
          <button @click="closeIssue" class="dropdown-item">Closed</button>
        </div>
      </div>

      <!-- Label Dropdown Menu

      <div class="dropdown mr-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Label
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button @click="" class="dropdown-item">Open</button>
          <button @click="" class="dropdown-item">Closed</button>
        </div>
      </div> -->

      <!-- Milestone Dropdown Menu -->

      <div class="dropdown mr-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          加入到 Milestone
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button @click="addIssueTo (mile.mileId)" v-for="(mile, index) in milestones" class="dropdown-item">{{ mile.title }}</button>
        </div>
      </div>

      <!-- Label Dropdown Menu -->

      <div class="dropdown mr-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Assign to
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a @click="" class="dropdown-item">Open</a>
          <a @click="" class="dropdown-item">Closed</a>
        </div>
      </div>
      
    </div>

    <!-- Issue List -->

    <div class="mt-5 list-group" v-if="issues.length >= 1">

      <template v-for="issue in issues">

      <router-link v-if="issue.issueOpened === false && showOpened === false" :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="li" type="li" class="text-left list-group-item list-group-item-action" active-class="active">

          <input class="mr-3" type="checkbox" :value='issue.issueId' v-model="checked">
          <a>{{ issue.name }}</a>

        <span v-for="label in issue.labels" class="py-2 px-3 ml-3 badge badge-primary">{{ label }}</span>
      </router-link>

      <router-link v-else-if="issue.issueOpened === true && showOpened === true" :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="li" type="li" class="text-left list-group-item list-group-item-action" active-class="active">

          <input class="mr-3" type="checkbox" :value='issue.issueId' v-model="checked">
          <a>{{ issue.name }}</a>
        
        <span v-for="label in issue.labels" class="py-2 px-3 ml-3 badge badge-primary">{{ label }}</span>
      </router-link>

      </template>

        
    </div>

    

    <div v-else class="card text-left">
      <h4 class="card-body py-5 font-italic font-weight-lighter">
        There aren’t any open issues.
        No description provided.
      </h4>
    </div>

  </div>
    

</template>

<script>
  import Parse from "parse";

  export default {
    

    name: 'project',


    components: {
    },


    data () {
      return {
        proName: '',
        issues: [],
        adding: false,
        title: '',
        content: '',
        username: this.$store.state.user.username,
        labels: [],
        checked: [],
        opened: [],
        closed: [],
        showOpened: true,
        milestones: [],
      }
    },


    computed: {
      proId () {
        return  this.$route.params.proId;
      },


      // openedCount () {
      //   for (let i = 0; i < issues.length; i ++) {
      //     let ary = [];
      //     if ()
      //     issues[i].issueOpened === true
      //   }
        
      // }
    },


    created () {
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

      // console.log ('project mounted');

      $vmc.showProName ();
      $vmc.showIssueName ();
      $vmc.showMilestone ();
    },


    methods: {

      showProName () {
        let $vmc = this;
        let id = $vmc.$route.params.proId;
        // console.log (id);

        const Pro = Parse.Object.extend ("Project");
        let query = new Parse.Query (Pro);
        query.get (id)
          .then (resp => {
            let name = resp.get ('name');
            $vmc.proName = name;
          })
      },

      showIssueName () {
        let $vmc = this;
        const Issue = Parse.Object.extend ("Issue");
        let query = new Parse.Query (Issue);
        query.equalTo ("proId", $vmc.proId);
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
        })
        $vmc.issues = ary;
        $vmc.opened = opened;
        $vmc.closed = closed;
      },


      showLabel () {
        
        // let $vmc = this;
        // let ary = [];
        // let Label = Parse.Object.extend ("Label");
        // let query = new Parse.Query (Label);
        // query.equalTo ('issueId', $vmc.issueId);
        // query.find ()
        //   .then (resp => {
        //     for (let i = 0; i < resp.length; i ++) {
        //       let obj = {};
        //       let object = resp[i];
        //       for (let i = 0; i < $vmc.labels.length; i ++) {
        //         if ($vmc.labels[i].labelId === object.id) {
        //           $vmc.labels[i].added = true;
        //           ary.push ($vmc.labels[i]);
        //         }
        //       }
        //     }
        //   })


        // $vmc.label = ary;
      },
      

      addIssue () {
        this.adding = true;
      },

      submitIssue () {
        let $vmc = this;

        let Issue = Parse.Object.extend ('Issue');
        let issue = new Issue ();

        issue.set ('name', $vmc.title);
        issue.set ('content', $vmc.content);
        issue.set ('proId', $vmc.proId);
        issue.set ('creator', $vmc.$store.state.user.username);
        issue.set ('issueOpened', true);

        issue.save ()
          .then(resp => {
            $vmc.title = '';
            $vmc.content = '';
            $vmc.showIssueName ();
            $vmc.adding = false;
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
          });
      },

      cancel () {
        this.adding = false;
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
                  $vmc.showIssueName ();
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
              .then (() => $vmc.showIssueName ());
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


      addIssueTo (mileId) {
        let $vmc = this;

        let Issue = Parse.Object.extend ('Issue');
        let ary = [];

        for (let i = 0; i < $vmc.checked.length; i ++) {
          let query = new Parse.Query (Issue);
          
          query.get ($vmc.checked[i])
            .then (resp => {
              
              resp.addUnique ('milestone', mileId);
              resp.save ();
              // ary.push (resp.id);
              // obj.issueOpened = resp.get ('issueOpened');
              
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
    },

    watch: {
    }
  }
</script>

<style scoped>
  
</style>