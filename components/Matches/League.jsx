import React from "react";

const League = ({ league, games }) => {
	return (
		<div className="flex flex-col text-neutral-400">
			<span className="font-semibold">
				{games === 2 ? "Match winner 3-way" : "Match winner"}
			</span>
			<span className="text-xs">{league}</span>
		</div>
	);
};

export default League;
