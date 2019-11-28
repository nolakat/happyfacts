
<template>
  <div id="app">
    <HappyFact :activeFact="facts[factGenerator]"/>
  </div>
</template>

<script>
 /* eslint-disable */

import HappyFact from './components/HappyFact.vue';
import db from './db'

export default {
  name: 'app',
  components: {
    HappyFact
  },
  data: function(){
    return{
      test: [1, 2],
      facts: [],
    }
  },
  computed:{
    factGenerator: function(){
      return Math.round(Math.random());
    }
  },
  created(){
    db.collection('facts').get().then(querySnapshot => {
      querySnapshot.forEach( doc => {
        console.log(doc.data())

        this.facts.push(doc.data());
      })
    })

    // this.test.map((int) => {
    //   console.log(int);
    // })

  }
}
</script>

<style>

body,html{
  height: 100%;
  width: 100%;
  margin: 0px;
}
h1, h2, h3, h4, h5{
  margin: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

</style>
