import { Schema, models, model } from "mongoose";

const betSchema = Schema({
	email: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	totalOdds: {
		type: Number,
		required: true,
	},
	possiblePayout: {
		type: Number,
		default: 0,
	},
	payout: {
		type: Number,
		default: 0,
	},
	status: {
		type: String,
		default: "unsettled",
	},
	betSlip: [
		{
			matchId: {
				type: Number,
				required: true,
			},
			status: {
				type: String,
				default: "not_started",
			},
			team1: {
				id: { type: Number, required: true },
				name: {
					type: String,
				},
			},
			team2: {
				id: { type: Number, required: true },
				name: {
					type: String,
				},
			},
			selectedTeam: {
				id: { type: Number, required: true },
				name: {
					type: String,
				},
			},
			winner: {
				id: {
					type: Number,
				},
				name: {
					type: String,
				},
			},
			betStatus: {
				type: String,
				default: "",
			},
			odds: {
				type: Number,
			},
			beginAt: {
				type: Date,
			},
			videogame: {
				type: String,
			},
			league: {
				type: String,
			},
			numberOfGames: {
				type: Number,
			},
		},
	],
});

const Bet = models.Bet || model("Bet", betSchema);

export default Bet;
