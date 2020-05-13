import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCJ2W_soQgAHWsLOCJcA9h_PRMueyfNJ7U",
    authDomain: "artist-b4f1d.firebaseapp.com",
    databaseURL: "https://artist-b4f1d.firebaseio.com",
    projectId: "artist-b4f1d",
    storageBucket: "artist-b4f1d.appspot.com",
    messagingSenderId: "418715877124",
    appId: "1:418715877124:web:25e0b46413d7ccf1489a51"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore()
  export const dbProductAdd = db.collection('productItems');