
<template>
  <div id="app"
       v-touch:swipe.top="swipeHandler"
       v-touch:swipe.bottom="swipeHandler"
       :style="cssProps">
    <div id="happy__window"
      :style="[baseStyle]">
      <NewCursor :hover="hover"/>
        <div
          v-touch:tap="touchHandler"
           @mouseover="hover = 'arrow_right'"
           @mouseleave="hover = 'circle'"
          class="touchbar touchbar--left"></div>

          <Loading v-if="isLoading" />
          <div v-else class="happy-fact__container">
              <div class="happy-fact__inner">
                  <h5 class="happy-fact__label">HAPPY FACT #{{activeFact.id}}</h5>
                  <h1 class="happy-fact__content">{{activeFact.fact}}</h1>
                  <h5
                    class="happy-fact__source"
                    @mouseover="hover = 'pointer'"
                    @mouseleave="hover = 'circle'"><a :href="activeFact.source" target="_blank">Source</a>
                    <svg
                      id="testhand"
                      class="svg-hand"
                      :style="rotateProps"
                      width= "50px"
                      x="0px" y="0px"
                      viewBox="0 0 24 30">
                          <path d="M21,30H9c-0.6,0-1-0.4-1-1c0-1.5-0.7-2.4-1.8-3.8c-0.6-0.7-1.3-1.6-2-2.7c-1.9-3-3.5-6.5-3.9-7.9
                            c-0.4-1.3-0.1-2.2,0.2-2.7C0.9,11.3,1.6,11,2.5,11c1.2,0,2.4,1,3.5,2.3V3c0-1.7,1.3-3,3-3s3,1.3,3,3v4.2C12.3,7.1,12.6,7,13,7
                            c1.1,0,2,0.6,2.5,1.4C16,8.1,16.5,8,17,8c1.4,0,2.5,0.9,2.9,2.2c0.3-0.1,0.7-0.2,1.1-0.2c1.7,0,3,1.3,3,3v3c0,2.6-0.5,4.7-1,6.7
                            c-0.5,2-1,3.9-1,6.3C22,29.6,21.5,30,21,30L21,30z M9.9,28H20c0.1-2.2,0.6-4,1-5.8c0.5-2,1-3.9,1-6.2v-3.2c0-0.6-0.4-1-1-1
                            s-1,0.4-1,1V14c0,0.6-0.4,1-1,1s-1-0.4-1-1v-3.2c0-0.6-0.4-1-1-1s-1,0.4-1,1V13c0,0.6-0.4,1-1,1s-1-0.4-1-1V9.8c0-0.6-0.4-1-1-1
                            s-1,0.4-1,1V12c0,0.6-0.4,1-1,1s-1-0.4-1-1V2.8c0-0.6-0.4-1-1-1s-1,0.4-1,1V18c0,0.6-0.4,1-1,1s-1-0.4-1-1v-0.8
                            c-0.9-2.3-2.8-4.3-3.5-4.3c-0.2,0-0.4,0.1-0.5,0.2C2,13.3,1.9,13.6,2,14c0.3,1.1,1.8,4.3,3.8,7.5c0.6,1,1.2,1.7,1.8,2.5
                            C8.7,25.2,9.6,26.3,9.9,28L9.9,28z"/>
                    </svg>
                    </h5>
              </div>
          </div>

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
import NewCursor from './components/NewCursor.vue';
import db from './db';
import { colorPairs } from './config/colors';
import { shuffle } from 'lodash';
import {Renderer, Transform, Vec3, Color, Polyline} from 'ogl';



export default {
  name: 'app',
  components: {
    HappyFact,
    Loading,
    NewCursor
  },
  data: function(){
    return{
      isLoading: true,
      color_block: '',
      facts: [],
      active_index: 0,
      hover: 'circle',
      degree: 0
    }
  },
  computed:{
    randomGenerator: function(){
      return Math.round(Math.random());
    },
    cssProps: function(){
      return{
        '--font-color': this.color_block[1],
        '--bg-color': this.color_block[0]
      }
    },
    baseStyle: function(){
       return {
                background: `${this.color_block[0]}`,
                color: `${this.color_block[1]}`,
                transition: `all .3s ease`
              }
    },
    rotateProps: function(){
      return{
        transform: `rotate(${this.degree}deg)`
      }
    },
    activeFact: function(){
      return this.facts[this.active_index];
    }
  },
  created(){
    this.generateColors();
    this.fetchFacts();
  },
  mounted(){
    document.body.addEventListener("mousemove", e =>{
      let pw = document.getElementById('testhand');
            this.rotateOnMouse(e, pw );
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
    touchHandler(){
      this.generateColors();
      this.moveAlong();
    },
    swipeHandler(){
       this.generateColors();
       this.moveAlong();
    },
    rotateOnMouse(e, pw) {

      console.log('rotate on Mouse')
      var offset = pw.getBoundingClientRect();
      var center_x = (offset.left) + (pw.clientWidth / 2);
      var center_y = (offset.top) + (pw.clientHeight / 2);
      var mouse_x = e.pageX;
      var mouse_y = e.pageY;
      var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
      var degree = (radians * (180 / Math.PI) * -1) + 100;
      this.degree=  degree;
      window.console.log("de="+degree+","+radians);
      // $(pw).css('-moz-transform', 'rotate(' + degree + 'deg)');
      // $(pw).css('-webkit-transform', 'rotate(' + degree + 'deg)');
      // $(pw).css('-o-transform', 'rotate(' + degree + 'deg)');
      // $(pw).css('-ms-transform', 'rotate(' + degree + 'deg)');
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
  overflow:hidden;
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

.happy-fact__container{
    padding: 2em;
    max-width: 75vw;
    z-index: 2;
}

.happy-fact__label{
    letter-spacing: .5px;
    padding-bottom: 1px;
    border-bottom: 1px solid;
    border-color: inherit;
    width: fit-content;
    display: table;
    margin: 0 auto;
}

.happy-fact__content{
    font-size: 2.5em;
    padding: 35px 0px;

}

.happy-fact__source{
    text-transform: uppercase;
    display: flex;
    opacity: .75;
    justify-content: flex-end;
    transition: opacity .3s ease;
    position: relative;
    width: fit-content;
    float: right;
    padding: 25px;


    &:hover{
        opacity: 1;
        transition: opacity .3s ease;
    }
}

.svg-hand{
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 31px;
  // transform: rotate(291deg);
  transform-origin: top;
  opacity: 0;
}
</style>