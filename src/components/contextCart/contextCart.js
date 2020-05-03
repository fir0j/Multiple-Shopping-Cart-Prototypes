import React, { useState, createContext, useContext } from 'react';

// Notice no class components, no render(), no props have been used, all eliminated by react hook
// but props can be used in conjunction with context

const items = [
	{ id: 1, name: 'Pizza', price: 250 },
	{ id: 2, name: 'Burger', price: 150 },
	{ id: 3, name: 'Sandwitch', price: 100 },
	{ id: 4, name: 'Tandoori', price: 300 },
	{ id: 5, name: 'Biryani', price: 200 }
];

// Context cannot be created inside a function, always meant to be created globally
// If local state needs to be passed, then overwrite the defaulValue of context
const cartContext = createContext(null);
const addToCartContext = createContext(null);
const resetCartContext = createContext([]);

/*  Naming each context for the reference in  devTool  */
cartContext.displayName = 'cartContext';
addToCartContext.displayName = 'addToCartContext';

export const ContextCart = () => {
	let [ cart, setCart ] = useState([]);

	// Both ES6 Function(arrow function) and Regular javascript function both works well.
	// Because hooks removes function binding overheads aswell.

	// Tomorrow ... How to pass function with context provider in the component tree?

	const addToCart = (item) => {
		return setCart([ ...cart, item ]);
	};

	const resetCart = () => setCart([]);

	return (
		<div>
			<cartContext.Provider value={cart}>
				<addToCartContext.Provider value={addToCart}>
					<resetCartContext.Provider value={resetCart}>
						<MenuItems testingPropsPassing="Menu" />
					</resetCartContext.Provider>
				</addToCartContext.Provider>
			</cartContext.Provider>
		</div>
	);
};

function MenuItems({ testingPropsPassing }) {
	const addToCart = useContext(addToCartContext);
	return (
		<div>
			<NavBar />
			<div className="container flex justify-center md:border md:rounded m-auto text-center text-gray-900">
				<div className="w-full md:max-w-sm px-1 border rounded bg-orange-300">
					{testingPropsPassing}
					{items.map((item) => (
						<div key={item.id} className="flex justify-between my-1 pl-1 bg-orange-400 border rounded">
							<div className="self-center text-gray-800">{item.name}</div>
							<div className="self-center text-green-700">Rs.{item.price}</div>
							<button
								onClick={() => addToCart(item)}
								className="p-1 border rounded bg-orange-500 hover:bg-orange-600 hover:text-green-900"
							>
								AddToCart
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function NavBar() {
	const cart = useContext(cartContext);
	const resetCart = useContext(resetCartContext);

	function calculateTotalCost(cart) {
		return cart.length > 0 ? cart.reduce((acc, item) => acc + item.price, 0).toFixed(2) : 0;
	}

	return (
		<div>
			<li className="container m-auto mb-4 py-1 flex justify-around bg-orange-400 text-gray-800 text-xs sm:text-base ">
				<ul>Shopping Cart</ul>
				<ul className="text-green-700">Total Items({cart.length})</ul>
				<span
					onClick={resetCart}
					className="px-1 ml-2 border border-orange-600 text-gray-800 opacity-25 hover:opacity-100 hover:text-red-800 cursor-pointer"
				>
					X
				</span>
				<ul className="text-green-700">Total Cost = {calculateTotalCost(cart)} </ul>
				<ul>Hello, firoj</ul>
			</li>
		</div>
	);
}
