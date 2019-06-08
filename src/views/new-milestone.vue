<template>
  <div>
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

        <router-link class="nav-item" :to="{ name: 'project', params: { orgId: orgId, proId: proId } }" tag="li" active-class="active">
          <a class="nav-link active">問題 <span class="ml-2 badge badge-secondary">123</span></a>
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

          <router-link :to="{ name: 'label-list', params: { proId: proId }}" tag="button" class="btn btn-outline-secondary" active-class="active">
            標籤
          </router-link>

          <router-link :to="{ name: 'milestone', params: { proId: proId } }" tag="button" class="btn btn-outline-secondary" active-class="active">
            里程碑
          </router-link>
          
        </div>

      </div>

      <hr />

      <div class="text-left">
        <h3>新的里程碑</h3>
        <h5>Milestones organize issues and track progress.</h5>
      </div>

      <hr />

      <div class="row">

        <div class="col-8">

          <form class="text-left">

            <div class="form-group">
              <label for="mileTitle">標題</label>
              <input v-model="mileTitle" type="text" class="form-control" id="mileTitle" placeholder="標題">
            </div>

            <div class="form-group">
              <label for="desc">描述</label>
              <textarea v-model="mileDesc" class="form-control" id="desc" rows="10"></textarea>
            </div>
          
          </form>
          
        </div>

        <div class="col-4">

          <form class="text-left">

            <div class="form-group">
              <label for="expireDate">截止日期（可選）</label> <button class="mb-2 btn btn-warning" @click.prevent="date = null">清除</button>
              <input v-model="date" type="text" class="col-6 form-control" id="expireDate">
            </div>

            <date-picker class="col-8 p-2 border border-secondary" name="date" v-model="date" :config="options"></date-picker>

          </form>

        </div>

      </div>
      
      <hr class="my-4" />

      <div class="text-right">
        <button class="btn btn-success" @click="addMilestone">建立里程碑</button>
      
      </div>

    </div>

  </div>
</template>

<script>
  
  import Parse from "parse";
  // import DatetimePicker from "@/components/datetime-picker.vue";
  
  // Import this component
  import datePicker from 'vue-bootstrap-datetimepicker';
  
  // Import date picker css
  import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

  export default {

    name: 'new-milestone',

    components: {
      datePicker
    },

    data () {
      return {
        date: null,
        options: {
          format: 'YYYY-MM-DD',
          inline: true,
        },
        addingMile: false,
        mileDesc: '',
        milestones: [],
        showOpened: true,
        mileTitle: '',
        mileOpened: 0,
        mileClosed: 0,
        orgName: '',
        proName: '',
        mileIssues: [],
        editingMile: false,
      }
    },

    computed: {

      orgId () {
        return this.$route.params.orgId;
      },

      proId () {
        return this.$route.params.proId;
      },

    },


    mounted () {
      this.showRouteName ();
    },

    methods: {
      
      showRouteName () {
        let $vmc = this;
        let Project = Parse.Object.extend ('Project');
        let query = new Parse.Query (Project);

        query.get ($vmc.proId)
          .then (resp => {
            $vmc.orgName = resp.get ('orgName');
            $vmc.proName = resp.get ('name');
          }, (error) => {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          });
      },

      addMilestone () {
        let $vmc = this;

        const Mile = Parse.Object.extend ('Milestone');
        const mile = new Mile ();

        mile.set ('title', $vmc.mileTitle);
        mile.set ('proId', $vmc.proId);
        mile.set ('orgId', $vmc.orgId);
        mile.set ('proName', $vmc.proName);
        mile.set ('orgName', $vmc.orgName);
        mile.set ('mileOpened', true);
        mile.set ('dueDate', $vmc.date);
        mile.set ('mileDesc', $vmc.mileDesc);

        mile.save ()
          .then (resp => {
            $vmc.mileTitle = '';
            $vmc.$router.push ({ name: 'milestone' });
            // $vmc.showMile ();
            // Execute any logic that should take place after the object is saved.
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert ('Failed to create new object, with error code: ' + error.message);
          });
      },
    },
    
  }
</script>

<style scoped>
  
</style>