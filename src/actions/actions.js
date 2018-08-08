import firebaseFetch from "../adapters/firebaseFetch";

// property we get from auth: isNewUser

// export const login = (authDetails = {}) => ({
//   type: "LOGIN",
//   payload: { uid: authDetails.user.uid }
// });

export const getUserData = (userId = {}) => {
  firebaseFetch.getUserData(userId).then(doc => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  });
};
export const startLogin = (authDetails = {}) => {
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
