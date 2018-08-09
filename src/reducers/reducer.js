const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      return [...state, action.payload];
    case "GET_USER_DATA":
      return [...state, action.payload];
    default:
      return state;
  }
};
