const authDefaultState = {};

export default (state = authDefaultState, action) => {
  console.log(action.type, action.payload)
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
