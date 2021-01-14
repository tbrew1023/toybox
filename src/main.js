import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFullPage from 'vue-fullpage.js'

Vue.config.productionTip = false

Vue.use(VueFullPage);

/*Vue.mixin({
  methods: {
    fireFetch(collection, query, then) {
      if(query != null) { //query fetch
          var splitQuery = query.split(' ');
          firebase
          .firestore()
          .collection(collection)
          .where(splitQuery[0], splitQuery[1], eval("this." + splitQuery[2].substring(1,splitQuery[2].length)))
          .get().then((docs) => {
              then(docs);
          });
      } else { //fetch all
          firebase
          .firestore()
          .collection(collection)
          .get().then((doc) => {
              then(doc);
          });
      }
    },
  }
})*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
