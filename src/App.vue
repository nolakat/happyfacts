
<template>
  <div id="app">
    <div id="happy__window" :style="[baseStyle]">
        <div
          v-touch:tap="touchHandler"
          class="touchbar touchbar--left"></div>
          <Loading v-if="isLoading" />
          <HappyFact v-else :activeFact="facts[randomGenerator]" :activeNumber="randomGenerator"/>
        <div
          v-touch:tap="touchHandler"
          class="touchbar touchbar--right"></div>
    </div>
  </div>
</template>

<script>
 /* eslint-disable */

import HappyFact from './components/HappyFact.vue';
import Loading from './components/Loading.vue';
import db from './db';
import { colorPairs } from './config/colors';


export default {
  name: 'app',
  components: {
    HappyFact,
    Loading
  },
  data: function(){
    return{
      isLoading: true,
      color_block: '',
      facts: []
    }
  },
  computed:{
    randomGenerator: function(){
      return Math.round(Math.random());
    },
    baseStyle: function(){
       return {
                background: `${this.color_block[0]}`,
                color: `${this.color_block[1]}`
              }
    }
  },
  created(){
    this.generateColors();
    this.fetchFacts();
  },
  methods: {
    generateColors(){
      const colors = colorPairs[Math.floor(Math.random() * colorPairs.length)];

        if(Math.round(Math.random()) == 1){ colors.reverse() }
        this.color_block = colors;
    },
    fetchFacts(){
      db.collection('facts').get().then(querySnapshot => {
        querySnapshot.forEach( doc => {
          this.facts.push(doc.data());
          this.isLoading = false;
        })
      })
    },
    touchHandler(){
      console.log('YOU TOUCHED ME!!!');
      this.generateColors();
    }
  }
}
</script>

<style lang="scss">

a{
  color: inherit;
  text-decoration: none;
}

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

#happy__window{
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.touchbar{
  height: 100%;
  width: 25%;
  position: absolute;
  background: #ccc;
  opacity: .5;
  z-index: 1;

  &.touchbar--left{
    left: 0px;
  }

  &.touchbar--right{
    right: 0px;
  }
}

</style>