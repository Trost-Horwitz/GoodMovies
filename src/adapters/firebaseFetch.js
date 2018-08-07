import firebase from '../firebase/firebase'

const firebaseFetch = {
  db: firebase.firestore(),

  createUser: function(name){
    return this.db.collection("users").doc(`${name}`).set({
      username:`${name}`,
      toWatch_list:[]
    }).catch(error=>console.error("Error creating new user in firebase:", error))
  },

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


  // db.collection("users").where("username", "==", "secondUser").get().then(querySnapshot=>(querySnapshot.forEach(doc=>console.log(doc.data()))))
}

export default firebaseFetch
