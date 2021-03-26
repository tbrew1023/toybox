<script>// @ts-nocheck
import CircleProgress from '@/components/CircleProgress.vue'
import DataList from '@/components/DataList.vue'
import Banner from '@/components/Banner.vue'
import Modal from '@/components/Modal.vue'

import firebase from 'firebase'

export default {
  name: 'Home',
  components: {
    CircleProgress,
    DataList,
    Banner,
    Modal
  },
  data() {
    return {
      options: {
        normalScrollElements: '.datalist-container, .modal-content-container',
        scrollingSpeed: 600,
        navigation: true,
        fadingEffect: true,
        navigationPosition: 'left',
        navigationTooltips: ['CircleProgress.vue','DataList.vue','Modal.vue', 'Banner.vue'],
        showActiveTooltip: true,
        anchors: ['circleprogress','datalist', 'modal','banner', 'slider'],
        onLeave: (origin, destination, direction) => {
          this.handleLeave(origin, destination, direction);
        },
        onSlideLeave: (origin, destination, direction) => {
          this.handleSlideLeave(origin, destination, direction);
        }
      },
      testData: [
        {
          name: 'Trent Brew',
          email: 'tbrew1023@gmail.com',
          company: 'LT Design Lab',
          skill: 'Web Development',
          age: 23,
          description: 'Web Developer living in Chicago'
        },
        {
          name: 'Lawan Alade-Fa',
          email: 'slafa@ltdesign.io',
          company: 'Studio LAFA',
          skill: 'Design',
          age: 23,
          description: 'Architect attending Northwestern'
        },
        {
          name: 'Eric Li',
          email: 'ezli@protonmail.com',
          company: 'Coinflip',
          skill: 'Graphic Design',
          age: 23,
          description: 'Graphic Designer living in Chicago'
        },
        {
          name: 'Tim Chatman',
          email: 'tchatman@ltdesign.io',
          company: 'LT Design Lab',
          skill: 'Data Science',
          age: 24,
          description: 'Data scientist attending DePaul'
        },
                {
          name: 'Lauren Brew',
          email: 'lbrew@gmail.com',
          company: 'froSkate',
          skill: 'Copyediting',
          age: 22,
          description: 'Skater, writer, activist'
        },
        {
          name: 'Candice Brew',
          email: 'candicebrew@gmail.com',
          company: 'FACTORY PR',
          skill: 'PR',
          age: 26,
          description: 'Branding genius living in New York'
        },
        {
          name: 'Virginia Brew',
          email: 'vbrew@gmail.com',
          company: 'LoanDepot',
          skill: 'Mortgage',
          age: 47,
          description: 'Me mama<3'
        },
        {
          name: 'Derrick Brew',
          email: 'dbrew@gmail.com',
          company: 'LoanDepot',
          skill: 'Mortgage',
          age: 47,
          description: 'Me papa<3'
        },
        {
          name: 'Manman',
          email: 'manman@gmail.com',
          company: 'dbjrFoundation',
          skill: 'People',
          age: 24,
          description: 'Love you manman'
        },
        {
          name: 'Jon Josko',
          email: 'jonj@gmail.com',
          company: 'Illinois Policy Institute',
          skill: 'Data Science',
          age: 24,
          description: 'Mario main'
        }
      ],
      items: [],
      triggerUp: false,
      triggerDown: false,
      fix: false,
      activeSection: 0,
      activeSlide: 1,
      scrollOverflow: false,
      context: 0,
      datetime: null,
      value: 0
    }
  },
  props: {
    dataRef: Object
  },
  created() {

  },
  mounted() {
    this.setDate();
    this.fetchData();
    console.log(this.items);
  },
  computed: {
    
  },
  methods: {
    setDate() {
      var today = new Date();
      var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      var lastOfDay = dd.substring(dd.length-1,dd.length);
      var secondLastOfDay = dd.substring(dd.length-2,dd.length-1);
      today = months[parseInt(mm) - 1] + ' ' + dd + ( lastOfDay == 1 && secondLastOfDay != 1 ? 'st' : ( lastOfDay == 2 && secondLastOfDay != 1 ? 'nd' : ( lastOfDay == 3 && secondLastOfDay != 1 ? 'rd' : 'th' ) ) ) + ', ' + yyyy;

      this.datetime = today;
    },
    handleAdd() {
      alert('handling data add from parent...');
    },
    handleExport() {
      alert('handling data export from parent...');
    },
    async fetchData() {
      await firebase.firestore().collection('testData').orderBy('name').get().then((docs) => {
        docs.forEach((doc) => {
          this.items.push(doc.data());
        });
      });
    },
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

    <div class="bottom-actions"><div class="nav-button"></div></div>

    <!-- main (fullpage.js; TODO: Configuure locomotive scroll) -->
    <full-page ref="fullpage" :options="options" id="fullpage">
      
      <section class="section">
        <div class="page-container">
            <CircleProgress
              :title="'New Title'"
              :percentage="84" 
              :progressColor="'#4671B1'"
              :ringColor="'rgba(0,0,0,0.05)'" 
              :strokeWidth="8"
            />  
        </div>
      </section>

      <section class="section">
        <div class="page-container">
          <DataList 
          :title="'Students'" 
          :test="true" 
          :expandable="true"
          :graphable="true"
          :data="items" 
          :columnTitles="['NAME','EMAIL','COMPANY','SKILL','AGE']"
          :columnKeys="['name','email','company','skill', 'age']"
          @addToList="handleAdd()"
          @exportList="handleExport()"
           />
        </div>
      </section>

      <section class="section">
        <div class="page-container">
          <Modal />
        </div>
      </section>

      <section class="section">
          <div class="page-container">
            <Banner 
            :title="'Welcome!'"
            :subtitle="'Today is ' + datetime"
            :backgroundImage="'https://github.com/tbrew1023/icommon/blob/master/images/banner.png?raw=true'"
            :primaryColor="'#4671B1'"
            />
          </div>        
      </section>

      <!--section class="section">
          <div class="page-container">
            <div class="barchart-container"><BarChart /></div>
          </div>        
      </section>

      <section class="section">
          <div class="page-container">
            <div class="barchart-container">
              <Vid />
            </div>
          </div>        
      </section-->

      <!--section class="section">
        <div class="page-container">
          <vue-slider id="vue-slider" v-model="value" />
          <p>Slider</p>
        </div>
      </section-->

    </full-page>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/global';

.vue-slider {
  width: 400px !important;
}

.barchart-container {
  width: 700px;
}

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

.litemode {
  background-image: url("https://raw.githubusercontent.com/tbrew1023/icommon/c5bf1076cb9bf0a5f060b81624b53f01b4953a71/lightmode.svg");
}

.nitemode {
  background-image: url("https://github.com/tbrew1023/icommon/blob/master/darkmode.svg");
}

.bottom-actions {
  position: absolute;
  top: 0px;
  z-index: -1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  //background: gray;
  color: white;
  height: 140px;
  width: 100vw;

  .nav-button {
    background-image: url("https://raw.githubusercontent.com/tbrew1023/icommon/c5bf1076cb9bf0a5f060b81624b53f01b4953a71/darkmode.svg");
    background-size: 90%;
    background-position: center;
    justify-content: center;
    background-repeat: no-repeat;
    height: 48px;
    width: 48px;
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