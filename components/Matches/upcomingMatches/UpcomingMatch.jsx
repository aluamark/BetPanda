import React, { useContext } from "react";
import { BetSlipContext } from "@/app/providers";
import Date from "../Date";
import GameImage from "../GameImage";
import League from "../League";
import OddsButton from "../OddsButton";
import Opponent from "../Opponent";

const UpcomingMatch = ({ match }) => {
	const { betSlip, addBetToSlip, removeBetToSlip } = useContext(BetSlipContext);

	const handleAddToBetSlip = (
		matchId,
		beginAt,
		videogame,
		league,
		numberOfGames,
		team1,
		team2,
		selectedTeam,
		odds,
		status,
		winner
	) => {
		const isAlreadyInBetSlip = betSlip.some((bet) => bet.matchId === matchId);

		if (isAlreadyInBetSlip) {
			removeBetToSlip(matchId);
		} else {
			addBetToSlip(
				matchId,
				beginAt,
				videogame,
				league,
				numberOfGames,
				team1,
				team2,
				selectedTeam,
				odds,
				status,
				winner
			);
		}
	};

	return (
		<div className="relative flex justify-between items-center gap-5 p-3 md:p-5 w-full md:hover:bg-neutral-900">
			<Date date={match.begin_at} />

			<span className="hidden lg:flex items-center gap-5 w-96">
				<GameImage game={match.videogame.name} size={32} />
				<League
					league={match.league.name + " " + match.serie.full_name}
					games={match.number_of_games}
				/>
			</span>

			<div className="flex flex-col gap-3 w-full">
				<div className="lg:hidden flex flex-col justify-center items-center w-[70%] mx-auto text-center text-neutral-400">
					<span className="text-xs">
						[{match.videogame.name}]{" "}
						{match.league.name + " " + match.serie.full_name}
					</span>
					<span className="font-semibold">
						{match.number_of_games === 2
							? "Match winner 3-way"
							: "Match winner"}
					</span>
				</div>

				<div className="flex justify-center items-center gap-1.5">
					<div className="flex justify-end items-center gap-3 w-full">
						<span className="hidden md:flex text-end font-bold">
							{match.opponents[0].opponent.name}
						</span>
						<Opponent
							opponent={match.opponents[0].opponent}
							game={match.videogame.name}
						/>
						<OddsButton
							onClick={() =>
								handleAddToBetSlip(
									match.id,
									match.begin_at,
									match.videogame.name,
									match.league.name,
									match.number_of_games,
									{
										id: match.opponents[0].opponent.id,
										name: match.opponents[0].opponent.name,
									},
									{
										id: match.opponents[1].opponent.id,
										name: match.opponents[1].opponent.name,
									},
									{
										id: match.opponents[0].opponent.id,
										name: match.opponents[0].opponent.name,
									},
									1.95,
									match.status,
									{ id: null, name: null }
								)
							}
							matchId={match.id}
							odds="1.95"
							name={match.opponents[0].opponent.name}
						/>
					</div>

					<div className="flex justify-center items-center w-1/2 md:w-1/3">
						{match.number_of_games === 2 ? (
							<OddsButton
								onClick={() =>
									handleAddToBetSlip(
										match.id,
										match.begin_at,
										match.videogame.name,
										match.league.name,
										match.number_of_games,
										{
											id: match.opponents[0].opponent.id,
											name: match.opponents[0].opponent.name,
										},
										{
											id: match.opponents[1].opponent.id,
											name: match.opponents[1].opponent.name,
										},
										{
											id: 0,
											name: "DRAW",
										},
										3.9,
										match.status,
										{ id: null, name: null }
									)
								}
								matchId={match.id}
								odds="3.90"
								name="DRAW"
							/>
						) : (
							<div className="flex flex-col justify-center items-center">
								<span className="capitalize">BO{match.number_of_games}</span>
								<span>VS</span>
							</div>
						)}
					</div>

					<div className="flex items-center gap-3 w-full">
						<OddsButton
							onClick={() =>
								handleAddToBetSlip(
									match.id,
									match.begin_at,
									match.videogame.name,
									match.league.name,
									match.number_of_games,
									{
										id: match.opponents[0].opponent.id,
										name: match.opponents[0].opponent.name,
									},
									{
										id: match.opponents[1].opponent.id,
										name: match.opponents[1].opponent.name,
									},
									{
										id: match.opponents[1].opponent.id,
										name: match.opponents[1].opponent.name,
									},
									1.95,
									match.status,
									{ id: null, name: null }
								)
							}
							matchId={match.id}
							odds="1.95"
							name={match.opponents[1].opponent.name}
						/>
						<Opponent
							opponent={match.opponents[1].opponent}
							game={match.videogame.name}
						/>
						<span className="hidden md:block font-bold">
							{match.opponents[1].opponent.name}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpcomingMatch;
