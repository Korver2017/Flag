<template>

  <div id="wrap" class="my-3">

    <div class="row my-4">

      <div class="mb-0 d-flex align-items-center">

        <h4 class="text-left">

          <router-link :to="{ name: 'organization'}" tag="a" active-class="active">
            <a>{{ orgName }}</a>
          </router-link>
          / <router-link :to="{ name: 'project'}" tag="a" active-class="active">
            <a>{{ proName }}</a>
          </router-link>

        </h4>

      </div>

      <div class="ml-auto">

        <div class="pr-3 btn-group btn-group-toggle" data-toggle="buttons">
          <label class="border border-dark btn">
            <input type="radio" name="options" id="option1" autocomplete="off" checked> 取消關注
          </label>
          <label class="border border-dark btn">
            <input type="radio" name="options" id="option2" autocomplete="off"> 8
          </label>
        </div>

        <div class="pr-3 btn-group btn-group-toggle" data-toggle="buttons">
          <label class="border border-dark btn">
            <input type="radio" name="options" id="option1" autocomplete="off" checked> 收藏
          </label>
          <label class="border border-dark btn">
            <input type="radio" name="options" id="option2" autocomplete="off"> 0
          </label>
        </div>

        <div class="pr-3 btn-group btn-group-toggle" data-toggle="buttons">
          <label class="border border-dark btn">
            <input type="radio" name="options" id="option1" autocomplete="off" checked> 複製
          </label>
          <label class="border border-dark btn">
            <input type="radio" name="options" id="option2" autocomplete="off"> 0
          </label>
        </div>

      </div>

    </div>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" href="#">程式碼</a>
      </li>

      <router-link class="nav-item" :to="{ name: 'project' }" tag="li" active-class="active">
        <a class="nav-link active">問題 <span class="ml-2 badge badge-secondary">{{ issueCount }}</span></a>
      </router-link>

      <li class="nav-item">
        <a class="nav-link" href="#">合併請求<span class="ml-2 badge badge-secondary">0</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">版本發佈<span class="ml-2 badge badge-secondary">0</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Wiki</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">活動</a>
      </li>
      <li class="ml-auto nav-item">
        <a class="nav-link" href="#">儲存庫設定</a>
      </li>
    </ul>

    <div class="row my-4 d-flex justify-content-between">

      <div class="btn-group" role="group" aria-label="Basic example">

        <router-link :to="{ name: 'label-list', params: { proId: proId } }" tag="button" class="btn btn-outline-secondary" active-class="active">
          標籤
        </router-link>

        <router-link :to="{ name: 'milestone', params: { proId: proId } }" tag="button" class="btn btn-outline-secondary" active-class="active">
          里程碑
        </router-link>
        
      </div>

    </div>

    <hr />


    <!-- Input-Form Start -->


    <div class="row">

      <div class="col-9">

        <div class="row">
  
          <img style="width: 50px; height: 50px;" v-if="avatarHash.length > 0" class="rounded" :src="'https://www.gravatar.com/avatar/' + avatarHash" alt="">

          <form style="border: 1px solid rgba(34,36,38,.15);" class="rounded ml-3 col-11">
            
            <div class="form-group text-left">
              <label @keyup.enter="submitIssue" for="title"></label>
              <input v-model.trim="title" class="form-control" placeholder="標題" id="title">
            </div>

            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link active" href="#">Write</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Preview</a>
              </li>
            </ul>
            
            <div class="form-group text-left">
              <label @keyup.enter="submitIssue" for="content"></label>
              <textarea v-model="content" class="form-control" id="content" rows="10"></textarea>
            </div>

            <div class="py-5 d-flex justify-content-center border border-primary">拖放檔案或是點擊此處上傳</div>
            
            <button @click.prevent="submitIssue" class="d-block ml-auto my-3 btn btn-success">建立問題</button>

          </form>

        </div>

      </div>


      <!-- Input-Form End -->
      

      <div class="col-3">

        <ul style="border: 1px solid rgba(34,36,38,.15);" class="text-left list-group list-group-flush">
          <li class="list-group-item">
            <input type="text" class="form-control" placeholder="未指定分支或標籤">
          </li>

          <li class="list-group-item">
            <div class="dropdown">
              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                標籤
              </a>


              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                
                <a v-for="(label, index) in labels" @click="toggleLabel (label.added, label.labelId, index)" class="dropdown-item" href="#">{{ label.title }}</a>
              </div>

              <template v-for="(label, index) in labels">
                <h5 v-if="labels[index].added === true"><span class="badge badge-secondary">{{ labels[index].title }}</span></h5>

              </template>

            </div>

          </li>

          <li class="pb-3 list-group-item">里程碑</li>
          <li class="pb-3 list-group-item">指派成員</li>

        </ul>
        
      </div>

    </div>

  </div>


</template>

<script>
  import Parse from "parse";
  import AddIssue from "@/views/add-issue.vue";

  export default {
    

    name: 'add-issue',


    components: {
      AddIssue,
    },


    data () {
      return {
        issueCount: '',
        title: '',
        content: '',
        labels: [],
        orgName: '',
        proName: '',
      }
    },


    computed: {
      avatarHash () {
        return this.$store.state.user.avatarHash;
      },

      proId () {
        return this.$route.params.proId;
      },

      orgId () {
        return this.$route.params.orgId;
      },

      userId () {
        return this.$store.state.user.input.userId;
      },
    },


    created () {
    },


    mounted () {
      let $vmc = this;
      
      $vmc.showProName ();
      $vmc.showIssueCount ();
      $vmc.showLabel ();
    },


    methods: {

      showLabel () {
        let $vmc = this;
        let Label = Parse.Object.extend ('Label');
        let query = new Parse.Query (Label);
        let ary = [];

        query.equalTo ('proId', $vmc.proId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let object = resp[i];
              
              obj.labelId = object.id;
              obj.title = object.get ('title');
              obj.labelDesc = object.get ('labelDesc');
              obj.issueId = object.get ('issueId');
              obj.added = false;

              ary.push (obj);
            }
          });

        $vmc.labels = ary;

      },

      toggleLabel (added, labelId, index) {
        let $vmc = this;
        
        $vmc.labels[index].added = !$vmc.labels[index].added;
      },


      showProName () {
        let $vmc = this;
        let id = $vmc.$route.params.proId;

        const Pro = Parse.Object.extend ('Project');
        let query = new Parse.Query (Pro);
        query.get (id)
          .then (resp => {
            $vmc.proName = resp.get ('name');
            $vmc.orgName = resp.get ('orgName');
          });
      },

      showIssueCount () {
        let $vmc = this;
        const Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);

        query.equalTo ('proId', $vmc.proId);
        query.find ()
          .then (resp => {
            $vmc.issueCount = resp.length;
          });
      },

      submitIssue () {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let issue = new Issue ();
        let query = new Parse.Query (Issue);

        issue.set ('name', $vmc.title);
        issue.set ('content', $vmc.content);
        issue.set ('creator', $vmc.$store.state.user.username);
        issue.set ('issueOpened', true);
        issue.set ('orgId', $vmc.orgId);
        issue.set ('proId', $vmc.proId);
        issue.set ('orgName', $vmc.orgName);
        issue.set ('proName', $vmc.proName);
        issue.set ('mileTitle', '');
        issue.set ('milestone', '');
        issue.save ()
          .then (resp => {
            $vmc.title = '';
            $vmc.content = '';
            $vmc.$router.push ({ name: 'project' });
          })
      },

    },
  }
</script>

<style scoped>
input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

</style>