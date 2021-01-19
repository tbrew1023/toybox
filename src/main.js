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
                  store.commit('pushNotification', { 
                    context: 'Export Status', 
                    message: 'Database was successfully exported!',
                    background: 'rgba(#DDE4ED,0.1)', 
                    action: {
                      name: 'View Exports',
                      fn: () => {
                        console.log('routing to exports page...');
                        store.commit('modalContext', 'Exports');
                      }
                    }
                  });
                  store.commit('modalContext', 'Notifications');
                }
              )
            })
            
          } catch (err) {
            console.error(err);
              store.commit('pushNotification', { 
                context: 'Export Status', 
                message: 'Database failed to export :(',
                background: 'rgba(255,0,0,0.1)',
              });
              store.commit('modalContext', 'Notifications');
          }

      });
    },
    addStudent(newStudent) {
      firebase.firestore().collection('testData').add(newStudent).then(() => {
        store.commit('pushNotification', {
          context: 'Student Add',
          message: 'Successfully added ' + newStudent.name + ' to database!',
          background: 'rgba(0,255,0,0.1)',
          action: {
            name: 'View',
            fn: () => {
              console.log('back to dashboard');
            }
          }
        });
        console.log('added new student successfully');
        store.commit('modalContext', 'Notifications');
      });
    },
    removeStudent(student) {
      firebase.firestore().collection('testData').where('email', '==', student).get().then((docs) => {
        docs.forEach((doc) => {
          doc.ref.delete().then(() => {
            alert(student + ' was removed from the database');
            store.commit('pushNotification', {
              context: 'Student Removal',
              message: 'Successfully deleted ' + student + ' from database',
              backgorund: 'rgba(0,255,0,0.1)',
            });
          });
        });
      });
    },
    updateStudent(student, newData) {
      console.log('updating student');
      firebase.firestore().collection('testData').where('email','==',student).get().then((docs) => {
        docs.forEach((doc) => {
          doc.ref.update({
            scores: firebase.firestore.FieldValue.arrayUnion(newData) 
          });
        });
        
      });
    }
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
