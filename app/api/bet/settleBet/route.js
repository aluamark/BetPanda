import { NextResponse } from "next/server";
import { getSettledMatches } from "@/utils/helper";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/User";
import Bet from "@/models/Bet";

export async function PUT(request) {
	await connectMongo();

	const users = await User.find().populate("bets");
	const settledMatches = await getSettledMatches();

	// Users from database loop
	for (let user of users) {
		// Bets of users loop
		for (let bet of user.bets) {
			// betSlip loop
			for (let betInfo of bet.betSlip) {
				const isMatchIdPresent = settledMatches.some(
					(match) => match.id === betInfo.matchId
				);

				if (isMatchIdPresent) {
					const matchedMatch = settledMatches.find(
						(match) => match.id === betInfo.matchId
					);

					const isMatchFinished = matchedMatch.status === "finished";
					const selectedTeamId = betInfo.selectedTeam.id;
					const winnerId = matchedMatch.winner.id;
					const winnerName = matchedMatch.winner.name;

					const betStatus = selectedTeamId === winnerId ? "win" : "lose";

					// If match is finished from settledMatches set settled
					if (isMatchFinished && betInfo.status !== "settled") {
						// Update the bet status to "settled"
						await Bet.findOneAndUpdate(
							{ _id: bet._id, "betSlip._id": betInfo._id },
							{
								$set: {
									"betSlip.$.status": "settled",
									"betSlip.$.winner": { id: winnerId, name: winnerName },
									"betSlip.$.betStatus": betStatus,
								},
							},
							{ new: true }
						);

						console.log(
							`Settled [${betInfo.team1.name}] vs [${betInfo.team2.name}]`
						);
					}
				}
			}

			const betDocument = await Bet.findById(bet._id);

			// Check if all the bets in the betSlip are settled
			const allBetSlipsSettled = betDocument.betSlip.every(
				(betMatch) => betMatch.status === "settled"
			);

			// Check if bet status is unsettled
			if (allBetSlipsSettled && bet.status === "unsettled") {
				const allBetsWon = betDocument.betSlip.every(
					(betMatch) => betMatch.betStatus === "win"
				);

				// Add balance to the user if all bets are won
				if (allBetsWon) {
					// Refetch user then update balance
					const refetchedUser = await User.findById(user._id);

					console.log(`${user.email} balance: ${refetchedUser.balance}`);

					const updatedBalance = refetchedUser.balance + bet.possiblePayout;

					refetchedUser.balance = updatedBalance;
					const updatedUser = await refetchedUser.save();

					// Update bet.payout to bet.possiblePayout
					await Bet.findByIdAndUpdate(bet._id, {
						$set: { status: "win", payout: bet.possiblePayout },
					});

					console.log(
						`User ${user.email} has won ${bet.possiblePayout} in bet[${bet._id}].`
					);
					console.log(`Updated balance: ${updatedUser.balance}`);
				} else {
					await Bet.findByIdAndUpdate(bet._id, {
						$set: { status: "lose" },
					});
				}
			}
		}
	}

	return NextResponse.json({ message: "Settled bets." });
}
