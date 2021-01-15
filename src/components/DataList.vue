<script>
//import firebase from 'firebase';

export default {
  name: 'DataList',
  props: {
    title: {
      type: String,
      default: 'List Title'
    },
    test: {
      type: Boolean,
      default: false
    },
    expandable: {
      type: Boolean,
      default: false
    },
    data: Array,
    columnTitles: Array,
    columnKeys: Array
  },
  data() {
    return {
      droppable: [],
      items: [],
      search: '',
      activeDrop: null,
      lastDropped: null
    }
  },
  mounted() {
    console.log('DataList.vue mounted');
  },
  computed: {
    filteredItems() {
      return this.data.filter((item) => {
        return item.name.toLowerCase().match(this.search.toLowerCase()); //when search matches description, expand that item
      });
    }
  },
  methods: {
    handleAdd() {
      this.$emit('addToList');
    },
    handleExport() {
      this.$emit('exportList');
    },
    dropdown(event) {
      console.clear();
      var currentDroppable = event.currentTarget.querySelector('.droppable');
      !this.lastDropped || currentDroppable.classList.contains('dropped') ? console.log('hang time') : this.lastDropped.classList.remove('dropped');
      console.log(currentDroppable);
      currentDroppable.classList.contains('dropped') ? currentDroppable.classList.remove('dropped') : currentDroppable.classList.add('dropped');
      this.lastDropped = currentDroppable;
      this.$forceUpdate();
    },
    collapseLast() {
      !this.lastDropped ? console.log('nothing to collapse') : this.lastDropped.classList.remove('dropped');
    }
  }
}
</script>

<template>
  <div class="datalist-container">
    <div class="list-head-container">
      <div class="head-left"><h1>{{ title }}</h1><div class="add-button" @click="handleAdd"><div class="add-icon"></div>Add</div></div>
      <div class="head-right">
        <div class="search-container">
          <input @click="collapseLast" v-model="search"  placeholder="Search by name" type="text" name="search" id="search"/>
          <div class="search-icon"></div>
        </div>
        <div class="filter-button"><div class="order-icon"></div>Search Options</div>
        <div @click="handleExport" class="export-button"><div class="export-icon"></div>Export</div>
      </div>
    </div>

    <div class="list-top" :style="(!filteredItems.length == 0  ? 'opacity: 1' : 'opacity: 0' )">
      <div v-for="(column, index) in columnTitles" :key="index" class="col"><span>{{ column }}</span></div>
    </div>

    <div class="list-contents-container">
      <div v-if="filteredItems.length == 0" class="no-results"><h4>No Results</h4></div>
      <div class="services-container">
        <div class="services-container-right">
          <ul>
            <li 
            class="list-item"
            :style="'background:'+( index1 % 2 == 0 ? '#f6f6f6' : '#ffffff' )"
            v-for="(i, index1) in filteredItems" 
            v-bind:key="index1" 
            :id="'item'+index1" @click="dropdown" 
            :class="(index1 != 0 ? '' : 'first-service')">
              <div class="inner-columns-container">
                <div v-for="(colKey, index2) in columnKeys" :key="index2" class="key-col"><span>{{ filteredItems[index1][colKey] }}</span></div>
              </div>
              <div>
                <div class="droppable">
                  hi. {{ filteredItems[index1].description }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.inner-columns-container {
  display: flex;
  width: 100%;
  height: inherit;
  //background: rgba(0,0,0,0.2);
  //padding-left: 4px;
}

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

.key-col {
  //border: 1px black solid;
  width: 100%;
  height: inherit;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 24px 0px 24px 0px;
  color: black;

  span {
    margin-left: 24px;
    font-size: 12px;
    opacity: 1;
  }
}

.col {
  //border: 1px black solid;
  width: 100%;
  height: inherit;
  display: flex;
  justify-content: left;
  align-items: center;

  span {
    margin-left: 24px;
    font-size: 12px;
    text-transform: uppercase;
    opacity: 0.4;
  }
}

.list-top {
  background: white;
  width: 100%;
  height: 63px;
  margin-top: 24px;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  align-items: center;
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
      //font-weight: bold;

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
      height: 2px !important;
      background: black;
      color: black !important;
      //margin-top: 24px;
      transition: 300ms;
      pointer-events: none;
      opacity: 0;
    }

    .dropped {
      background: pink;
      height: 100px !important;
      pointer-events: none;
      transition: 300ms;
      //background: green;
      //padding-top: 24px;

      .bubble-items {
        transition-delay: 100ms;
        //background: pink;
        opacity: 1;
      }
    }
    
    li {
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
        //font-weight: bold;
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
