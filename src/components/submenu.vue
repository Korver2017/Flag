<template>

  <div>

    <nav class="navbar navbar-expand-lg navbar-light bg-white">

      <div class="dropdown">
        
        <a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

          <img class="rounded" style="width: 30px; height: 30px" :src="'https://www.gravatar.com/avatar/' + user.avatarHash" alt="">
          <span class="mx-2">{{ user.username }}</span>

        </a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          
          <li class="pb-2 d-flex align-items-center justify-content-center">切換控制面板用戶</li>

          <hr class="mt-0" />

          <a class="dropdown-item" href="#">{{ user.username }}</a>
          <a v-for="org in orgs" class="dropdown-item" href="#">{{ org.name }}</a>

          <hr class="mb-0" />

          <router-link class="dropdown-item" to="/org/create" tag="button" active-class="active">
            新增組織
          </router-link>

        </div>
        
      </div>
      
    </nav>

  </div>
  
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  
</style>