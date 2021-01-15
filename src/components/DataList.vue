<template>
  <div class="datalist-container">
    <div class="list-head-container">
      <div class="head-left"><h1>Students</h1><div class="add-button"><div class="add-icon"></div>Add</div></div>
      <div class="head-right">
        <div class="search-container">
          <input @click="collapseLast" v-model="search"  placeholder="Search by name" type="text" name="search" id="search"/>
          <div class="search-icon"></div>
        </div>
        <div class="filter-button"><div class="order-icon"></div>Search Options</div>
        <div class="export-button"><div class="export-icon"></div>Export</div>
      </div>
    </div>

    <div class="list-top" :style="(!filteredItems.length == 0  ? 'opacity: 1' : 'opacity: 0' )">

    </div>

    <div class="list-contents-container">
      <div v-if="filteredItems.length == 0" class="no-results"><h4>No Results</h4></div>
      <div class="services-container">
        <div class="services-container-right">
          <ul>
            <li 
            class="list-item"
            :style="'background:'+( index % 2 == 0 ? '#f6f6f6' : '#ffffff' )"
            v-for="(i, index) in filteredItems" 
            v-bind:key="index" 
            :id="'item'+index" @click="dropdown(index)" 
            :class="(index != 0 ? '' : 'first-service')">
              <span><strong style='opacity: 0.4; color: green'>{{ i.age }}</strong>{{ i.name }}<b :class="( droppable[index] == true ? 'right' : 'up' )"></b></span>
              <div 
              :class="( 
                droppable[index] == true ? 
                'droppable dropped' : 
                'droppable collapsed' 
                )">
                <div class="bubble-items">
                      <strong>{{ i.type }}</strong>
                      <p>{{ i.description }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import firebase from 'firebase';

export default {
  name: 'DataList',
  props: {
    test: {
      type: Boolean,
      default: false,
    },
    expandable: {
      type: Boolean,
      default: false
    },
    data: Array,
    columns: Array
  },
  data() {
    return {
      droppable: [],
      items: [],
      search: '',
      activeDrop: null
    }
  },
  mounted() {
    
  },
  computed: {
    filteredItems() {
      return this.data.filter((item) => {
        return item.name.toLowerCase().match(this.search.toLowerCase()); //when search matches description, expand that item
      });
    }
  },
  methods: {
    dropdown(context) {
      console.log('dropping down panel ' + context);
      for(let i = 0; i < this.droppable.length; i++) {
        this.droppable[i] = ( i != context ? false : ( this.droppable[i] == true ? false : true ));
      }
      this.activeDrop = context;
      console.log(this.droppable);
    },
    collapseLast() {
      this.droppable[this.activeDrop] = false;
    },
  }
}
</script>

<style scoped lang="scss">

.add-icon {
  //background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../assets/icons/blue-plus.svg");
  height: 24px;
  width: 24px;
  //margin-left: -36px;
}

.search-icon {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("https://raw.githubusercontent.com/tbrew1023/icommon/c5bf1076cb9bf0a5f060b81624b53f01b4953a71/search.svg");
  opacity: 0.2;
  height: 24px;
  width: 24px;
  margin-left: -36px;
}

.head-left {
  display: flex;
  align-items: center;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 12px;
  }
}

.head-right {
  display: flex;
}

.list-head-container {
  height: 36px;
  //background: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-contents-container {
  height: 300px;
  overflow: auto;
  border-radius: 0px 0px 8px 8px;
}

.list-top {
  background: white;
  width: 100%;
  height: 63px;
  margin-top: 24px;
  border-radius: 8px 8px 0px 0px;
}

.no-results {
  margin-top: 24px;
  font-size: 14px;
}

.search-container {
  display: flex;
  background: transparent;
  //border-radius: 12px;
  width: auto;
  //background: green;
  align-items: center;
  justify-content: center;
  margin-right: 24px;

  #search {
    width: 300px;
    border: none;
    padding: 12px 0px 12px 24px;
    text-align: left;
    border-radius: 8px;
    font-size: 14px;
    
    &:focus {
      outline: none;
    }
  }
}

