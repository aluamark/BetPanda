import React from "react";
import Date from "../Date";
import GameImage from "../GameImage";
import League from "../League";
import Opponent from "../Opponent";

const PastMatch = ({ match }) => {
	return (
		<div className="relative flex justify-between items-center gap-5 p-3 md:p-5 w-full md:hover:bg-neutral-900">
			<Date date={match.end_at} />

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
						<span
							className={`flex text-end md:font-bold ${
								match.winner_id === match.opponents[0].opponent.id
									? "text-green-500"
									: "text-red-500"
							}`}
						>
							{match.opponents[0].opponent.name}
						</span>
						<Opponent
							opponent={match.opponents[0].opponent}
							game={match.videogame.name}
						/>
						<span className="font-bold">{match.results[0].score}</span>
					</div>

					<div className="flex justify-center items-center w-1/2 md:w-1/3">
						{match.number_of_games === 2 ? (
							"Odds Button"
						) : (
							<div className="flex flex-col justify-center items-center">
								<span className="capitalize">BO{match.number_of_games}</span>
								<span>
									{match.forfeit
										? "Forfeit"
										: match.status === "canceled"
										? "Canceled"
										: "VS"}
								</span>
							</div>
						)}
					</div>

					<div className="flex items-center gap-3 w-full">
						<span className="font-bold">{match.results[1].score}</span>

						<Opponent
							opponent={match.opponents[1].opponent}
							game={match.videogame.name}
						/>
						<span
							className={`block md:font-bold ${
								match.winner_id === match.opponents[1].opponent.id
									? "text-green-500"
									: "text-red-500"
							}`}
						>
							{match.opponents[1].opponent.name}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PastMatch;
