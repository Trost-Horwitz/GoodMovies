const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  console.log(action.type, action.payload)
  switch (action.type) {
    case "ADD_MOVIE":
      return [...state, action.payload];
    case "GET_USER_DATA":
      return [...state, action.payload];
    default:
      return state;
  }
};
