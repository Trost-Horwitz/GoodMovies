const authDefaultState = {};

export default (state = authDefaultState, action) => {
  switch (action.type) {
    case "SIGNIN":
      console.log("Signing In!");
      return { ...action.payload };
    case "SIGNOUT":
      return {};
    default:
      return state;
  }
};
