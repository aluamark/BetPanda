import React from "react";

const AddAmount = ({ title, addAmount, setAmount, disabled }) => {
	return (
		<button
			onClick={() => setAmount(addAmount)}
			className="bg-zinc-700 hover:bg-zinc-600 duration-300 px-3 py-1 rounded-full cursor-pointer disabled:opacity:50 disabled:cursor-not-allowed disabled:hover:bg-zinc-700"
			disabled={disabled}
		>
			{title}
		</button>
	);
};

export default AddAmount;
