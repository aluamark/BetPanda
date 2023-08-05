import React from "react";
import formatDate from "@/utils/formatDate";

const Header = ({ bet }) => {
	return (
		<div className="flex flex-col gap-3 md:gap-5 py-3 md:py-5">
			<div
				className={`flex justify-between px-4 border-x-4 ${
					bet.betSlip[0].betStatus === "win"
						? "border-green-500"
						: bet.betSlip[0].betStatus === "lose"
						? "border-red-500"
						: "border-neutral-300"
				}`}
			>
				<div className="flex flex-col font-bold">
					<div className="flex flex-col md:flex-row text-zinc-400 text-xs">
						<span>ID {bet.betSlip[0].matchId}</span>{" "}
						<span>
							{formatDate(bet.betSlip[0].beginAt).split(",").join(" ")}
						</span>
					</div>
					<span className="hidden md:block font-bold">
						[{bet.betSlip[0].videogame}] {bet.betSlip[0].team1.name} -{" "}
						{bet.betSlip[0].team2.name}
					</span>
					<div className="hidden md:block text-xs">
						<span className="text-neutral-400">Match Winner:</span>{" "}
						<span>{bet.betSlip[0].selectedTeam.name}</span>
					</div>
				</div>
				{bet.betSlip[0].status !== "settled" ? (
					<span className="text-zinc-400 text-xs">Unsettled</span>
				) : (
					<div className="flex flex-col items-end">
						<span className="capitalize text-zinc-400 text-xs">Winner</span>
						<span className="text-end font-bold text-sm">
							{bet.betSlip[0].winner.name}
						</span>
					</div>
				)}
			</div>

			<div className="md:hidden flex gap-5 text-xs px-5">
				<div className="flex flex-col w-3/4 font-bold">
					<span className="font-bold">
						[{bet.betSlip[0].videogame}] {bet.betSlip[0].team1.name} -{" "}
						{bet.betSlip[0].team2.name}
					</span>
					<div className="text-xs">
						<span className="text-neutral-400">Match Winner:</span>{" "}
						<span>{bet.betSlip[0].selectedTeam.name}</span>
					</div>
				</div>
				<div className="flex flex-col items-end w-1/4">
					<span
						className={`${
							bet.betSlip[0].betStatus === "win"
								? "text-green-500"
								: bet.betSlip[0].betStatus === "lose"
								? "text-red-500"
								: "text-neutral-300"
						}`}
					>
						{bet.betSlip[0].betStatus === "win"
							? "WIN"
							: bet.betSlip[0].betStatus === "lose"
							? "LOSE"
							: ""}
					</span>
					<span
						className={`font-bold ${
							bet.betSlip[0].betStatus === "win"
								? "text-green-500"
								: bet.betSlip[0].betStatus === "lose"
								? "text-red-500"
								: "text-neutral-300"
						}`}
					>
						{bet.amount}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
