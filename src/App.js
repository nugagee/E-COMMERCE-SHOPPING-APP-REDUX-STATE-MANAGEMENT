// feature 1
import React from "react";
import './App.css';
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      // cartItems: [],
      // INSTEAD OF SETTING CART ITEMS AS EMPTY ARRAY WE USE THE PARSE TO REVERSE IT FROM STRINGIFY FROM THE LOCAL STORAGE
      // ALSO YOU CHECK THE EXISTENCE OF THE ITEM IN ORDER TO AVOID ERROR
      cartItems: localStorage.getItem("cartItems") 
      ? JSON.parse(localStorage.getItem("cartItems")) 
      : [],
      size: "",
      sort: "",
    };
  }

  createOrder = (order) => {
    alert("Welcome");
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

  // FUNCTION THAT SORT THE PRODUCTS SELECTED BY USER
  sortProducts = (event) => {
    //impl
    console.log(event.target.value);
    const sort = event.target.value;
    this.setState((state) => ({
        sort: sort,
        // CREATING A CLONE OF PRODUCTS USING SLICE METHOD THEN SORT FUNCTION COMPARE THE TWO PARAMETER AND RETURN A NEW OBJECT, CHECKING A VALUE OF SORT IF SORT IS EQUAL TO LOWEST, THEN IF A.PRICE IS LESS THAN B.PRICE AND ALSO CHECK FOR HIGHEST, THEN ALSO CHECK BASED ON TH PRODUCT ID  
        products: this.state.products
          .slice()
          .sort((a, b) => 
            sort === "lowest"
            ? a.price > b.price
              ? 1
              :-1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              :-1
            : a._id < b._id
            ? 1
            :-1
        ),
    }));
  };


    // FUNCTION THAT FILTER THE PRODUCTS SELECTED BY USER

  filterProducts = (event) => {
    //impl
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
        this.setState({
        size: event.target.value,
        // USING THE DATA FROM PRODUCTS, INSIDE THE FILTER METHOD WILL CHECK FOR THE AVAILABLE SIZES FROM THE INDEX OF CURRENT VALUE IS GREATER THAN OR EQUAL TO ZERO
        products: data.products.filter(
          product => product.availableSizes.indexOf(event.target.value) >= 0
          ),
      });
    }
  };


  render() {
    
    return (
      <div className="grid-container">
        <header>
          <a href="/">theTechBoi.nugagee Online Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter 
              count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}/>
              <Products 
              products={this.state.products}
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
    );
  }
}

export default App;
