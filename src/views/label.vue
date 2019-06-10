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
            <a class="nav-link active">問題 <span class="ml-2 badge badge-secondary">123</span></a>
          </router-link>
          <!-- <li class="nav-item">
            <a class="nav-link active" href="#">問題<span class="ml-2 badge badge-secondary">{{ issues.length }}</span></a>
          </li> -->
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






















          <div v-if="addingLabel === false">
            <button class="btn btn-success h-100" @click="addingLabel = true">建立標籤</button>
          </div>
            
          <div v-else class="rounded my-3 p-3 input-group border-light-theme">

            <input v-model="labelName" type="text" class="col-3 mr-5 form-control p-2" placeholder="標籤名稱" aria-label="example">
            <input v-model="labelDesc" type="text" class="col-4 form-control p-2" placeholder="描述" aria-label="example">

            <button class="ml-auto btn btn-outline-primary mr-3" @click="cancelAddLabel">取消</button>
            <button class="btn btn-success" @click="newLabel">建立標籤</button>
          </div>

        </div>

        <ul class="list-group list-group-flush">

          <li class="list-group-item">
            <div class="row d-flex align-items-center">
              <h4 class="col-2 text-left mb-0"><span class="p-2 badge badge-dark">{{ labels.length }}個標籤</span></h4>
              <div class="ml-auto mr-4">排序</div>
            </div>
          </li>

          <li v-for="(label, index) in labels" class="list-group-item">
            <div class="row d-flex align-items-center">
              <h4 class="col-2 text-left mb-0"><span class="p-2 badge badge-dark">{{ label.title }}</span></h4>
              <div class="ml-5">
                {{ label.labelDesc }}
              </div>
              <div class="ml-auto mr-5">0 個開啟的問題</div>
              <div>

                <button class="mr-3 btn btn-success" @click="editingLabel (index)">編輯</button>

                <modal width="800" height="auto" :name="'modal' + index">

                  <h5 class="p-3 font-weight-bold">編輯標籤</h5>

                  <hr />

                  <div class="ml-3 row">

                    <div class="col-3 input-group">
                      <input v-model="labels[index].newLabelName" type="text" class="form-control" aria-label="example">
                    </div>

                    <div class="col-6 input-group">
                      <input v-model="labels[index].newLabelDesc" type="text" class="form-control" aria-label="example" placeholder="描述">
                    </div>

                  </div>

                  <hr />

                  <div class="mb-3 text-right">
                    <button class="mr-3 btn btn-danger" @click="cancelUpdateLabel (index)">取消操作</button>
                    <button class="mr-3 btn btn-success" @click="updateLabel (index)">更新</button>
                  </div>

                </modal>
                
                <button class="mr-3 btn btn-danger" @click="deleteLabel (index)">刪除</button>
              </div>
            </div>
          </li>
        </ul>

  </div>



  <!-- <div class="my-5 container">

    <h3 class="my-5 text-left">

      <router-link :to="{ name: 'organization'}" tag="a" active-class="active">
        <a>{{ orgName }}</a>
      </router-link> / 
      
      <router-link :to="{ name: 'project'}" tag="a" active-class="active">
        <a>{{ proName }}</a>
      </router-link>

    </h3>

    <div v-if="addingLabel === false" class="text-right mr-5">
      <button class="btn btn-success" @click="addingLabel = true">Add Label</button>
    </div>

    <div v-if="addingLabel === true" class="d-flex justify-content-center row form-group text-left">
      <div class="col-3">
        <label for="labelName">Label Name</label>
        <input v-model="labelName" type="text" class="form-control" aria-describedby="button-addon2" id="labelName">
      </div>
      <div class="col-5">
        <label for="labelDesc">Description</label>
        <input v-model="labelDesc" type="text" class="form-control" aria-describedby="button-addon2" id="labelDesc">
      </div>
      <div class="d-flex align-items-end">
        <button class="mr-3 btn btn-success" @click="newLabel">Create Label</button>
        <button class="mr-3 btn btn-danger" @click="cancelAddLabel">Cancel</button>
      </div>
    </div>


    <ul class="my-3 list-group list-group-flush text-left">
      <li v-for="(label, index) in labels" class="py-3 list-group-item">

        <div class="row" v-if="labels[index].editingLabel === false">
          <div class="col-4">{{ label.title }}</div>
          <div class="col-4">{{ label.labelDesc }}</div>
          <button class="ml-auto mr-3 btn btn-warning" @click="editingLabel (index)">Edit</button>
          
          <button v-if="labels[index].editingLabel === false" class="mr-3 btn btn-danger" @click="deleteLabel (index)">Delete</button>
        </div>

        <div v-if="labels[index].editingLabel === true" class="d-flex justify-content-center form-group text-left">

          <div class="col-3">
            <label for="labelName">Label Name</label>
            <input v-model="labels[index].newLabelName" type="text" class="form-control" aria-describedby="button-addon2" id="newLabelName">
          </div>
          <div class="col-5">
            <label for="labelDesc">Description</label>
            <input v-model="labels[index].newLabelDesc" type="text" class="form-control" aria-describedby="button-addon2" id="newLabelDesc">
          </div>
          <div class="d-flex align-items-end">
            <button class="mr-3 btn btn-success" @click="updateLabel (index)">Save Changes</button>
            <button class="mr-3 btn btn-danger" @click="cancelUpdateLabel (index)">Cancel</button>
          </div>

        </div>
          
      </li>
    </ul>

  </div> -->
