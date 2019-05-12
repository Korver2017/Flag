<template>
  <div class="container">
    <h1>Milestone Component</h1>


    <ul v-for="mile in milestones" class="list-group list-group-flush">
      <button class="py-5 text-left list-group-item">
        <h1>{{ mile }}</h1>

        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style="width: 50%" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </button>
    </ul>


    
  </div>
</template>

<script>
  
  import Parse from "parse";


  export default {


    name: 'milestone',


    data () {
      return {
        milestones: [],
        // issues: [],
      }
    },


    computed: {
      proId () {
        return this.$route.params.proId; 
      }
    },


    created () {
      // const GameScore = Parse.Object.extend("GameScore");
      // const gameScore = new GameScore();

      // gameScore.set("score", 1337);
      // gameScore.set("playerName", "Sean Plott");
      // gameScore.set("cheatMode", false);

      // gameScore.save()
      // .then((gameScore) => {
      //   // Execute any logic that should take place after the object is saved.
      //   alert('New object created with objectId: ' + gameScore.id);
      // }, (error) => {
      //   // Execute any logic that should take place if the save fails.
      //   // error is a Parse.Error with an error code and message.
      //   alert('Failed to create new object, with error code: ' + error.message);
      // });
    },


    mounted () {
      let $vmc = this;
      // console.log ($vmc.proId);

      $vmc.showMile ();
    },


    methods: {
      showMile () {
        let $vmc = this;

        let Mile = Parse.Object.extend ('Milestone');
        let query = new Parse.Query (Mile);
        let ary = [];
        query.equalTo ('proId', $vmc.proId);
        query.find ()
          .then (resp => {
            resp.forEach (mile => {
              let obj = {};
              let issueIds = mile.get ('issues');
              console.log (issueIds);

              obj.title = mile.get ('title');

              if (issueIds.length === 0) {
                ary.push (obj);
                return;
              }

              else {
                let Issue = Parse.Object.extend ('Issue');
                let query = new Parse.Query (Issue);
                // let arry = [];
                let arry = issueIds.map (issueId => {
                  query.get (issueId)
                    .then (resp => {
                      resp.get ('issueOpened');
                      // console.log (arry);
                    });
                
                })
                console.log (arry);
                
              }
            })

          })
        $vmc.milestones = ary;
              
        //       let Issue = Parse.Object.extend ('Issue');
        //       let query = new Parse.Query (Issue);
        //       let issueIds = mile.get ('issues');
        //       console.log (issueIds);
        //       query.containedIn ('objectId', issueIds)
        //         .then (resp => {
        //           console.log (resp);
        //         })
        //     })
        //   })
        
        
        // let issueIds = mile.get ('issues');
        // query.containedIn ('objectId', issueIds).then

        // var Issue = Parse.Object.extend("Issue");
        // var query = new Parse.Query(Issue);
        // query.equalTo ("creator", 'Korver');
        // query.containedIn("objectId", ["RwT3uQAfwD", "IH3GcUKJbW", "N2AamqX3zt"]);
        // query.find ()
          // .then (results => {
          //   for (let i = 0; i < results.length; i++) {
          //     var object = results[i];
          //     alert(object.id + ' - ' + object.get('proId'));
          //   }
          // })


        // var GameScore = Parse.Object.extend("GameScore");
        // var query = new Parse.Query(GameScore);
        // query.equalTo("score", 50);
        // query.containedIn("playerName", ["A", "C", "D", "E", "F", "G"]);
        // query.find ()
        //   .then (resp => {
        //     resp.forEach (i => console.log (i.get ('score')));
        //   })

      }
    },
    
  }
</script>

<style scoped>
  
</style>