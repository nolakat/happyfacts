
<template>
  <div id="app"
       v-touch:swipe.top="swipeHandler"
       v-touch:swipe.bottom="swipeHandler"
       :style="cssProps">
    <div id="happy__window"
      :style="[baseStyle]">
      <svg
        id="svg-pointer"
         :style="cursorCircle">
          <circle class="svg-point" cx="100" cy="100" r="3" stroke-width=".5" />
      </svg>

        <div
          v-touch:tap="touchHandler"
          class="touchbar touchbar--left"></div>

          <Loading v-if="isLoading" />
          <HappyFact v-else
            :activeFact="facts[active_index]"
            />

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
import { shuffle } from 'lodash';
import gsap from "gsap";



export default {
  name: 'app',
  components: {
    HappyFact,
    Loading,
  },
  data: function(){
    return{
      isLoading: true,
      color_block: '',
      facts: [],
      active_index: 0,
      xParent: 0,
      yParent: 0,
    }
  },
  computed:{
    randomGenerator: function(){
      return Math.round(Math.random());
    },
    cssProps: function(){
      return{
        '--font-color': this.color_block[1]
      }
    },
    baseStyle: function(){
       return {
                background: `${this.color_block[0]}`,
                color: `${this.color_block[1]}`
              }
    },
    cursorCircle: function(){
         return `transform: translate(${this.xParent}px, ${this.yParent}px)`;
    }
  },
  created(){
    this.generateColors();
    this.fetchFacts();
  },
  mounted(){
    document.body.addEventListener("mousemove", e =>{
      this.moveCursor(e);
    });
  },
  methods: {
    generateColors(){
      const colors = colorPairs[Math.floor(Math.random() * colorPairs.length)];
        if(Math.round(Math.random()) == 1){ colors.reverse() }
        this.color_block = colors;
    },
    fetchFacts(){
      db.collection('facts').get().then( querySnapshot => {
        let i = 0;
        querySnapshot.forEach((doc) => {
          let obj = doc.data();
          obj.id = i;
          this.facts.push(obj);
          this.isLoading = false;
          this.shufflePack();
          i++;
        })
      })
    },
    shufflePack(){
      const shuffled_pack = _.shuffle(this.facts);
      this.facts = shuffled_pack;
    },
    moveAlong(){
      if( this.active_index != this.facts.length-1){
        this.active_index++;
      } else {
        this.active_index = 0;
      }

    },
    moveCursor(e){
       this.xParent = e.clientX;
       this.yParent = e.clientY;
    },
    touchHandler(){
      this.generateColors();
      this.moveAlong();
    },
    swipeHandler(){
       this.generateColors();
       this.moveAlong();
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

#svg-pointer{
  top: -100px;
  left: -100px;
  position: absolute;

  .svg-point{
    fill: var(--font-color);
  }
}




</style>