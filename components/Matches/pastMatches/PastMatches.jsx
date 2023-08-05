"use client";
import React from "react";
import { useParams } from "next/navigation";
import PastMatch from "./PastMatch";
import MatchesSkeleton from "../MatchesSkeleton";

import usePastMatchesQuery from "@/utils/react-query/usePastMatchesQuery";

const PastMatches = () => {
	const { game } = useParams();

	const {
		data: matches,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
	} = usePastMatchesQuery(game);

	return status === "loading" ? (
		<MatchesSkeleton />
	) : status === "error" ? (
		<div className="bg-zinc-900 rounded-lg">
			<h2 className="p-3 md:p-5">Past Matches</h2>
			<div className="flex justify-center items-center gap-3 p-3 md:p-5 border-t border-zinc-800">
				Matches not found. Please try again.{" "}
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
					className="animate-pulse"
				>
					<path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
					<path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
					<path d="M6 6h.01" />
					<path d="M6 18h.01" />
					<path d="m13 6-4 6h6l-4 6" />
				</svg>
			</div>
		</div>
	) : (
		<section className="flex flex-col gap-5">
			<div className="bg-zinc-900 rounded-lg">
				<h2 className="p-3 md:p-5">Past Matches</h2>
				<div className="flex flex-col w-full">
					{matches.pages.map((page, i) => (
						<div
							key={i}
							className="flex flex-col divide-y divide-zinc-800 border-t border-zinc-800 w-full"
						>
							{page.length !== 0 ? (
								page.map((match) => {
									if (match.opponents.length === 2)
										return <PastMatch key={match.id} match={match} />;
								})
							) : (
								<div className="p-3 md:p-5 text-center">
									No more matches to load at the moment.
								</div>
							)}
						</div>
					))}
				</div>
			</div>
			{matches.pages[matches.pages.length - 1].length !== 0 && (
				<button
					onClick={() => fetchNextPage()}
					disabled={!hasNextPage || isFetchingNextPage}
					className="flex justify-center py-3 w-full border-2 border-zinc-600 text-zinc-500 hover:text-zinc-300 duration-300 font-bold rounded-lg"
				>
					{isFetchingNextPage ? (
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
					) : hasNextPage ? (
						"MORE MATCHES"
					) : (
						"Nothing more to load"
					)}
				</button>
			)}
		</section>
	);
};

export default PastMatches;
