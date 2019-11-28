import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCzD7HMSlh0gM2TgzgBZYOdlcu2eipbVJU",
    authDomain: "happyfacts-io.firebaseapp.com",
    databaseURL: "https://happyfacts-io.firebaseio.com",
    projectId: "happyfacts-io",
    storageBucket: "happyfacts-io.appspot.com",
    messagingSenderId: "1004978812791",
    appId: "1:1004978812791:web:e1db709b87087b66065372",
    measurementId: "G-6JG4XHN9CG"
  }

  // Initialize Firebase
  const firebaseapp = firebase.initializeApp(firebaseConfig)

  export default firebaseapp.firestore()
