"use client";
import React from "react";
import CarouselHeader from "./CarouselHeader";
import Header from "./Header";

const BetCard = ({ bet }) => {
	return (
		<div className="flex flex-col bg-zinc-800 rounded-lg">
			{bet.betSlip.length === 1 ? (
				<Header bet={bet} />
			) : (
				<CarouselHeader bet={bet} />
			)}

			<div className="hidden lg:flex flex-col border-t border-zinc-700 mx-5 py-3 md:py-5 font-semibold">
				<div className="flex justify-between">
					<span className="text-zinc-400">Status</span>
					<span
						className={`font-bold capitalize${
							bet.status === "win"
								? " text-green-500"
								: bet.status === "lose"
								? " text-red-500"
								: ""
						}`}
					>
						{bet.status}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-zinc-400">Stake</span>
					<span className="font-bold">{bet.amount.toFixed(2)} BP</span>
				</div>
				<div className="flex justify-between">
					<span className="text-zinc-400">Odds</span>
					<span className="font-bold">x{bet.totalOdds.toFixed(2)}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-zinc-400">Possible Payout</span>
					<span className="font-bold">{bet.possiblePayout.toFixed(2)} BP</span>
				</div>
				<div className="flex justify-between">
					<span className="text-zinc-400">WIN</span>
					<span
						className={`font-bold${bet.payout > 0 ? " text-green-500" : ""}`}
					>
						{bet.payout.toFixed(2)} BP
					</span>
				</div>
			</div>
		</div>
	);
};

export default BetCard;
