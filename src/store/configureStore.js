import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reducer from "../reducers/reducer";
import thunk from "redux-thunk";

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      reducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
