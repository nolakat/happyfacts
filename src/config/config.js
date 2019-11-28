 /* eslint-disable */

 // run node config.js to update firebase db

const facts = require ('./facts');
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
   apiKey: process.env.FIREBASE_API,
   authDomain: "happyfacts-io.firebaseapp.com",
   databaseURL: "https://happyfacts-io.firebaseio.com",
   projectId: "happyfacts-io",
   storageBucket: "happyfacts-io.appspot.com",
   messagingSenderId: "1004978812791",
   appId: process.env.FIREBASE_APP_ID,
   measurementId: "G-6JG4XHN9CG"
 })

var db = firebase.firestore();

facts.forEach(function(obj, index) {
   db.collection("facts").add({
       fact: obj.fact,
       source: obj.source
   }).then(function(docRef) {
       console.log("Document written with ID: ", docRef.id);
   })
   .catch(function(error) {
       console.error("Error adding document: ", error);
   });
});


