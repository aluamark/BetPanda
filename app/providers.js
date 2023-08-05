"use client";
import React, { useState, createContext } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const BetSlipContext = createContext();

export default function Providers({ children }) {
	const [queryClient] = useState(() => new QueryClient());
	const [betSlip, setBetSlip] = useState([]);

	const addBetToSlip = (
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
		const isDuplicate = betSlip.some((bet) => bet.matchId === matchId);
		if (!isDuplicate) {
			setBetSlip((prevBetSlip) => [
				...prevBetSlip,
				{
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
					winner,
				},
			]);
		}
	};

	const removeBetToSlip = (matchId) => {
		const filteredBetSlip = betSlip.filter((bet) => bet.matchId !== matchId);
		setBetSlip(filteredBetSlip);
	};

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<BetSlipContext.Provider
					value={{ betSlip, setBetSlip, addBetToSlip, removeBetToSlip }}
				>
					{children}
					<ReactQueryDevtools initialIsOpen={false} />
				</BetSlipContext.Provider>
			</QueryClientProvider>
		</SessionProvider>
	);
}
