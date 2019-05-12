<template>
  <div class="container">
    <h1>Milestone Component</h1>


    <ul v-for="mile in milestones" class="list-group list-group-flush">
      <button class="py-5 text-left list-group-item">
        <h1>{{ mile }}</h1>
        <h1>{{ mile.title }}</h1>

        <p>{{ mile.percentage }}%</p>

        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" :style="{ width: mile.percentage + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
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
      }
    },


    computed: {
      proId () {
        return this.$route.params.proId; 
      }
    },


    created () {
    },


    mounted () {
      let $vmc = this;

      $vmc.showMile ();
    },


    methods: {
      showMile () {
        let $vmc = this;
        let ary = [];
        let Mile = Parse.Object.extend ('Milestone');
        let query = new Parse.Query (Mile);

        query.equalTo ('proId', $vmc.proId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              
              let Issue = Parse.Object.extend ('Issue');
              let query = new Parse.Query (Issue);
              let obj = {};
              let count = 0;
              let object = resp[i];
              obj.title = object.get ('title');
              query.equalTo ('milestone', object.id);
              query.find ()
                .then (resp => {
                  for (let i = 0; i < resp.length; i ++) {
                    if (resp[i].get ('issueOpened') === false) {
                      count += 1;
                    }
                  }
                  let allCount = resp.length;
                  let closed = count;

                  obj.percentage = ((closed / allCount) * 100).toFixed (0);
                  ary.push (obj);

                  $vmc.milestones = ary;
                });
            }
          })

      }
    },
    
  }
</script>

<style scoped>
  
</style>