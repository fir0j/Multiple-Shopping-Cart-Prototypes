import React, { Component } from 'react';
import { connect } from 'react-redux';
import './basket.css';
import { removeFromCart } from '../acions/cartActions';

class Basket extends Component {
	render() {
		const { cartItems } = this.props;

		const productItems = this.props.cartItems.map((product) => (
			<div key={product.id} className="basketDesign">
				<ul>
					<li>
						<div className="image">
							<a href={`#${product.id}`}>
								<img
									width="20%"
									height="60px"
									src={require(`../images/${product.name}.jpg`)}
									alt={product.name}
								/>
							</a>
						</div>
						{product.name} x
						{product.count} = Rs.{(product.price * product.count).toFixed(2)}
						<button
							className="btn btn-danger ml-2"
							onClick={() => this.props.removeFromCart(this.props.cartItems, product)}
						>
							X
						</button>
					</li>
				</ul>
			</div>
		));

		return (
			<div className="alter alert-info">
				{cartItems.length === 0 ? (
					<div className="cart">Basket is Empty</div>
				) : (
					`${cartItems.length} Products in the basket`
				)}
				{cartItems.length > 0 && (
					<div>
						{productItems}
						<center>
							<b>
								Total: Rs:
								{cartItems.reduce((acc, item) => acc + item.price * item.count, 0).toFixed(2)}
							</b>
							<br />
							<button
								className="btn btn-primary"
								onClick={() => alert('Checkout Feature has not been implemented yet!')}
							>
								Checkout
							</button>
						</center>
					</div>
				)}
			</div>
		);
	}
}

// bringing states of our component inside our component so that we can use it here.
const mapStateToProps = (state) => ({
	cartItems: state.cart.cartItems
});

export default connect(mapStateToProps, { removeFromCart })(Basket);
