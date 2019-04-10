<template>
  <div>

    <li class="list-group-item list-group-item-primary mt-5" v-for="project in projects" :key="project">

      <h3>Project： {{ project }}</h3>
      <router-link to="/issues">Issues</router-link>
      
      <template>
        <issue :issueGroup="issueGroup"  />
        <!-- <issue /> -->
      </template>

    </li>

  </div>
</template>

<script>
  import Issue from "@/views/issue.vue";

  export default {
    

    /**
     *
     * Component name
     *
     */
    name: 'project',


    /**
     *
     * Inner components
     *
     */
    components: {
      Issue,
    },


    props: ['projects'],


    data () {
      return {
        issueGroup: [
          {
            title: 'Call Wake 起床尿尿',
            comment: ['qq'],
          },
          {
            title: 'i2', comment: ['n', 'z'],
          },
        ],
      }
    },


  }
</script>

<style scoped>
  
</style>