
<template>
  <div id="app"
       v-touch:swipe.top="swipeHandler"
       v-touch:swipe.bottom="swipeHandler"
       :style="cssProps">
    <div id="happy__window"
      :style="[baseStyle]">
      <svg
        id="svg-pointer"
        v-if="hover == 'circle'"
        class="svg-circle"
        :style="cursorCircle">
          <circle class="svg-point" cx="100" cy="100" r="3" stroke-width=".5" />
      </svg>
      <svg
        id="svg-pointer"
        v-else-if="hover == 'arrow_right'"
        class="svg-arrow"
        :style="cursorCircle"
        version="1.1" width="200px" x="0px" y="0px" viewBox="0 0 58.6 52.6" xml:space="preserve">
        <g transform="translate(0,-952.36218)">
          <path d="M0,978.6l2.8,3.3l20,23l7.5-6.6l-12.8-14.7h41.1v-10H17.6l12.8-14.7l-7.5-6.6l-20,23L0,978.6L0,978.6z"/>
        </g>
      </svg>
      <svg
        id="svg-pointer"
        v-else-if="hover == 'arrow_left'"
        class="svg-arrow svg-arrow--left"
        version="1.1" width="200px" x="0px" y="0px" viewBox="0 0 58.6 52.6"
        style="enable-background:new 0 0 58.6 52.6;" xml:space="preserve">
      <g transform="translate(0,-952.36218)">
        <path d="M58.6,978.6l-2.8-3.3l-20-23l-7.5,6.6l12.8,14.7H0l0,10h41.1l-12.8,14.7l7.5,6.6l20-23L58.6,978.6L58.6,978.6z"/>
      </g>
      </svg>


        <div
          v-touch:tap="touchHandler"
           @mouseover="hover = 'arrow_right'"
           @mouseleave="hover = 'circle'"
          class="touchbar touchbar--left"></div>

          <Loading v-if="isLoading" />
          <HappyFact
            v-else
            :activeFact="facts[active_index]"
            />

        <div
          v-touch:tap="touchHandler"
          @mouseover="hover = 'arrow_left'"
          @mouseleave="hover = 'circle'"
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
      hover: 'circle'
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
                color: `${this.color_block[1]}`,
                transition: `all .3s ease`
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
      //  this.xParent = e.clientX;
      //  this.yParent = e.clientY;
      gsap.to("#svg-pointer",
      {
        x: e.clientX,
        y: e.clientY,
        duration: 2,
        ease: "elastic.out(1, 0.3)"  });
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
  z-index: 1;

  &.touchbar--left{
    left: 0px;
  }

  &.touchbar--right{
    right: 0px;
  }
}

.svg-circle{
  top: -100px;
  left: -100px;
  position: absolute;

  .svg-point{
    fill: var(--font-color);
  }
}

.svg-arrow{
    top: -95px;
    left: 0px;
    position: absolute;
    fill: var(--font-color);

    &.svg-arrow--left{
      left: -200px;
    }
}




</style>