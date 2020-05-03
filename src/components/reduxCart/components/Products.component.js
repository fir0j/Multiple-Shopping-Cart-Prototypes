import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../acions/productActions';
import { addToCart } from '../acions/cartActions';

class Products extends Component {
	UNSAFE_componentWillMount() {
		this.props.fetchProducts();
	}

	render() {
		const productItems = this.props.products.map((product) => (
			<div key={product.id} className="col-md-4">
				{console.log(product.id)}
				<div className="card text-center mb-4">
					<a href={`#${product.id}`}>
						<img
							width="100%"
							height="130px"
							src={require(`../images/${product.name}.jpg`)}
							alt={product.name}
						/>
					</a>
					<h3>{product.name}</h3>
					<div>
						<b>{`Rs.${product.price}`}</b>
						<button
							className="btn btn-primary ml-5 mb-1"
							onClick={() => this.props.addToCart(this.props.cartItems, product)}
						>
							Add To Cart
						</button>
					</div>
				</div>
			</div>
		));

		return <div className="row">{productItems}</div>;
	}
}

// importing states which we just defined for this component in redux or product reducer from redux-store so that
// we can use states maintained for our component by redux in our component.
// mapStateToPros: equivalent this.state={ } for our this component.
// this is how we access any state of our app using 'state' object in any component easily
// 'state'  refers to the redux's global store of states  which has been created using combineReducers() function.
// syntax for accessing the global props: globalState.reducerName_from_globState.stateVariable_name holding the value in the swichCase inside the reducer file.
// Then store the value in the form of props in your required component. so process meaningful name came as mapStateToProps.
const mapStateToProps = (state) => ({
	products: state.products.filteredItems,
	cartItems: state.cart.cartItems
});

// this is how we access any methods,functions,actions or bussiness logic of our app(import, extract, use)
// it connect our component to redux store so that data and functions can be exchanged between the component and the redux-store.
export default connect(mapStateToProps, { fetchProducts, addToCart })(Products);

// syntax: connect(mapStateToProps, mapDispatchToProps)(needdyComponent)
// Note: suppose needdyComponent doesn't need props only wan to import some dispatched function then we can write
// connect(null, mapDispatchToProps)(needdyComponent)
