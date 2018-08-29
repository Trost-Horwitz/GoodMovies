import firebaseFetch from "../adapters/firebaseFetch";

// export const login = (authDetails = {}) => ({
//   type: "LOGIN",
//   payload: { uid: authDetails.user.uid }
// });

export const getUserData = (udata) => {
  console.log("getUserData REDUX action", udata)
  if (udata){
    return {
      type: "GET_USER_DATA",
      payload: { ...udata.toWatch}
    }
  }
};

export const startGetUserData = (authDetails = {}) => {
  if (authDetails.additionalUserInfo.isNewUser) {
    return function action(dispatch) {
      firebaseFetch
        .createUser(authDetails.user.uid)
    };
  } else {
    return function action(dispatch) {
      console.log("start get user data", authDetails)
      firebaseFetch
        .getUserData(authDetails.user.uid)
        .then(data => dispatch(getUserData(data)));
    };
  }
};

export const addMovieToList = movieObj => {
  // console.log("in action add movie", movieObj)
  return {
    type: "ADD_MOVIE",
    payload: { ...movieObj }
  };
};

export const startAddMovieToList = (uid, movieObj = {}) => {
  // console.log("in action start add movie", uid, movieObj)
  return async dispatch => {
    // console.log("in action start add movie 2", uid, movieObj)
    await firebaseFetch.addMovieToList(uid, movieObj);
    return await dispatch(addMovieToList(movieObj));
  };
};

export const removeMovieFromList = movieObj => {
  return {
    type: "REMOVE_MOVIE",
    payload: { ...movieObj }
  };
};

export const startRemoveMovieFromList = (uid, movieObj = {}) => {
  return async dispatch => {
    await firebaseFetch.removeMovieFromList(uid, movieObj);
    return await dispatch(removeMovieFromList(movieObj));
  };
};
