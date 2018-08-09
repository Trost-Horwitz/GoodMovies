const authDefaultState = {hello:"value"};

export default (state = authDefaultState, action) => {
  console.log(action.type, action.payload)
  switch (action.type) {
    case "SIGNIN":
      console.log("Signing In!");
      return {...state, ...action.payload};
    case "SIGNOUT":
    console.log("SIGNOUT!");
      return {};
    default:
      console.log("default!");
      return state;
  }
};
