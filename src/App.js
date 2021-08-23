import React from "react";
import './App.css';
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // cartItems: [],
      // INSTEAD OF SETTING CART ITEMS AS EMPTY ARRAY WE USE THE PARSE TO REVERSE IT FROM STRINGIFY FROM THE LOCAL STORAGE
      // ALSO YOU CHECK THE EXISTENCE OF THE ITEM IN ORDER TO AVOID ERROR
      cartItems: localStorage.getItem("cartItems") 
      ? JSON.parse(localStorage.getItem("cartItems")) 
      : [],
    };
  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }

  // FUNCTION THAT REMOVE ITEMS FROM CART
  removeFromCart = (product) => {
    // CREATING AN INSTATNCE OF CART ITEM
    const cartItems = this.state.cartItems.slice();
    // FILTER CART ITEMS BASED ON ID IS NOT EQUAL TO PRODUCT ID AND SETTING IT AS A NEW CART ITEM IN THE STATE
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    // IN ORDER TO MAKE THE CART ITEMS PERSISTENCE WHEN THE PAGE REFRESH BY USER
    // USING LOCAL STORAGE TO SET THE STATE OF THE CART ITEMS, IT ACCEPTS ONLY STRING, WHILE CARTITEMS IS A JAVASCRIPT OBJECT  WHUCH WE CONVERTS THE CART ITEMS TO A STRING WITH JSONSTRINGIFY
    localStorage.setItem(
      "cartItems", 
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
      );
  };


  // FUNCTIONS THAT ADD ITEMS TO CART
  addToCart = (product) => {
    // CLONE COPY OF CART ITMES INSIDE THE STATE
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    // LOOPING OVER CART ITEM, CHECK IF ITEM ID IS EQUAL TO CURRENT PRODUCT ISIDE THE CART, IF EXIST THEN UPDATE THE NO OF COUNT
    cartItems.forEach(item => {
      if(item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    // IF PRODUCT NOT IN CART THEN PUSH THE ITEM INSIDE CART ITEM
    if(!alreadyInCart) {
      // ADDING INSTANCE OF PRODUCT WITH COUNT NO 1 AS A NEW ITEM INSIDE CART ITEMS
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };


  render() {
    
    return (
      <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">theTechBoi.nugagee Online Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products 
              addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
              <Cart 
              cartItems={this.state.cartItems}
              removeFromCart={this.removeFromCart}
              createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>
          theTechBoi.nugagee &copy; 2021 All right reserved.
        </footer>
      </div>
      </Provider>
    );
  }
}

export default App;
