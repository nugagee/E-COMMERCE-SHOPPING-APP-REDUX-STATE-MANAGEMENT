import React, { Component } from 'react'
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productActions";


class Filter extends Component {
    render() {
        return(
            // USING CONDITIONAL RENDERING
            !this.props.filteredProducts ? (
                <div>Loading...</div>
            ) : (
            <div className="filter">
                <div className="filter-result">
                    {this.props.filteredProducts.length} Products
                </div>
                <div className="filter-sort">
                    Order{" "}
                    <select 
                    value={this.props.sort}
                    onChange={(e) => 
                    // THE FIRST PARAMETER IS ALL THE PRODUCTS THAT COMES FROM THE SERVER WHILE THE SECOND PARAMETER IS THE VALUE THAT THE USER SELECTED
                        this.props.sortProducts(
                            this.props.filteredProducts,
                            e.target.value
                        )}>
                        <option value="latest">Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </div>
                <div className="filter-size">
                    Filter{" "}
                    <select
                        value={this.props.size}
                        onChange={(e) =>
                            // THE FIRST PARAMETER IS ALL THE PRODUCTS THAT COMES FROM THE SERVER WHILE THE SECOND PARAMETER IS THE SELECTED SIZE THAT THE USER SELECTED
                        this.props.filterProducts(this.props.products, e.target.value)
                        }
                    >
                        <option value="">ALL</option>
                        <option value="XS">XL</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>
            )
        );
    }
}

// FIRST PARAMETER IS THE MAPSTATETOPROPS-MAPPING THE STATES
// SECOND PARAMETER IS MAPPING THE ACTIONS
export default connect(
    (state) => ({
      size: state.products.size,
      sort: state.products.sort,
      products: state.products.items,
      filteredProducts: state.products.filteredItems,
    }),
    {
      filterProducts,
      sortProducts,
    }
    // DEFINNING THE COMPONENT TO WRAP IN THE REDUX STORE WHICH IS FILTER
  )(Filter);