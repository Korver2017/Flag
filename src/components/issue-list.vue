<template>

  <div class="mt-3 list-group list-group-flush" v-if="issues.length >= 1">

    <h1>qq</h1>

    <template v-for="issue in issues">

      <!-- Opened Issue-List Start-->

      <router-link v-if="issue.issueOpened === true && showOpened === true" :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="li" type="li"  class="list-group-item" active-class="active">

        <div class="row d-flex align-items-center">

          <input class="mr-3" type="checkbox" :value='issue.issueId' v-model="checking">
          <span class="px-3 py-2 badge badge-primary">#1</span>
          <a style="font-size: 20px;" class="ml-3 text-decoration-none">{{ issue.name }}</a>
          
          <span v-for="label in issue.labels" class="px-3 py-2 ml-3 badge badge-primary">{{ label }}</span>

          <span v-if="issue.mileTitle !== '' || undefined">
            <i class="ml-3 fa fa-map-signs" aria-hidden="true"></i> {{ issue.mileTitle }}
          </span>

        </div>

        <div class="row d-flex align-items-center">
          <div>由 {{ issue.creator }} 建立</div>

          <div class="ml-auto">
            <img v-if="issue.avatarHash.length > 0" v-for="hash in issue.avatarHash" :src="'https://www.gravatar.com/avatar/' + hash" style="width: 30px" class="mr-3 rounded" alt="">
          </div>

        </div>
        
      </router-link>

      <!-- Opened Issue-List End -->

      <!-- Closed Issue-List Start -->

      <router-link v-else-if="issue.issueOpened === false && showOpened === false" :to="{ name: 'issue', params: { issueId: issue.issueId }}" tag="li" type="li" class="list-group-item" active-class="active">

        <div class="row d-flex align-items-center">

          <input class="mr-3" type="checkbox" :value='issue.issueId' v-model="checking">

          <span class="px-3 py-2 badge badge-primary">#1</span>
          <a style="font-size: 20px;" class="ml-3 text-decoration-none">{{ issue.name }}</a>
          
          <span v-for="label in issue.labels" class="px-3 py-2 ml-3 badge badge-primary">{{ label }}</span>

          <span v-if="issue.mileTitle !== '' || undefined">
            <i class="ml-3 fa fa-map-signs" aria-hidden="true"></i> {{ issue.mileTitle }}
          </span>

        </div>

        <div class="row d-flex align-items-center">
          <div>由 {{ issue.creator }} 建立</div>

          <div class="ml-auto">
            <img v-if="issue.avatarHash.length > 0" v-for="hash in issue.avatarHash" :src="'https://www.gravatar.com/avatar/' + hash" style="width: 30px" class="mr-3 rounded" alt="">
          </div>

        </div>
        
      </router-link>

    </template>
      
  </div>
    
</template>

<script>
  export default {

    name: 'issue-list',

    props: ['issues', 'showOpened', 'checked'],

    data () {
      return {
        checking: this.checked,
      }
    },

    computed: {
    },

    watch: {
      checking () {
        this.$emit ('checking', this.checking);
      },
      
      checked () {
        this.checking = this.checked;
      }
    }
  }
</script>

<style scoped>
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }

  .list-group-item {
    border: 0;
    border-bottom: 3px dotted rgba(0, 0, 0, .125);
  }
</style>