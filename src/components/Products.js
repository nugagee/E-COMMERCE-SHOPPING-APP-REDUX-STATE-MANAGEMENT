import React, { Component } from 'react'
import formatCurrency from "../util";
import Modal from "react-modal";

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };
    }

		// THE MODAL OPENS WHEN THE USER CLICKS ON THE PRODUCT
		// WE FILL THE STATE PRODUCT WITH THE SELECTED PRODUCT
		openModal = (product) => {
			this.setState({ product});
		};

		closeModal = () => {
			this.setState({ product: null});
		};

    render() {
				const { product } = this.state;
        return (
            <div>
                <ul className="products">
                    {this.props.products.map((product) => (
                        <li key={product._id}>
                            <div className="product">
                                {/* BY CLICKING ON THE IMAGE IT OPENS/ENABLE THE MODAL TO VIEW ITEM DETAILS AND INFORMATIONS */}
                                <a 
																	href={"#" + product._id} 
																	onClick={() => this.openModal(product)}>
                                    <img src={product.image} alt={product.title} />
                                    <p>
                                        {product.title}
                                    </p>
                                </a>
                                <div className="product-price">
                                    {/* FORMAT CURRENCY FUNCTIONS ADD $ TO THE PRICE AND CONVERT IT TO NUMBER */}
                                    <div>{formatCurrency(product.price)}</div>
                                    <button 
                                    onClick={() => this.props.addToCart(product)} className="button primary">Add To Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
								{/* USING CONDITIONAL RENDERING TO CHECK IF PRODUCT EXIST, THEN SHOW A MODAL COMPONENT */}
								{product && (
									<Modal 
										isOpen={true} 
										onRequestClose={this.closeModal}>
                                            <div className="modal">
												<button
                                                    className="close-modal"
													onClick={this.closeModal}>
														x
													</button>
													<div className="product-details">
															<img src={product.image} alt={product.title} />
															<div className="product-details-description">
																<p>
																	<strong>{product.title}</strong>
																</p>
																<p>
																	{product.description}
																</p>
																<p>
																	Available Sizes: {" "}
																	{/* LOOPING THROUGH THE ARRAY OF THE AVAILABLE SIZES WITH MAP  */}
																	{product.availableSizes.map((x) => (
																		<span>
																			{" "}
																			<button className="button">{x}</button>
																		</span>
																	))}
																</p>
																<div className="product-price">
																	<div>{formatCurrency(product.price)}</div>
																	<button 
																		className="button primary" 
																		onClick={() => {
																			this.props.addToCart(product);
																			this.closeModal();
																		}}>
																			Add To Cart
																		</button>
																</div>
															</div>
													</div>
                                                </div>
									</Modal>
								)}
            </div>
        )
    }
}