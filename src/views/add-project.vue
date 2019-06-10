<template>
  <div id="wrap">

    <div class="mt-5 col-8 mx-auto">

      <div class="py-3 d-flex justify-content-center align-items-center bg-light-theme  border-light-theme border-bottom-0">
        <h4 class="mb-0">新增儲存庫</h4>
      </div>

      <div class="border-light-theme">

          <form v-if="orgs.length > 0">
          
            <div class="col-8 form-group mx-auto mt-5">

              <div class="row d-flex align-items-center justify-content-end">

                <div>
              
                  <label for="name">擁有者</label>

                </div>

                <div class="col-8 input-group mb-3">

                  <select v-model="selected" class="custom-select" id="inputGroupSelect01">

                    <option :value="user.username">{{ user.username }}</option>
                    <option v-for="org in orgs" :value="org">{{ org.orgName }}</option>

                  </select>

                </div>

              </div>

              <div class="row d-flex align-items-center justify-content-end">

                <div>
              
                  <label for="name">儲存庫名稱</label>

                </div>

                <div class="col-8 input-group mb-3">
                  <input v-model="projectName" type="text" class="form-control" id="repo">
                </div>

                <small class="form-text text-muted d-flex justify-content-end">好的儲存庫名稱通常是簡短的、好記的、且獨特的。</small>

              </div>

              
            </div>
            
          </form>

        </div>

        <div class="my-5">

          <button class="mx-2 btn btn-success" @click.prevent="addProject">建立儲存庫</button>
          <button class="mx-2 btn btn-secondary" @click.prevent="">取消</button>
          
        </div>
        
      </div>

    </div>
    
  </div>
</template>

<script>
  import Parse from "parse";

  export default {
    
    name: 'add-project',

    data () {
      return {
        orgs: '',
        projectName: '',
        selected: '',
        // orgNameList: [],
        
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

    created () {
      this.showAllOrg ();
    },

    methods: {

      addProject () {
        let $vmc = this;
        let Pro = Parse.Object.extend ('Project');
        let pro = new Pro ();

        pro.set ('orgName', $vmc.selected.orgName);
        pro.set ('orgId', $vmc.selected.orgId);
        pro.set ('name', $vmc.projectName);

        pro.save ()
          .then (resp => {
            $vmc.projectName = '';
            $vmc.$router.push ('/dashboard');
          });

      },

      showAllOrg () {
        let $vmc = this;
        let Org = Parse.Object.extend ('Organization');
        let query = new Parse.Query (Org);
        let ary = [];
        // let orgNames = [];

        query.notEqualTo ('name', '')
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let query = new Parse.Query (Org);
              let object = resp[i];
              
              query.get (object.id)
                .then (resp => {
                  obj.orgId = object.id;
                  obj.orgName = resp.get ('name');
                  ary.push (obj);
                })
                .then (resp => {
                  $vmc.orgs = ary;
                });
            }

          })
      },
    },

  }
</script>

<style scoped>
  
</style>