import React from "react";
import './App.css';
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";



class App extends React.Component {

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
              <Products />
            </div>
            <div className="sidebar">
              <Cart />
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
