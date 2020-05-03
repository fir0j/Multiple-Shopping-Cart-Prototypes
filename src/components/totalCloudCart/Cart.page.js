//Note Component first Letter must be Capital

import React, { Component } from 'react';
import { Cart } from './Cart.component';
import Buttons from './Buttons.component';
import Item from './Item.component';
import './CartPage.style.css';

export default class CartPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuItemSelected: '',
			cartItemSelected: '',
			isSelectedFromMenu: false,
			isSelectedFromCart: false,
			cartItems: [],
			MenuItems: [
				{
					photoUrl: 'https://source.unsplash.com/MqT0asuoIcU/111x111',
					name: 'pizza',
					price: '5.99',
					id: 1
				},
				{
					photoUrl: 'https://source.unsplash.com/9G_oJBKwi1c/111x111',
					name: 'burger',
					price: '2.99',
					id: 2
				},
				{
					photoUrl: 'https://source.unsplash.com/7zfQ6sbWVyE/111x111',
					name: 'Chicken Pasta',
					price: '2.99',
					id: 3
				},
				{
					photoUrl: 'https://source.unsplash.com/foHj73zCV3Y/111x111',
					name: 'Grilled Sandwich',
					price: '2.99',
					id: 4
				}
			]
		};
	}

	handleClickToSelect = (selected) => {
		this.setState((state) => ({
			menuItemSelected: selected,
			isSelectedFromMenu: true
		}));
	};

	handleClickToUnselectFromMenu = () => {
		this.setState((state) => ({
			menuItemSelected: '',
			isSelectedFromMenu: false
		}));
	};

	handleClickToUnselectFromCart = () => {
		this.setState((state) => ({
			cartItemSelected: '',
			isSelectedFromCart: false
		}));
	};

	handleAddToCart = () => {
		const { cartItems, menuItemSelected } = this.state;
		let itemAlreadyInCart = false;
		if (cartItems.length > 0) {
			cartItems.forEach((item) => {
				if (item.id === menuItemSelected.id) {
					console.log('item is:', item.id, 'selected is', menuItemSelected.id);
					itemAlreadyInCart = true;
				}
			});
		}

		if (!itemAlreadyInCart) {
			this.setState((state) => ({
				cartItems: [ ...state.cartItems, state.menuItemSelected ]
			}));
		} else {
			alert('The item is Already in your cart');
		}

		this.handleClickToUnselectFromMenu();
	};

	handleRemoveFromCart = () => {
		if (!this.state.cartItemSelected) {
			alert('Please Select an Item from the cart first!');
		} else {
			this.setState((state) => ({
				cartItems: state.cartItems.filter((cartItem) => cartItem.id !== this.state.cartItemSelected.id)
			}));
		}
		this.handleClickToUnselectFromCart();
	};

	getCartItemSelected = (item, isSelectedFromCart) => {
		this.setState({
			cartItemSelected: item,
			isSelectedFromCart: isSelectedFromCart
		});
	};

	TotalPrice = () => {
		const { cartItems } = this.state;
		const total = cartItems.reduce((acc, item) => acc + item.price, 0);
		this.setState({
			cartTotal: total
		});
	};

	render() {
		const {
			MenuItems,
			menuItemSelected,
			cartItems,
			isSelectedFromMenu,
			cartTotal,
			isSelectedFromCart
		} = this.state;

		const ListMenuItems = () => {
			return (
				<div className="container m-auto">
					<div style={{ textAlign: 'center', fontSize: '25px' }}>
						<p>Available Options</p>
					</div>
					<hr />
					{MenuItems.map((MenuItem) => {
						return (
							<Item
								key={MenuItem.id}
								foodItem={MenuItem}
								handleClickToSelect={this.handleClickToSelect}
								menuItemSelected={menuItemSelected}
								isSelected={isSelectedFromMenu}
							/>
						);
					})}
				</div>
			);
		};

		const MenuEmpty = () => {
			return (
				<div>
					<div className="container m-auto cartEmpty">
						<h2>Food Items are comming soon...</h2>
					</div>
				</div>
			);
		};

		return MenuItems.length > 0 ? (
			<div className="container m-auto overlay">
				<ListMenuItems />
				<Buttons
					handleAddToCart={this.handleAddToCart}
					handleRemoveFromCart={this.handleRemoveFromCart}
					isSelectedFromMenu={isSelectedFromMenu}
					isSelectedFromCart={isSelectedFromCart}
				/>

				<Cart
					cartItems={cartItems}
					handleClickToSelect={this.handleClickToSelect}
					getCartItemSelected={this.getCartItemSelected}
					cartTotal={cartTotal}
				/>
			</div>
		) : (
			<MenuEmpty />
		);
	}
}
