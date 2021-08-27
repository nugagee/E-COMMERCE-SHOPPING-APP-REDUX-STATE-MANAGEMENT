import { CREATE_ORDER, CLEAR_CART, CLEAR_ORDER, 
  // FETCH_ORDERS
 } from "../types";

// CREATING THE FIRST ACTION FOR ORDER
export const createOrder = (order) => (dispatch) => {
    // SENDING AJAX REQUEST TO THE SERVER TO CREATE AN ORDER USING FETCH
  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
//   CONVERTING THE RESULT TO JSON
    .then((res) => res.json())
    // USING THE JSON DATA AS A DATA AND DISPATCHING THE ACTION TO THE REDUCER WITH CREATE_ORDER ACTION
    .then((data) => {
      dispatch({ type: CREATE_ORDER, payload: data });
    //   AFTER DISPATCHING THE ACTION WE NEED TO CLEAN THE SHOPPING CART LOCAL STORAGE
      localStorage.clear("cartItems");
    //   ALSO DISPATCH THE CLEAR_CART ACTION TO CLEAR THE CART ITEMS
      dispatch({ type: CLEAR_CART });
    });
};


// CREATING CLEAR ORDER ACTION
export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};


// export const fetchOrders = () => (dispatch) => {
//   fetch("/api/orders")
//     .then((res) => res.json())
//     .then((data) => {
//       dispatch({ type: FETCH_ORDERS, payload: data });
//     });
// };
