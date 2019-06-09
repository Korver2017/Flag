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

      <div>
        <router-link :to="{ name: 'new-milestone', params: { orgId: orgId, proId: proId } }" tag="button" class="btn btn-success" active-class="active">
          新的里程碑
        </router-link>
      </div>

    </div>

    <hr />


    <!-- Comment Area Begin -->
    

    <div class="row text-left">

      <div class="col-8">

        <h3 v-if="titleEditing === false">{{ title }}</h3>

        <h3 v-else>
          <input @keyup.enter="changeTitle" v-model="title" type="text" class="form-control">
        </h3>

        

        <div class="ml-1 row d-flex align-items-center">

          <div v-if="issueOpened === true">
            <span style="font-size: 20px;" class="p-2 badge badge-success">開啟中</span>
          </div>

          <div v-else>
            <span class="badge badge-danger">已關閉</span>
          </div>

          <h5 class="mx-2 mb-0">由 {{ creator }} 建立</h5>
          <h5 class="mb-0">{{ comments.length }} 條評論</h5>

        </div>

      </div>

      <div v-if="titleEditing === false" class="ml-auto mt-3">

        <button class="btn btn-outline-success ml-5" @click="titleEditing = true">編輯</button>
      
      </div>

      <div v-else class="ml-auto mt-3">

        <button @click="cancelChange" class="ml-3 btn btn-outline-primary" type="button" id="button-addon2">取消</button>

        <button @click="changeTitle" class="ml-3 btn btn-success" type="button" id="button-addon2">儲存</button>

      </div>

    </div>

    <hr />
    
    <div class="row mx-auto">

      <div>
    
        <img style="width: 50px; height: 50px;" v-if="avatarHash.length > 0" class="rounded" :src="'https://www.gravatar.com/avatar/' + avatarHash" alt="">

      </div>

      <div class="col-9">

        <div>

          <div class="py-2 pl-3 d-flex align-items-center bg-light-theme  border-light-theme border-bottom-0">

            <div class="font-weight-bold">{{ creator }} 評論</div>

            <button v-if="editing === false && creatorId === userId" class="ml-auto mr-3 btn btn-warning" @click="editIssueContent">編輯</button>

          </div>

          <div class="col-12 border-light-theme" v-if="editing === true">

            <form class="col-12 mt-3 mx-auto">

              <ul class="mb-2 nav nav-tabs">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Write</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Preview</a>
                </li>
              </ul>
              
              <div class="form-group text-left">

                <textarea v-model="content" class="form-control" id="content" rows="10"></textarea>
                
              </div>

              <div class="py-5 d-flex justify-content-center border border-primary">拖放檔案或是點擊此處上傳</div>

              <div class="text-right my-4">
              
                <button @click.prevent="cancelEdit" class="btn btn-outline-primary">取消</button>
              
                <button @click.prevent="newContent" class="mx-3 btn btn-success">儲存</button>

              </div>

            </form>

          </div>


          <div v-else>

            <vue-markdown v-if="content.length > 0" class="p-4 border text-left" :source="content"></vue-markdown>

            <div v-else class="p-4 border text-left font-italic">尚未有任何內容</div>

          </div>


        <!-- Comment -->


          <div class="mt-5" v-for="(comment, index) in comments">
            <div class="row mb-3">
              <p class="text-left mb-0">
                Commented by <span class="font-weight-bold">{{ comment.commentor }}</span>
              </p>
              <div v-if="comment.userId === userId" class="row ml-auto mr-5">
                <button class="btn mr-3 btn-warning" @click="editComment (comment.commentId, index)">Edit</button>
                <button class="btn btn-danger" @click="deleteComment (comment.commentId, index)">Delete</button>
              </div>
            </div>

            <vue-markdown v-if="comment.commentEditing === false" class="p-4 border border-success text-left" :source="comment.content"></vue-markdown>

            <form v-else class="mx-auto my-5">

              <div class="form-group text-left">
                <label for="commentContent">Edit Comment</label>
                <textarea v-model="stashComment" placeholder="Comment Here" class="form-control" id="commentContent" rows="10"></textarea>
              </div>
              <button @click.prevent="editedComment (comment.commentId, index)" class="mx-3 btn btn-success">Submit</button>
              <button @click.prevent="cancelEditComment (index)" class="mx-3 btn btn-danger">Cancel</button>

            </form>

          </div>

        </div>

      </div>

      <div>


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


    <!-- Initial Comment End -->

    


  </div>
    

