<template>

  <div>

    <div class="row my-4">

      <div class="mb-0 d-flex align-items-center">

        <h4 class="text-left">

          <router-link :to="{ name: 'organization', params: { orgId: orgId, orgName: orgName, proId: proId, proName: proName } }" tag="a" active-class="active">
            <a>{{ orgName }}</a>
          </router-link>
          / <router-link :to="{ name: 'project', params: { orgId: orgId, orgName: orgName, proId: proId, proName: proName } }" tag="a" active-class="active">
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

      <router-link class="nav-item" :to="{ name: 'project', params: { orgId: orgId, proId: proId, orgName: orgName, proName: proName } }" tag="li" active-class="active">
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


  </div>

</template>

<script>
  export default {
    
    name: 'sub-navbar',

    props: ['orgId', 'proId', 'orgName', 'proName', 'issueCount'],

    mounted () {
      console.log (this.$route.params);
    },
    
  }
</script>

<style scoped>
  
</style>