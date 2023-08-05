import React from "react";

const Bet = ({ bet, removeBetToSlip }) => {
	return (
		<div
			key={bet.matchId}
			className="flex flex-col bg-zinc-900 p-3 rounded-lg text-sm"
		>
			<div className="flex justify-between items-center gap-3 font-bold">
				{`${bet.team1.name} vs ${bet.team2.name}`}
				<button onClick={() => removeBetToSlip(bet.matchId)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="4"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="flex-none stroke-red-500 hover:stroke-red-600 cursor-pointer"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>
			</div>
			<span className="pt-3 text-xs">MATCH WINNER</span>
			<div className="flex justify-between font-bold">
				<span className="text-green-500">{bet.selectedTeam.name}</span>
				<span>{bet.odds.toFixed(2)}</span>
			</div>
		</div>
	);
};

export default Bet;
