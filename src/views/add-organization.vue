<template>
  <div id="wrap">

    <div class="mt-5 col-8 mx-auto">

      <div class="py-3 d-flex justify-content-center align-items-center bg-light-theme  border-light-theme border-bottom-0">
        <h4 class="mb-0">新增組織</h4>
      </div>

      <div class="border-light-theme">

        <div>

          <form>
          
            <div class="col-8 form-group mx-auto mt-5">

              <div class="row d-flex align-items-center justify-content-center">
              
                <label class="d-flex align-items-center mr-3 mb-0" for="name">組織名稱</label>
                <input v-model="orgName" type="text" class="col-8 form-control" id="name">

              </div>

              <small class="form-text text-muted">Organization names should be short and memorable.</small>
            </div>
            
          </form>

        </div>

        <div class="my-4 text-center">

          <button class="mx-2 btn btn-success" @click="addOrganization">建立組織</button>
          <button class="mx-2 btn btn-secondary" @click="cancelAdding">取消</button>
          
        </div>
        
      </div>

    </div>
    
  </div>
</template>

<script>
  import Parse from "parse";

  export default {
    
    name: 'add-organization',

    data () {
      return {
        orgName: '',
        orgs: '',
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

    methods: {
      getNewOrg () {
        let $vmc = this;
        let Org = Parse.Object.extend ('Organization');
        let query = new Parse.Query (Org);
        let ary = [];

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
          })
          .then (resp => {
            $vmc.$router.push ({ name: 'dashboard' });
          })
      },


      cancelAdding () {
        let $vmc = this;

        $vmc.orgName = '';
        $vmc.$router.push ({ name: 'dashboard' });
      },


      addOrganization () {
        let $vmc = this;

        if ($vmc.orgName === '') {
          alert ('組織名稱不可空白');
          return;
        }
        
        let Org = Parse.Object.extend ('Organization')
          , org = new Org ();

        org.set ('name', $vmc.orgName);
        org.addUnique ('memberId', $vmc.user.userId);
        org.save ()
          .then (resp => {
            $vmc.getNewOrg ();
            $vmc.orgName = '';
            // Execute any logic that should take place after the object is saved.
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
          })
      },
    },

  }
</script>

<style scoped>
  
</style>