import * as firebase from 'firebase'
require('@firebase/firestore')
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCKYFFed5bAryegvq4RaU4qrXABJPaGql4",
    authDomain: "panchbahidairy.firebaseapp.com",
    projectId: "panchbahidairy",
    storageBucket: "panchbahidairy.appspot.com",
    messagingSenderId: "762641807099",
    appId: "1:762641807099:web:4449980dc794a4f4cba25e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()