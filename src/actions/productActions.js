import { FETCH_PRODUCTS } from "../types";


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