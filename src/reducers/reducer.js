const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      return [...state, action.payload];
  }
};
