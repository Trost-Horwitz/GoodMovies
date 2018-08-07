import firebase from 'firebase'


const config = {
  apiKey: `${process.env.REACT_APP_FIREBASEKEY}`,
  authDomain: "movieproject-8dbd4.firebaseapp.com",
  databaseURL: "https://movieproject-8dbd4.firebaseio.com",
  projectId: "movieproject-8dbd4",
  storageBucket: "movieproject-8dbd4.appspot.com",
  messagingSenderId: "720195867549"
};

if (!firebase.apps.length){
  firebase.initializeApp(config);
}
export default firebase;
