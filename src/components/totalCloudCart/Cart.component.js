import React, { Component } from 'react';
import Item from './Item.component';

export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartItemSelected: '',
			isSelectedFromCart: false
		};
	}

	handleClickToSelect = (cartItem) => {
		this.setState((state) => ({
			cartItemSelected: cartItem,
			isSelectedFromCart: true
		}));
		const isSelectedFromCart = true;
		this.props.getCartItemSelected(cartItem, isSelectedFromCart);
	};

	render() {
		const { cartItems } = this.props;
		const { cartItemSelected, isSelectedFromCart } = this.state;

		const TotalPrice = ({ total }) => {
			return (
				<div className="totalPrice">
					<h1>{`Total Amount: $${total}`}</h1>
				</div>
			);
		};

		const CartEmpty = () => {
			return (
				<div className="container cartEmpty">
					<h2>Your cart is empty</h2>
					<h5>Select an item and click "Add to cart"</h5>
				</div>
			);
		};

		return cartItems.length > 0 ? (
			<div className="container">
				<div style={{ textAlign: 'center', paddingTop: '5px', fontSize: '23px' }}>
					<p>Your Cart</p>
				</div>
				<hr />
				{cartItems.map((cartItem) => {
					return (
						<div key={cartItem.id} onClick={() => this.handleClickToSelect(cartItem)}>
							<div>
								<Item
									foodItem={cartItem}
									handleClickToSelect={this.handleClickToSelect}
									menuItemSelected={cartItemSelected}
									isSelected={isSelectedFromCart}
								/>
							</div>
						</div>
					);
				})}

				<TotalPrice total={cartItems.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2)} />
			</div>
		) : (
			<CartEmpty />
		);
	}
}
