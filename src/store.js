import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
// IT SHOULD BE INSIDE CURLY BRACES BECAUSE ITS A NAMED EXPORT AND NOT A DEFAULT EXPORT FROM LIBRARY
import { productsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
// import { orderReducer } from "./reducers/orderReducers";

// SETTING THE INITIAL STATE TO AN EMPTY OBJECT
const initialState = {};
// LINKING OUR APP TO THE CHROME REDUX DEV TOOLS TO MONITOR THE APP ACTIONS
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    cart: cartReducer,
    // order: orderReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
