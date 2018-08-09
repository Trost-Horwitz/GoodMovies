import firebaseFetch from "../adapters/firebaseFetch";

// export const login = (authDetails = {}) => ({
//   type: "LOGIN",
//   payload: { uid: authDetails.user.uid }
// });

export const getUserData = (userId = {}) => {
  firebaseFetch.getUserData(userId).then(doc => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      console.log("No such document!");
    }
  });
};

export const startGetUserData = (authDetails = {}) => {
  if (authDetails.additionalUserInfo.isNewUser) {
    return function action(dispatch) {
      firebaseFetch
        .createUser(authDetails.user.uid)
        .then(data => dispatch(getUserData(data)));
    };
  } else {
    return function action(dispatch) {
      firebaseFetch
        .getUserData(authDetails.user.uid)
        .then(data => dispatch(getUserData(data)));
    };
  }
};
