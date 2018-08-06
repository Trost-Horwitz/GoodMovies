import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBJAqsWgZzQxcPxFgGSx-URVdANpf6mWMw",
  authDomain: "movieproject-8dbd4.firebaseapp.com",
  databaseURL: "https://movieproject-8dbd4.firebaseio.com",
  projectId: "movieproject-8dbd4",
  storageBucket: "",
  messagingSenderId: "720195867549"
};

firebase.intializeApp(config);
export default firebase;
