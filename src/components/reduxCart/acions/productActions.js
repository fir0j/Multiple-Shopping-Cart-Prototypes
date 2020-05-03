import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_TYPE, ORDER_PRODUCTS_BY_PRICE } from './types';

// bussiness logic of the programs returns AN ACTION OBJECT to the DISPATCH() method which in turn returns to all the reducers.

//Note: distpatch is just an argument name hence you can use any name instead of dispatch.
// Since fetchProducts is higher order function, make sure parameter for dispatch is a function.

// NOTE: all reducer's actions  takes a_function_as_argument  and returns another_functions
// like here fetchProducts() is getting dispatch_action as input and returning another dispatch_action as output.

/*
!!! IMPORTANT CONCEPT !!! HERE ATTACHING DISPATCH() TO THE PROPS SO THAT ACTION CAN BE BROADCASTED TO THE REDUCERS
- Dispactch() always take object input which should contain actionType and in most cases payload also.

// These functions or actions are those functions which redux uses to dispatch actions.
// Redux passes the action_Object(object containing the action and the payload) to all the reducers inside their switch case as action.
// whichever actions get matched, 

*/

export const fetchProducts = () => (dispatch) => {
	fetch('https://fir0j.github.io/JSON-Server/db.json').then((result) => result.json()).then((data) => {
		return dispatch({ type: FETCH_PRODUCTS, payload: data });
	});
};

export const filterProducts = (products, itemType) => (dispatch) => {
	return dispatch({
		type: FILTER_PRODUCTS_BY_TYPE,
		payload: {
			itemType: itemType,
			filteredItems: itemType === '' ? products : products.filter((item) => item.type === itemType)
		}
	});
};

export const sortProducts = (products, sortBy) => (dispatch) => {
	const items = products.slice();

	items.sort((a, b) => (sortBy === 'Highest' ? (a.price < b.price ? 1 : -1) : a.price > b.price ? 1 : -1));

	return dispatch({
		type: ORDER_PRODUCTS_BY_PRICE,
		payload: {
			sortBy: sortBy,
			sortedItems: items
		}
	});
};
