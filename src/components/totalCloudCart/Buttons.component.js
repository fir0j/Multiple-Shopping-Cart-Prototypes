import React, { Component } from 'react';

export default class Buttons extends Component {
	render() {
		const { handleAddToCart, handleRemoveFromCart } = this.props;

		const AddButton = () => {
			return this.props.isSelectedFromMenu ? (
				<div>
					<button className="cartButton" onClick={handleAddToCart}>
						Add to cart >>
					</button>
				</div>
			) : (
				<div>
					<button className="cartButton buttonPassive">Add to cart >></button>
				</div>
			);
		};

		const RemoveButton = () => {
			return this.props.isSelectedFromCart ? (
				<div>
					<button
						className="cartButton buttonActive"
						onClick={handleRemoveFromCart}
					>{`<< Remove to cart`}</button>
				</div>
			) : (
				<div>
					<button className="cartButton buttonPassive">{`<< Remove to cart`}</button>
				</div>
			);
		};
		return (
			<div className="buttons">
				<AddButton />
				<RemoveButton />
			</div>
		);
	}
}
