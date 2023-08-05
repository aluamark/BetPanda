"use client";
import React, { useState, useContext, useEffect } from "react";
import { BetSlipContext } from "@/app/providers";

const OddsButton = ({ onClick, matchId, odds, name }) => {
	const { betSlip } = useContext(BetSlipContext);

	const [match, setMatch] = useState(null);

	useEffect(() => {
		const selectedMatch = betSlip.find((bet) => bet.matchId === matchId);
		setMatch(selectedMatch);
	}, [betSlip, matchId]);

	const isInBetSlip = match?.selectedTeam?.name === name;

	return (
		<button
			onClick={onClick}
			className={`flex flex-col flex-none items-center py-1.5 w-full md:w-20 bg-gradient-to-t from-zinc-800 to-zinc-600 border-2 duration-100 rounded-lg ${
				isInBetSlip
					? "border-green-400 text-green-400"
					: "hover:text-green-500 border-zinc-800"
			}`}
		>
			<span className="font-semibold">{odds}</span>
			<p className="md:hidden text-xs">
				{name.length > 18 ? `${name.slice(0, 15)}...` : name}
			</p>
		</button>
	);
};

export default OddsButton;
