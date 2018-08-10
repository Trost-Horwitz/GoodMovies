import firebase from "../firebase/firebase";

const firebaseFetch = {
  db: firebase.firestore(),
  //creates new user in DB with empty to_watch list
  createUser: function(uid) {
    return this.db
      .collection("users")
      .doc(`${uid}`)
      .set({
        toWatch: {}
      })
      .catch(error =>
        console.error("Error creating new user in firebase:", error)
      );
  },

  // returns array of objects containing user info
  getAllUsers: function() {
    return this.db
      .collection("users")
      .get()
      .then(function(querySnapshot) {
        let users = [];
        querySnapshot.forEach(function(doc) {
          users.push({ ...doc.data(), id: doc.id });
        });
        return users;
      });
  },

  getUserData: async function(uid) {
    console.log("GetUserData - FirebaseFetch", uid)
    try {
      const userRef = await this.db.collection("users").doc(uid);
      const userObj = await userRef.get();
      return await userObj.data();
    } catch (err) {
      console.log("User Data not found for ID:", uid, "Error", err);
      return null;
    }
  },

  addMovieToList: async function(uid, movieObj) {
    try {
      const toWatchWithID = `toWatch.${movieObj.id}`;
      const userRef = await this.db.collection("users").doc(uid);
      await userRef.update({
        [toWatchWithID]: movieObj
      });
      return movieObj; // Not sure what this function should return
    } catch (err) {
      console.log("User Data not found for ID:", uid, "Error", err);
      return null;
    }
  },

  removeMovieFromList: async function(uid, movieObj) {
    try {
      const toWatchWithID = `toWatch.${movieObj.id}`;
      const userRef = await this.db.collection("users").doc(uid);
      const removeMovie = await userRef.update({
        [toWatchWithID]: firebase.firestore.FieldValue.delete()
      });
      return movieObj;
    } catch (err) {
      console.log("User Data not found for ID:", uid, "Error", err);
      return null;
    }
  }

  // multiple selection

  // db.collection("users").where("username", "==", "secondUser").get().then(querySnapshot=>(querySnapshot.forEach(doc=>console.log(doc.data()))))

  // clears error about timestamp

  // const settings = {
  //   timestampsInSnapshots: true
  // }
  //
  // firestore.settings(this.settings);
};

export default firebaseFetch;
