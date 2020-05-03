import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_TYPE, ORDER_PRODUCTS_BY_PRICE } from '../acions/types';

// reducer always RETURNS(latest) NEW STATE OBJECT of our data after evaluating current(initial) state and ACTION OBJECT.
//  The action object being send with the dispatch function has a MANDATORY TYPE property and an optional payload property

// hence productReducer is function that evaluates Product.component states and action related to product.component,
// and creates a brand new object which contains updated states using initialState's properties and returns the brand new object.
// NOTE: it doesn't update the initialState object rather it creates new object using initialState properties or content and returns it.

// initialState object stores the Prodcut.component's initial/previous/current/default  state to be returned in case of no state change in the Prodcut.component.
const initialState = { items: [], filteredItems: [], itemType: '' };

// Now concept got cleared! From where the action argument is coming ? or frow where this action is being passed.
// After function is dispatched to the needdyComponent using mapDispatchToProps, the component's prop is assigned a nested funtion
// which contains dispatch() and inside dispatch our custom action or fucntion which we need to dispatch like
// { props: (argument) => dispatch(addToCart(item))}
// practically { addToCart: (item) => dispatch(addTocart(item))}
// Now we have successfully imported the function from the redux store. Interesting thing is now
// when we call addTocart(product), first addToCart inside the dispatch is called which will return an object like {type: actionType, payload: somePayload}
// which is our action object to the dispatch method as then this retuned action object becomes the argument which looks like
// dispatch( {type: actionType, payload: somePayload} )
// Now dispatch method broadcasts or passes this action object to  EACH AND EVERY reducers the redux-store and whichever reducer has matching action will update the store(or state value)
// and the that value is reflected in the components.

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_PRODUCTS:
			// syntax, return any_object. here any_object is an object made up
			// of (all the properties of state including its items property which is being updated with the payload)
			return { ...state, filteredItems: action.payload, items: action.payload };
		// the returned object is being stored in the UNIFIED_GIANT_STORE of the redux as value for the property in the root reducer file like
		// products: { items:[], filteredItems: recievedPayload, items: recievedPayload}
		// so is accessed as state.products.filteredItems inside productComponent.

		case FILTER_PRODUCTS_BY_TYPE:
			return { ...state, filteredItems: action.payload.filteredItems, itemType: action.payload.type };

		case ORDER_PRODUCTS_BY_PRICE:
			return { ...state, filteredItems: action.payload.sortedItems, itemType: action.payload.sortBy };

		default:
			// returning the same old object or state.
			return state;
	}
}
