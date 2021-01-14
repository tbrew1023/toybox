<script>// @ts-nocheck

//import firebase from 'firebase';
import CircleProgress from '@/components/CircleProgress.vue'

export default {
  name: 'Home',
  components: {
    CircleProgress
  },
  data() {
    return {
      name: null,
      waveOffset: "120vw",
      waveLeft: true,
      options: {
        scrollingSpeed: 600,
        navigation: true,
        fadingEffect: true,
        navigationPosition: 'left',
        navigationTooltips: ['CircleProgress.vue','DataList.vue', 'TopNav.vue', 'Banner.vue','Modal.vue'],
        showActiveTooltip: true,
        anchors: ['circleprogress','datalist', 'topnav', 'banner','modal'],
        onLeave: (origin, destination, direction) => {
          this.handleLeave(origin, destination, direction);
        },
        onSlideLeave: (origin, destination, direction) => {
          this.handleSlideLeave(origin, destination, direction);
        }
      },
      triggerUp: false,
      triggerDown: false,
      fix: false,
      activeSection: 0,
      activeSlide: 1,
      hover: false,
      currentExtra: '',
      currentPreview: '',
      currentProjectText: '',
      currentProjectTitle: '',
      scrollOverflow: false,
      context: 0,
    }
  },
  props: {
    dataRef: Object
  },
  created() {

  },
  mounted() {
    this.hideNav = false; //hide nav on landing page?
  },
  methods: {
    handleLeave(origin, destination, direction) {
      console.log('origin: ', origin);
      console.log('destination: ', destination);
      console.log('direction: ', direction);
  
      this.activeSection = destination.index;

      console.log('activeSection: ', this.activeSection);

      if(direction == 'up') {
        this.triggerUp = true;
        this.triggerDown = false;
        console.log('going up');
      }
      else {
        this.triggerDown = true;
        this.triggerUp = false;
        console.log('going down');
      }

      if(destination.index == 0) {
        console.log('on first slide');
      }
    },
  }
}
</script>

<template>
  <div class="home">

    <div class="backdrop-container">
      <!--canvas id="glscreen"></canvas-->
    </div>

    <div class="bottom-actions"><div class="nav-button">☽</div></div>

    <!-- main (fullpage.js; TODO: Configuure locomotive scroll) -->
    <full-page ref="fullpage" :options="options" id="fullpage">
      
      <!-- Section 2 -->
      <section class="section">
        <div class="page-container">
            <CircleProgress
            :title="'New Title'"
            :percentage="84" 
            :progressColor="'#3D65B8'"
            :ringColor="'rgba(0,0,0,0.05)'" 
            :strokeWidth="12"
          />  
        </div>
      </section>

      <!-- Section 3 -->
      <section class="section">
        <div class="page-container">
          <p>sample content 2</p>
        </div>
      </section>

      <!-- Section 4 -->
      <section class="section">
        <div class="page-container">
          <p>sample content 3</p>
        </div>
      </section>

      <!-- Section 5 w slides -->
      <section class="section">
          <div class="page-container">
            slide example 1
          </div>        
      </section>

      <!-- Section 6 -->
      <section style="background: pink" class="section">
        <div class="page-container">
          contact information
        </div>
      </section>

    </full-page>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/global';

.backdrop-container {
  background: #eee;
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0px;
  margin: 0px;
}

.page-container {
  height: 100vh;
  width: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black !important;
}

.bottom-actions {
  position: absolute;
  top: 0px;
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  //background: gray;
  color: white;
  height: 140px;
  width: 100vw;

  .nav-button {
    background: black;
    height: 40px;
    width: max-content;
    padding: 6px 20px;
    margin-right: 56px;
    line-height: 40px;
    border-radius: 60px;
    transition: $quick;
    cursor: pointer;
    font-size: 24px;

    &:hover {
      transform: $shrink;
    }
  }
}
</style>