.add-button {
  width: 72px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.export-button {
  background: rgba(70,113,177,0.3) !important;
  width: 96px !important;
  margin-right: 0px !important;
}

.filter-button, .export-button, .add-button {
  font-weight: bold;
  background: white;
  border-radius: 8px;
  height: 36px;
  width: 160px;
  padding: 3px 6px;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 200ms;
  cursor: pointer;
  color: black;
  margin-left: 12px;
  font-size: 12px;
  color: #4671B1;

  .export-icon {
    background-image: url('../assets/icons/blue-export.svg');
    background-position: center;
    background-size: 80%;
    background-repeat: no-repeat;
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }

  .order-icon {
    background-image: url('../assets/icons/blue-filter.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }

  &:hover {
    transform: scale(0.95);
  }
}

.list-item {
  display: block !important;
  background: #f9f9f9;
  margin: 0px;
}

#item1 {
  border: none !important;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  //display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.datalist-container {
  width: 1200px;
  height: max-content;
}

.services-container {
  background: white;
  height: max-content;
  margin-top: 0px;
  margin-bottom: 0px !important;
  display: flex;
  border-radius: 0px 0px 8px 8px;
  padding: 0px;

  .service-icon {
    //background: black;
    //opacity: 0.2;
    display: none;
    height: 32px;
    width: 32px;
    margin-right: 24px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .bubble-items {
    text-align: center;
    width: 100%;
    margin-left: 0px;
    //padding-top: 36px;
    transition: 300ms;
    color: #bbb;

    span {
      margin-right: 4px;
      color: black;
      background: #eee;
      padding: 4px 8px;
      line-height: 1;
      font-size: 12px;
      border-radius: 8px;
      display:inline-block;
      margin-bottom: 6px;
      font-weight: bold;

      span {
        padding: 0px;
        margin: 0px;
        color: transparent;
      }
    }
  }

  ul {
    margin: 0px;
    padding: 0px;
    list-style: none;

    .droppable {
      width: 100%;
      height: 0px;
      //background: black;
      color: black !important;
      margin-top: 24px;
      transition: 300ms;
      pointer-events: none;
    }

    .dropped {
      //background: pink;
      height: 200px;
      pointer-events: none;
      //background: green;
      //padding-top: 24px;

      .bubble-items {
        transition-delay: 100ms;
        //background: pink;
        opacity: 1;
      }
    }

    .collapsed {
      //background: gray;
      height: 0px;
      //opacity: 0%;
      pointer-events: none;
      //padding-top: 1px;
      
      .bubble-items {
        //background: red;
        opacity: 0;
        transition: 100ms;
      }
    }
    
    li {
      padding: 24px 0px 1px 24px;
      //border: 1px solid black;
      cursor: pointer;
      //border-top: 1px #e0e0e0 solid;
      //display: flex;
      //justify-content: center;
      //align-items: center;

      span {
        //color: red;
        font-size: 14px;
        //text-transform: uppercase;
        font-weight: bold;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 100ms;

        b {
          margin-right: 24px;
          height: 12px;
          width: 12px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          //background-image: url('https://github.com/tbrew1023/icommon/blob/master/arrow-down.png?raw=true');
        }
      }

      &:hover {
        span {
          b {
            color: black !important;
          }
        }
      }
    }
  }

  .service-par {
    font-size: 14px;
  }

  h1 {
    font-size: 52px;
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  p {
    width: 85%;
  }

  .services-container-left {
    //background: red;
    width: 800px;
  }

  .services-container-right {
    //background: orange;
    width: 100%;
  }
}

.right {
  transform: rotate(180deg);
  transition: 300ms;
}

.up {
  transform: rotate(0deg);
  transition: 300ms;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  //box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
  background: #f6f6f6;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #e0e0e0; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  //background: #gray; 
}
</style>
