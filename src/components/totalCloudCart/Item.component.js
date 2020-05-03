import React, { Component } from 'react';

export default class Item extends Component {
	render() {
		const { foodItem, handleClickToSelect, menuItemSelected, isSelected } = this.props;

		const selected = isSelected && foodItem.id === menuItemSelected.id ? 'card isSelected' : 'card';

		const Item = () => {
			return (
				<div className={selected} onClick={() => handleClickToSelect(foodItem)}>
					<div
						className="card-photo"
						style={{
							backgroundImage: `url(${foodItem.photoUrl})`
						}}
					/>

					{/* <img src="https://fakeimg.pl/250x100/ff0000/" alt="pizza" /> */}
					{/* <img src={require('../images/pizza.jpeg')} alt="pizza" /> */}
					<h3 className="name">{foodItem.name}</h3>
					<h4 className="price">${foodItem.price}</h4>
				</div>
			);
		};

		return (
			<div>
				<Item />
			</div>
		);
	}
}
