import React from "react";
import BetCard from "./BetCard";

const SettledBets = ({ user }) => {
	const unsettledBets = user.data.bets.filter(
		(bet) => bet.status === "unsettled"
	);

	return (
		<div className="flex flex-col gap-3 w-full h-full overflow-y-auto pl-3">
			<h2 className="text-xl font-bold">Unsettled Bets</h2>
			<div className="flex flex-col gap-3 h-full overflow-y-auto pr-3">
				{unsettledBets.length > 0 ? (
					unsettledBets
						.slice()
						.reverse()
						.map((bet, index) => {
							return <BetCard key={index} bet={bet} />;
						})
				) : (
					<span className="text-sm">All bets settled.</span>
				)}
			</div>
		</div>
	);
};

export default SettledBets;
