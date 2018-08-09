import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reducer from "../reducers/reducer";
import auth from "../reducers/auth";
import thunk from "redux-thunk";

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth,
      reducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