</template>

<script>
  import Parse from 'parse';

  export default {


    name: 'label-list',
    
    data() {
      return {
        orgName: '',
        proName: '',
        labels: [],
        addingLabel: false,
        labelName: '',
        labelDesc:'',
        newLabelName: '',
        newLabelDesc: '',
      }
    },
    computed: {
      proId () {
        return this.$route.params.proId; 
      },

      issueId () {
        return this.$route.params.issueId;
      },

      issues () {
        // return this.$route.params.issues;
        return 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      },
    },

    mounted () {
      let $vmc = this;
      
      $vmc.showRouteName ();
      $vmc.showLabel ();
    },
    methods: {
      show (index) {
        this.$modal.show ('modal' + index);
      },
      hide (index) {
        this.$modal.hide ('modal' + index);
      },

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
      showLabel () {
        let $vmc = this;
        const Label = Parse.Object.extend ('Label');
        const query = new Parse.Query (Label);
        let ary = [];
        query.equalTo ('proId', $vmc.proId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i++) {
              let obj = {};
              let object = resp[i];
              obj.labelId = object.id;
              obj.title = object.get ('title');
              obj.labelDesc = object.get ('labelDesc');
              obj.editingLabel = false;
              obj.newLabelName = '';
              obj.newLabelDesc = '';
              ary.push (obj);
            }
          });
        
        $vmc.labels = ary;
      },
      newLabel () {
        let $vmc = this;
        const Label = Parse.Object.extend ('Label');
        const label = new Label ();

        label.set ('title', $vmc.labelName);
        label.set ('labelDesc', $vmc.labelDesc);
        label.set ('proId', $vmc.proId);
        label.save ()
          .then (resp => {
            $vmc.showLabel ();
            $vmc.cancelAddLabel ();
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert ('Failed to create new object, with error code: ' + error.message);
          });
      },
      cancelAddLabel () {
        let $vmc = this;

        $vmc.labelName = '';
        $vmc.labelDesc = '';
        $vmc.addingLabel = false;
      },










      editingLabel (index) {
        let $vmc = this;
        let label = $vmc.labels[index];

        $vmc.labels[index].newLabelName = $vmc.labels[index].title;
        $vmc.show (index);
      },











      
      updateLabel (index) {
        let $vmc = this;
        let labelId = $vmc.labels[index].labelId;
        let Label = Parse.Object.extend ('Label');
        let query = new Parse.Query (Label);
        query.get (labelId)
          .then (resp => {
            resp.set ('title', $vmc.labels[index].newLabelName);
            resp.set ('labelDesc', $vmc.labels[index].newLabelDesc);
            resp.save ()
              .then (resp => {
                $vmc.showLabel ();
              });
          }, (error) => {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          });
      },
      cancelUpdateLabel (index) {
        let $vmc = this;

        $vmc.newLabelName = '';
        $vmc.newLabelDesc = '';
        $vmc.labels[index].editingLabel = false;
        $vmc.hide (index);
      },
      deleteLabel (index) {
        let $vmc = this;

        let labelId = $vmc.labels[index].labelId;

        let Label = Parse.Object.extend ('Label');
        let query = new Parse.Query (Label);
        query.get (labelId)
          .then (resp => {
            if (confirm ('確定要刪除這個 Label 嗎？')) {
              resp.destroy ()
                .then (resp => {
                  $vmc.showLabel ();
                }, (error) => {
                  // The delete failed.
                  // error is a Parse.Error with an error code and message.
                });
            }
          })
      }
    },
  }
</script>

<style scoped>
  
</style>