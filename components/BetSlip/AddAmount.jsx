import React from "react";

const AddAmount = ({ title, addAmount, setAmount }) => {
	return (
		<button
			onClick={() => setAmount(addAmount)}
			className="bg-zinc-700 hover:bg-zinc-600 duration-300 px-3 py-1 rounded-full cursor-pointer"
		>
			{title}
		</button>
	);
};

export default AddAmount;
