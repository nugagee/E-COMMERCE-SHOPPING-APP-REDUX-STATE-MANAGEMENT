import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";



// USING GETSTATE AS PARAMETER MAKE IT POSSIBLE TO GET WHATEVER EXIST IN THE STORE
export const addToCart = (product) => (dispatch, getState) => {
    // CLONNING ITEMS INTO CARTITEMS WITH SLICE
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
//   LOOPING OVER CARTITEMS
  cartItems.forEach((x) => {
    //   CHECKING IF THE PRODUCT ALREADY EXIST IN THE CART
    if (x._id === product._id) {
      alreadyExists = true;
      x.count++;
    }
  });
//   CHECKING IF PRODUCT ALREADY EXIST
  if (!alreadyExists) {
    //   THEN ADD THE ITEM TO THE CART ITEMS WITH PUSH
    // USING DECONSTRUCTING OBJECT ON ALL PROPERTY OF PRODUCT AND ADD THE NUMBER OF ITEM OF THE PRODUCT IN THE CART WHICH IS 1 AT THE BEGINING
    cartItems.push({ ...product, count: 1 });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
//   UPDATE THE LOCALSTORAGE BASED ON THE NEW CART ITEM
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    // IF AN ITEM INSIDE THE CART IS NOT EQUAL TO THE PRODUCT ID, IT WILL BE ADDED TO THE CART ITEMS 
    .filter((x) => x._id !== product._id);
    // DISPATCHING THE ACTION
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
//   UPDATING THE LOCALSTORAGE, AND MAKE IT A STRING WITH JSON STRINGIFY BECAUSE LOCAL STORAGE ONLY ACCEPT A STRING
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};




// import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

// export const addToCart = (product) => (dispatch, getState) => {
//   const cartItems = getState().cart.cartItems.slice();
//   let alreadyExists = false;
//   cartItems.forEach((x) => {
//     if (x._id === product._id) {
//       alreadyExists = true;
//       x.count++;
//     }
//   });
//   if (!alreadyExists) {
//     cartItems.push({ ...product, count: 1 });
//   }
//   dispatch({
//     type: ADD_TO_CART,
//     payload: { cartItems },
//   });
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// };

// export const removeFromCart = (product) => (dispatch, getState) => {
//   const cartItems = getState()
//     .cart.cartItems.slice()
//     .filter((x) => x._id !== product._id);
//   dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// };
