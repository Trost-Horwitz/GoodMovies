

// import firebase from 'firebase'

// Firebase App is always required and must be first
import firebase from 'firebase'

// Add additional services that you want to use
// require("firebase/auth");
// require("firebase/database");
// require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");

// Comment out (or don't require) services that you don't want to use
// require("firebase/storage");

const config = {
  apiKey: "AIzaSyBJAqsWgZzQxcPxFgGSx-URVdANpf6mWMw",
  authDomain: "movieproject-8dbd4.firebaseapp.com",
  databaseURL: "https://movieproject-8dbd4.firebaseio.com",
  projectId: "movieproject-8dbd4",
  storageBucket: "",
  messagingSenderId: "720195867549"
};
if (!firebase.apps.length){
  firebase.initializeApp(config);
}
export default firebase;
