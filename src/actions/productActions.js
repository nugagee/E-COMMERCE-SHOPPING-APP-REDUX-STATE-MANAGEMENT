import { FETCH_PRODUCTS } from "../types";
import { FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types";



export const fetchProducts = () => async (dispatch) => {
    // GETTING PRODUCTS FROM THR ENDPOINT
    const res = await fetch("https://fakestoreapi.com/products");
    // STORING THE SERVER RESPONSE IN DATA AND CONVERTING IT TO JSON
    const data = await res.json();
    console.log(data);
    // DISPATCHING THE LIST OF PRODUCTS AS AN ACTION
    dispatch({
      type: FETCH_PRODUCTS,
      payload: data,
    });
  };


  // THE FIRST PARAMETER IS ALL PRODUCTS THAT COMES FROM SERVER AND THE SECOND IS THE SIZE WE WANTS TO FILTER THE PRODUCTS BASED ON THE SIZE
  export const filterProducts = (products, size) => (dispatch) => {
    // DISPATCHING AN ACTION THAT CHANGE THE REDUX STORE
    dispatch({
      type: FILTER_PRODUCTS_BY_SIZE,
      payload: {
        // THE SELETED SIZE
        size: size,
        // FILTERED PRODUCTS BASED ON SIZE
        items:
        // IF SIZE EQUAL EMPTY STRING RETURN ALL PRODUCTS
          size === ""
            ? products
            // USING FILTER WILL CHECK IF THE RETURN VALUE OF INDEX OF SIZE IS GREATER OR EQUAL TO ZERO BECAUSE ITS AN INDEX ARRAY
            : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
      },
    });
  };


  export const sortProducts = (filteredProducts, sort) => (dispatch) => {
    const sortedProducts = filteredProducts.slice();
    if (sort === "latest") {
      sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
    } else {
      sortedProducts.sort((a, b) =>
        sort === "lowest"
        // THIS CONDITION SORT FROM LOWEST TO HIGHEST
          ? a.price > b.price
            ? 1
            : -1
            // THIS CONDITION SORT FROM LOWEST TO HIGHEST
          : a.price > b.price
          ? -1
          : 1
      );
    }
    console.log(sortedProducts);
    dispatch({
      type: ORDER_PRODUCTS_BY_PRICE,
      payload: {
        sort: sort,
        items: sortedProducts,
      },
    });
  };