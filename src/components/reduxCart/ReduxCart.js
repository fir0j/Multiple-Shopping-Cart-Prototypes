import React, { Component } from 'react';
import Products from './components/Products.component';
import Filter from './components/Filter.component';
import Basket from './components/Basket.component';
import { Provider } from 'react-redux';
import store from './store';

class ReduxCart extends Component {
	render() {
		return (
			// Now we are not going to use react store to manage our app states any more, instead we will be using redux-store
			// Thus we need to migrate all the states of our react app to redux-store and use from that whenever needed
			// For this puropose, we will use <Provider /> component from react-redux which will read redux-store and supply all the states to our app.

			<Provider store={store}>
				<div className="container">
					<h2>Ecommerce Shopping Cart Application</h2>
					<div className="row">
						<Filter />
						<hr />
						<div className="col-md-8">
							<Products />
						</div>
						<div className="col-md-4">
							<Basket />
						</div>
					</div>
				</div>
			</Provider>
		);
	}
}

export default ReduxCart;
