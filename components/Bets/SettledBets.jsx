import React from "react";
import BetCard from "./BetCard";

const UnsettledBets = ({ user }) => {
	const settledBets = user.data.bets.filter(
		(bet) => bet.status !== "unsettled"
	);

	return (
		<div className="flex flex-col gap-3 w-full h-full pl-3 overflow-y-auto">
			<h2 className="text-xl font-bold">Settled Bets</h2>
			<div className="flex flex-col gap-3 h-full overflow-y-auto pr-3">
				{settledBets.length > 0 ? (
					settledBets
						.filter((bet) => bet.status !== "unsettled")
						.slice()
						.reverse()
						.map((bet, index) => {
							return <BetCard key={index} bet={bet} />;
						})
				) : (
					<span className="text-sm">No bet to settle.</span>
				)}
			</div>
		</div>
	);
};

export default UnsettledBets;
