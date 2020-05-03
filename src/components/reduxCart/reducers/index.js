import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducers';

// here all the reducers are combined to form rootReducer which is an object containing all the
// states of the app in isolation with react's both functional and statefull components in a seperate file of redux.
// Hence this object is also called globalStore and it is similar to the object inside react's constructor this.state={}.
// Now all the react component will refer this object as any STATE ie. for state of any react component.

export default combineReducers({
	products: productReducer,
	cart: cartReducer
});
