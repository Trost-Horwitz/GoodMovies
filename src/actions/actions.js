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

export const addMovieToList = movieObj => {
  return {
    type: "ADD_MOVIE",
    payload: { ...movieObj }
  };
};

export const startAddMovieToList = (uid, movieObj = {}) => {
  return async dispatch => {
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
