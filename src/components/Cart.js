import React, { Component } from 'react'
import formatCurrency from "../util";


export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            email: "",
            address: "",
            showCheckout: false,
        };
    }

    // FUNCTIONS THAT HANDLE THE INPUTS
    // IT ACCEPT THE EVENT AND GET ACCESS TO THE NAME OF INPUT BOX AND THE VALUE AND SET THE STATE BASED ON IT
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
        
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
    };
    
    render() {
        // GETTING THE CART ITEMS FROM THE PARENT COMPONENT
        const {cartItems} = this.props;
        return (
            <div>
                {/* CHECKING IF CART IS EMPTY */}
                {cartItems.length === 0 ? (
                    <div className="cart cart-header">Cart is empty</div>
                ) : (
                    <div className="cart cart-header">
                        You have {cartItems.length} in the cart {" "}
                    </div>
                )}
                <div>
                    <div className="cart">
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id} className="cart-item">
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count}{" "}
                                            <button 
                                                className="button"
                                                onClick={() => this.props.removeFromCart(item)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* USING CONDITIONAL RENDERING TO SHOW TOTAL WHEN THERE IS NO ITEM ADDED TO CART */}
                    {cartItems.length !== 0 && (
                        <div>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total:{" "}
                                        {/* SHOWING TOTAL: REDUCE FUNCTION: ACCUMLATOR AND CURRENT ITEM */}
                                        {formatCurrency(
                                            cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                        )}
                                    </div>
                                    <button 
                                    onClick={() => {
                                        this.setState({ showCheckout: true});
                                    }} 
                                        className="button primary">Proceed</button>
                                </div>
                            </div>
                            {/* FIRST CHECK IF SHOWCHECKOUT IS TRUE */}
                            {this.state.showCheckout && (
                                <div className="cart">
                                    <form onSubmit={this.createOrder} className="cart-form">
                                        <ul className="form-container">
                                            <li>
                                                <label>Email</label>
                                                <input 
                                                    name="email"
                                                    type="email" 
                                                    required 
                                                    onChange={this.handleInput} />
                                            </li>
                                            <li>
                                                <label>Name</label>
                                                <input 
                                                    name="name"
                                                    type="text" 
                                                    required 
                                                    onChange={this.handleInput} />
                                            </li>
                                            <li>
                                                <label>Address</label>
                                                <input 
                                                    name="address"
                                                    type="text" 
                                                    required 
                                                    onChange={this.handleInput} />
                                            </li>
                                            <li>
                                                <button 
                                                className="button primary"
                                                type="submit"
                                                >Checkout</button>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
        );

    }
}