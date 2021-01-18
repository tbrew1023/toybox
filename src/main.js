import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFullPage from 'vue-fullpage.js'
import firebase from 'firebase'
import { firebaseConfig } from '../firebase-config.js'
const { Parser } = require('json2csv');

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

Vue.use(VueFullPage);

Vue.mixin({
  methods: {
    /*fireFetch(collection, query, then) {
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
    },*/
    exportDB(dbContext) {
      var jsonOutput = [];
      console.clear();
      console.log('exporting database...');
      store.commit('exporting');
      firebase.firestore().collection('testData').get().then((docs) => {

          docs.forEach((doc) => {
              jsonOutput.push(doc.data());
          });

          var fields = [];
          var opts = {};

          if(dbContext == 'skills_library') {
            fields = ['area', 'category', 'employee'];
            opts = { fields };
          } else if(dbContext == 'knowledge_management') {
            fields = ['area', 'category', 'designation', 'employeeName', 'subcategory'];
            opts = { fields };
          } else if(dbContext == 'client_knowledge') {
            fields = ['designation', 'employeeName', 'firm'];
            opts = { fields };
          } else if(dbContext == 'students') {
            fields = ['name','email','company','skill','average','scores'];
            opts = { fields };
          }

          //handle CSV parse

          try {
            console.log(opts);
            console.log(jsonOutput);
            var parser = new Parser(opts);
            var csv = parser.parse(jsonOutput);
            console.log(csv);

            var file = dbContext + '_' + Date.now();
            
            //grab current date

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            var creationDate = mm + '/' + dd + '/' + yyyy;

            //handle file upload

            console.log('handling CSV file upload...');

            const blob = new Blob([csv], {type : 'text/csv'});

            var task = firebase.storage().ref('CSV_data_exports/' + file + '.csv').put(blob);
            var percentage = 0;

            task.on('state_changed', function progress(snapshot) {
              //console.clear();
              percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(percentage + '%');
            }, function error(err) {
              console.error('There was a problem uploading the file:', err);
            }, function complete() {
              task.snapshot.ref.getDownloadURL().then(
                function(downloadURL) {
                  console.log('setting export data in db...');
                  firebase.firestore().collection('exports').add({
                    downloadUrl: downloadURL,
                    timestamp: Date.now(),
                    dateCreated: creationDate,
                    filename: (file + '.csv')
                  });
                  store.commit('exportComplete');
                  store.commit('exportURL', downloadURL);
                  alert('SUCCESS! File available at ' + downloadURL);
                  App.$forceUpdate();
                }
              )
            })
            
          } catch (err) {
            console.error(err);
          }

      });
    },
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
