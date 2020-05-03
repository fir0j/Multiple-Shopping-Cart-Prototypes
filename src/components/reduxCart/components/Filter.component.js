import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts, sortProducts } from '../acions/productActions';

class Filter extends Component {
	render() {
		//getting or accessing following props passed from its parent component and destructuring them
		// without destructuring, you can access properties as this.props.count

		return (
			<div className="row">
				<div className="col-md-4">{this.props.filteredProducts.length} products found.</div>
				<div className="col-md-4">
					<label>
						Order by
						<select
							className="form-control"
							value={this.props.products.priceType}
							onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}
						>
							<option value="">Select</option>
							<option value="Lowest">Lowest to Highest</option>
							<option value="Highest">Highest to Lowest</option>
						</select>
					</label>
				</div>
				<div className="col-md-4">
					<label>
						Filter Item
						<select
							className="form-control"
							value={this.props.products.itemType}
							onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}
						>
							<option value="">Select</option>
							<option value="pizza">pizza</option>
							<option value="burger">burger</option>
							<option value="pasta">pasta</option>
							<option value="sandwitch">sandwitch</option>
						</select>
					</label>
				</div>
			</div>
		);
	}
}

// see whenever we need any state, we are accessing from the redux-global-store called state here.
// or say we are importing our component's state from the redux-store so that we can use here.

const mapStateToProps = (state) => ({
	itemType: state.products.itemType,
	sortBy: state.products.sortBy,
	products: state.products.items,
	filteredProducts: state.products.filteredItems
});

// also whenever we need any actions or bussiness login, we are import from xyzActions and extracting that action in connect component.
export default connect(mapStateToProps, { filterProducts, sortProducts })(Filter);
