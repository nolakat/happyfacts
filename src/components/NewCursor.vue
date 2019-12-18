<template>
      <transition name="fade">
        <div
        v-if="hover == 'circle'"
        >
          <svg
            id="svg-pointer"
            class="svg-circle"
            >
          <circle class="svg-point" cx="100" cy="100" r="3" stroke-width=".5" />
          </svg>
        </div>
        <div
        v-else-if="hover == 'arrow_left'"
        >
        <svg
            id="svg-pointer"
            class="svg-arrow svg-arrow--left"
            width="100px"
            x="0px" y="0px" viewBox="0 0 100 80" style="enable-background:new 0 0 100 80;">
            <polygon class="arrow" points="60.4,8.7 53.1,16.1 71.8,34.8 8.2,34.8 8.2,45.2 71.8,45.2 53.1,63.9 60.4,71.3 91.8,40 "/>
        </svg>
        </div>
        <div
          v-else-if="hover == 'arrow_right'"
        >
        <svg
          id="svg-pointer"
          class="svg-arrow svg-arrow--right"
          width="100px"
          x="0px" y="0px" viewBox="0 0 100 80" style="enable-background:new 0 0 100 80;">
            <polygon class="arrow" points="39.6,8.7 46.9,16.1 28.2,34.8 91.8,34.8 91.8,45.2 28.2,45.2 46.9,63.9 39.6,71.3 8.2,40 "/>
        </svg>
        </div>
      </transition>
</template>
<script>
import gsap from "gsap";


export default{
    name: 'NewCursor',
    props: ['hover'],
    mounted(){
        document.body.addEventListener("mousemove", e =>{
            this.moveCursor(e);
        });

    },
    methods: {

        moveCursor(e){
            gsap.to("#svg-pointer",
            {
                x: e.clientX,
                y: e.clientY,
                duration: 2,
                ease: "elastic.out(1, 0.3)"
            });
        },

    }
}
</script>

<style lang="scss">



.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.svg-text{
  stroke:#000000;
  stroke-width:0.75;
  font-size:9px;
  stroke: var(--font-color);
}

.svg-circle{
  top: -100px;
  left: -100px;
  position: absolute;

  .svg-point{
    fill: var(--font-color);
  }
}

.svg-test{
  top: -100px;
  left: -100px;
  position: absolute;
  width: 200px;
}

.arrow{
  fill: transparent;
  stroke: var(--font-color);
  stroke-width:2;
  stroke-linejoin: round;
  stroke-miterlimit:10;
  }

.svg-arrow{
    top: -40px;
    left: 0px;
    position: absolute;

    &.svg-arrow--left{
      left: -100px;
    }
}

.svg-dot{
      fill: var(--font-color);
}
	.svg_transparent_bg{fill:none;}

	.polkadots{fill:url(#New_Pattern);stroke:url(#New_Pattern);stroke-miterlimit:10;  transition: all .3s ease}

  .st2{fill: var(--font-color); stroke: var(--bg-color); stroke-width: 1px; transition: all .3s ease}

#test{
  fill: 2px solid cyan;
}
</style>
