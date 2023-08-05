"use client";
import React, { useState } from "react";

import UpcomingMatches from "./upcomingMatches/UpcomingMatches";
import RunningMatches from "./runningMatches/RunningMatches";
import PastMatches from "./pastMatches/PastMatches";

const Matches = () => {
	const [tab, setTab] = useState("upcoming");

	const handleChangeTab = (tab) => {
		setTab(tab);
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="flex">
				<div className="bg-zinc-900 rounded font-semibold">
					<button
						onClick={() => handleChangeTab("upcoming")}
						className={`border-2 px-3 py-1 rounded text-neutral-300 hover:text-neutral-100 duration-100 ${
							tab === "upcoming"
								? "border-green-800 text-neutral-200"
								: "border-zinc-900"
						}`}
					>
						UPCOMING
					</button>
					<button
						onClick={() => handleChangeTab("running")}
						className={`border-2 px-3 py-1 rounded text-neutral-300 hover:text-neutral-100 duration-100 ${
							tab === "running"
								? "border-green-800 text-neutral-200"
								: "border-zinc-900"
						}`}
					>
						RUNNING
					</button>
					<button
						onClick={() => handleChangeTab("past")}
						className={`border-2 px-3 py-1 rounded text-neutral-300 hover:text-neutral-100 duration-100 ${
							tab === "past"
								? "border-green-800 text-neutral-200"
								: "border-zinc-900"
						}`}
					>
						SETTLED
					</button>
				</div>
			</div>

			{tab === "upcoming" ? (
				<UpcomingMatches />
			) : tab === "running" ? (
				<RunningMatches />
			) : (
				<PastMatches />
			)}
		</div>
	);
};

export default Matches;