</template>

<script>
  import Parse from "parse";
  import VueMarkdown from "vue-markdown";


  export default {
    

    name: 'issue',


    components: {
      VueMarkdown,
    },


    data () {
      return {
        content: '',
        title: '',
        editTitle: false,
        stashTitle: '',
        creatorId: '',
        creator: '',
        commentor: '',
        comments: [],
        commentText: '',
        labels: [],
        label: [],
        newLabel : '',
        updateLabelTitle: '',
        editing: false,
        stashIssueContent : '',
        orgName: '',
        proName: '',
        issueOpened: '',
        titleEditing: false,
      }
    },


    created () {
    },


    computed: {
      avatarHash () {
        return this.$store.state.user.avatarHash;
      },


      userId () {
        return this.$store.state.user.input.userId;
      },

      orgId () {
        return this.$route.params.orgId;
      },

      proId () {
        return this.$route.params.proId;
      },

      
      issueId () {
        return this.$route.params.issueId; 
      },

    },


    mounted () {
      let $vmc = this;

      $vmc.showIssueInfo ();
      $vmc.allLabel ();
      $vmc.showComment ();

    },


    methods: {

      
      showIssueInfo () {

        let $vmc = this;
        let ary = [];
        let orgData = {};
        let proData = {};

        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);
        query.get ($vmc.issueId)
          .then (resp => {
            $vmc.title = resp.get ('name');
            $vmc.creatorId = resp.get ('creatorId');
            $vmc.creator = resp.get ('creator');
            $vmc.content = resp.get ('content');

            orgData.orgId = resp.get ('orgId');
            orgData.orgName = resp.get ('orgName');
            $vmc.orgData = orgData;
            proData.proId = resp.get ('proId');
            proData.proName = resp.get ('proName');
            $vmc.proData = proData;

            $vmc.orgName = resp.get ('orgName');
            $vmc.proName = resp.get ('proName');
            $vmc.issueOpened = resp.get ('issueOpened');
          });
          
      },

      
      addComment () {
        let $vmc = this;
        let Comment = Parse.Object.extend ('Comment');
        let comment = new Comment ();

        comment.set ('content', $vmc.commentText);
        comment.set ('issueId', $vmc.issueId);
        comment.set ('commentor', $vmc.$store.state.user.username);
        comment.set ('userId', $vmc.$store.state.user.input.userId);

        comment.save ()
          .then (resp => {
            $vmc.commentText = '';
            $vmc.showComment ();
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert ('Failed to create new object, with error code: ' + error.message);
          });
      },


      allLabel () {
        let $vmc = this;
        let Label = Parse.Object.extend ('Label');
        let query = new Parse.Query (Label);
        let ary = [];
        query.equalTo ('proId', $vmc.proId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i++) {
              let obj = {};
              let object = resp[i];
              obj.labelId = object.id;
              obj.title = object.get ('title');
              obj.added = false;
              obj.editMode = false;
              ary.push (obj);

              let arry = [];
              let query = new Parse.Query (Label);
              query.equalTo ('issueId', $vmc.issueId);
              query.find ()
                .then (resp => {
                  for (let i = 0; i < resp.length; i ++) {
                    let obj = {};
                    let object = resp[i];
                    for (let i = 0; i < $vmc.labels.length; i ++) {
                      if ($vmc.labels[i].labelId === object.id) {
                        $vmc.labels[i].added = true;
                        arry.push ($vmc.labels[i]);
                      }
                    }
                  }
                })

              $vmc.label = arry;
            }
          });
          
        $vmc.labels = ary;
      },


      showComment () {
        let $vmc = this;
        let ary = [];
        let Comment = Parse.Object.extend ('Comment');
        let query = new Parse.Query (Comment);
        query.equalTo ('issueId', $vmc.issueId);
        query.find ()
          .then (resp => {
            for (let i = 0; i < resp.length; i ++) {
              let obj = {};
              let object = resp[i];
              obj.commentId = object.id;
              obj.content = object.get ('content');
              obj.userId = object.get ('userId');
              obj.commentor = object.get ('commentor');
              obj.commentEditing = false;
              obj.stashComment = '';
              ary.push (obj);
            }
          });
          $vmc.comments = ary;

      },


      toggleLabel (added, labelId, index) {
        let $vmc = this;
        
        $vmc.labels[index].added = !$vmc.labels[index].added;

        if ($vmc.labels[index].added === true) {
          let Label = Parse.Object.extend ("Label");
          let query = new Parse.Query (Label);
        
          query.get (labelId)
            .then (resp => {
              resp.addUnique ('issueId', $vmc.issueId);
              resp.save ();
            });
        } else {
          let Label = Parse.Object.extend ("Label");
          let query = new Parse.Query (Label);
          query.get (labelId)
            .then (resp => {
              resp.remove ("issueId", $vmc.issueId);
              resp.save ();
            });
        }
          
      },


      changeTitle () {
        let $vmc = this;
        $vmc.titleEditing = false;

        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);
        
        query.get ($vmc.issueId)
        .then (resp => {
          resp.set ('name', $vmc.title);
          return resp.save();
          // The object was retrieved successfully.
        }, (error) => {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
        });
      },


      cancelChange () {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);
        
        query.get ($vmc.issueId)
          .then (resp => {
            $vmc.title = resp.get ('name'); 
            $vmc.titleEditing = false;
          });
      },


      editIssueContent () {
        let $vmc = this;
        $vmc.editing = true;
        $vmc.stashIssueContent = $vmc.content;
      },


      newContent () {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);
        query.get ($vmc.issueId)
          .then (resp => {
            resp.set ('content', $vmc.content);
            $vmc.showIssueInfo ();
            return resp.save ();
          })
        

        $vmc.editing = false;
      },


      cancelEdit () {
        let $vmc = this;
        let Issue = Parse.Object.extend ('Issue');
        let query = new Parse.Query (Issue);
        query.get ($vmc.issueId)
          .then (resp => {
            $vmc.content = resp.get ('content');
            $vmc.editing = false;
          });
      },


      editComment (commentId, index) {
        let $vmc = this;
        $vmc.comments[index].commentEditing = true;
        $vmc.stashComment = $vmc.comments[index].content;
      },


      editedComment (commentId, index) {
        let $vmc = this;
        $vmc.comments[index].content = $vmc.stashComment;
        $vmc.comments[index].commentEditing = false;

        let Comment = Parse.Object.extend ('Comment');
        let query = new Parse.Query (Comment);
        
        query.get (commentId)
        .then (resp => {
          resp.set ('content', $vmc.stashComment);
          return resp.save();
          // The object was retrieved successfully.
        }, (error) => {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
        });
      },


      cancelEditComment (index) {
        let $vmc = this;
        $vmc.comments[index].commentEditing = false;
      },


      deleteComment (commentId, index) {
        let $vmc = this;
        let Comment = Parse.Object.extend ('Comment');
        let query = new Parse.Query (Comment);
        query.get (commentId)
        .then (resp => {
          if (confirm ('確定刪除此評論？')) {
            resp.destroy ()
            .then (() => {
              $vmc.showComment ();
            })
          }
          else return;
          
          // The object was retrieved successfully.
        }, (error) => {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
        });
      },

    },


    watch: {
    }
  }
</script>

<style scoped>
  
</style>