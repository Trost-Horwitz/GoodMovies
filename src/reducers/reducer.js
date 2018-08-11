const reducerDefaultState = { toWatch: {} };

export default (state = reducerDefaultState, action) => {
  console.log(action.type, action.payload);
  let newToWatch;
  switch (action.type) {
    case "ADD_MOVIE":
      newToWatch = state.toWatch;
      newToWatch[action.payload.id] = action.payload;
      return { ...state, toWatch: newToWatch };
    case "REMOVE_MOVIE":
      newToWatch = state.toWatch;
      delete newToWatch[action.payload.id];
      return { ...state, toWatch: newToWatch };
    case "GET_USER_DATA":
      return [...state, action.payload];
    case "UPDATE_USER_DATA":
      return [...state, action.payload];
    default:
      return state;
  }
};
