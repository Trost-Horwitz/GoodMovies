import firebase from '../firebase/firebase'

const firebaseFetch = {
  db: firebase.firestore(),

  //creates new user in DB with empty to_watch list
  createUser: function(name){
    return this.db.collection("users").doc(`${name}`).set({
      username:`${name}`,
      toWatch_list:[]
    }).catch(error=>console.error("Error creating new user in firebase:", error))
  },

  // returns array of objects containing user info
  getAllUsers: function(){
    return this.db.collection("users").get()
    .then(function(querySnapshot){
      let users = []
      querySnapshot.forEach(function(doc) {
        users.push({...doc.data(), id:doc.id})
      })
      return users
    })
  }

  // multiple selection

  // db.collection("users").where("username", "==", "secondUser").get().then(querySnapshot=>(querySnapshot.forEach(doc=>console.log(doc.data()))))


  // clears error about timestamp

  // const settings = {
  //   timestampsInSnapshots: true
  // }
  //
  // firestore.settings(this.settings);
}

export default firebaseFetch
