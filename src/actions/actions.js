import firebaseFetch from "../adapters/firebaseFetch";

// export const login = (authDetails = {}) => ({
//   type: "LOGIN",
//   payload: { uid: authDetails.user.uid }
// });

export const getUserData = (userId = {}) => {
  firebaseFetch.getUserData(userId);
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

export const addMovieToWatch = (uid, movieObj)=>{
  // const oldUserData = await firebaseFetch.getUserData(uid)
  return {
    type: "ADD_MOVIE",
    payload: {...movieObj}
  }
}
