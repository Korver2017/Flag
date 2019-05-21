<template>
  <div>
    <h1>Label Component</h1>
    <h3>{{ labels }}</h3>
  </div>
</template>

<script>
  import Parse from 'parse';

  export default {
    data() {
      return {
        labels: [],
      }
    },
    mounted () {
      let $vmc = this;
      const Label = Parse.Object.extend ('Label');
      const query = new Parse.Query (Label);
      let ary = [];
      query.notEqualTo ('title', '');
      query.find ()
        .then (resp => {
          for (let i = 0; i < resp.length; i++) {
            let object = resp[i];
            ary.push (object.get ('title'));
            alert (object.id + ' - ' + object.get ('title'));
          }
        });
      
      $vmc.labels = ary;
    }
  }
</script>

<style scoped>
  
</style>