import firebaseFetch from "../adapters/firebaseFetch";

// property we get from auth: isNewUser

export const login = (authDetails = {}) => ({
  type: "LOGIN",
  payload: { uid: authDetails.user.uid }
});

export const startLogin = (authDetails = {}) => {
  if (authDetails.additionalUserInfo.isNewUser) {
    return dispatch => {
      firebaseFetch.createUser(authDetails.user.uid);
    };
  } else {
    return dispatch => {
      firebaseFetch.getUser(authDetails.user.uid);
      dispatch();
    };
  }
};
