import {createStore, applyMiddleware} from "redux";
import reducers from "../reducers/index";
import thunk from "redux-thunk";

const logger = store => next => action => {
 // console.log('prev state', store.getState());
//  console.log('dispatching', action);
  next(action);
//  console.log('next state', store.getState());
};

const store = createStore(reducers, applyMiddleware(logger, thunk));

export default store;
