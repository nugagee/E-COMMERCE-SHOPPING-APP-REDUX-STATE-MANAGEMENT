import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const cartReducer = (
    // FIRST PARAMETER IS THE CURRENT STATE AND INSTEAD OF EMPTY OBJECT, WE USE LOCALSTORAGE
    // BECAUSE THE RETURN VALUE OF LOCALSTORAGE IS A STRING, WE NEED TO CONVER IT TO JS OBJECT WITH PARSE
    // SETTING THE CARTITEM PROPERTY TO LOCALSTORAGE VALUE
    // IF THE VALE DOESNT EXIST THEN WE USE AN EMPTY ARRAY AS A STRING
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
//   SECOND PARAMETER IS THE ACTION
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      // UPDATING THE STATE BASED ON THE NEW CART ITEM
      return { cartItems: action.payload.cartItems };
    case REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems };
    default:
      return state;
  }
};
