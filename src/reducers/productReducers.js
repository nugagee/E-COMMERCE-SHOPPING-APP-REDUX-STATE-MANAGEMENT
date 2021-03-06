import {
    FETCH_PRODUCTS,
    FILTER_PRODUCTS_BY_SIZE,
    ORDER_PRODUCTS_BY_PRICE,
  } from "../types";
  

//   WITH PRODUCT REDUCER, WHEN WE GET A NEW DATA FROM ACTION, WE UPDATE THOSE DATA INSIDE REDUX STORE
  export const productsReducer = (state = {}, action) => {
    switch (action.type) {
      case FILTER_PRODUCTS_BY_SIZE:
        return {
          // RETURNING CURRENT STATE AND IF THERE IS ANY CHANGE IN THE STATE IT WILL MERGE THE CHANGES WITH THE CURRENT STATE
          ...state,
          size: action.payload.size,
          filteredItems: action.payload.items,
        };
      case ORDER_PRODUCTS_BY_PRICE:
        return {
          ...state,
          sort: action.payload.sort,
          filteredItems: action.payload.items,
        };
      case FETCH_PRODUCTS:
        // THIS MEANS AT THE BEGINING OF FETCHING DATA FROM SERVER, ITEMS AND FILTER ITEM HAS NO CONDITION
        return { items: action.payload, filteredItems: action.payload };
      default:
        return state;
    }
  };
  