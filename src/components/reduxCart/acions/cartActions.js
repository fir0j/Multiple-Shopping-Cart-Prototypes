import { ADD_TO_CART, REMOVE_FROM_CART } from './types';

export const addToCart = (items, product) => (dispatch) => {
	let productAlreadyInCart = false;
	const cartItems = items.slice();
	cartItems.forEach((item) => {
		if (item.id === product.id) {
			productAlreadyInCart = true;
			item.count++;
		}
	});

	if (!productAlreadyInCart) {
		//spead operator spreads all property of an object
		cartItems.push({ ...product, count: 1 });
	}

	localStorage.setItem('cartItems', JSON.stringify(cartItems));
	return dispatch({
		type: ADD_TO_CART,
		payload: {
			cartItems: cartItems
		}
	});
};

export const removeFromCart = (items, product) => (dispatch) => {
	let cartItems = items.slice();
	cartItems = cartItems.filter((item) => item.id !== product.id);

	localStorage.setItem('cartItems', JSON.stringify(cartItems));
	return dispatch({
		type: REMOVE_FROM_CART,
		payload: {
			cartItems: cartItems
		}
	});
};
