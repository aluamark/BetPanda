"use client";
import React from "react";
import useUserQuery from "@/utils/react-query/useUserQuery";
import UnsettledBets from "./UnsettledBets";
import SettledBets from "./SettledBets";

const BetList = () => {
	const { data: user, isLoading } = useUserQuery();

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="animate-spin"
				>
					<line x1="12" x2="12" y1="2" y2="6" />
					<line x1="12" x2="12" y1="18" y2="22" />
					<line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
					<line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
					<line x1="2" x2="6" y1="12" y2="12" />
					<line x1="18" x2="22" y1="12" y2="12" />
					<line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
					<line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
				</svg>
			</div>
		);
	}

	return (
		<div className="h-full flex flex-col lg:flex-row gap-10">
			{user.data.bets.length !== 0 ? (
				<>
					<UnsettledBets user={user} />
					<SettledBets user={user} />
				</>
			) : (
				<div className="flex flex-col gap-5 px-3">
					<h2 className="text-xl font-bold">Bets</h2>
					<span>Bet list empty. Make your first bet!</span>
				</div>
			)}
		</div>
	);
};

export default BetList;
