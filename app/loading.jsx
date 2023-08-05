import React from "react";
import GamesSkeleton from "@/components/Games/GamesSkeleton";
import Promos from "@/components/Promos/Promos";
import MatchesSkeleton from "@/components/Matches/MatchesSkeleton";

const Loading = () => {
	return (
		<div className="min-h-screen flex flex-col xl:flex-row gap-5 text-neutral-200 pt-20 xl:pt-0 text-sm md:px-5">
			<GamesSkeleton />
			<div className="flex flex-col gap-5 w-full pb-10 xl:pt-20">
				<Promos />
				<div className="flex">
					<div className="bg-zinc-900 rounded font-semibold">
						<button className="border-2 px-3 py-1 rounded text-neutral-300 hover:text-neutral-100 duration-100 border-zinc-900">
							UPCOMING
						</button>
						<button className="border-2 px-3 py-1 rounded text-neutral-300 hover:text-neutral-100 duration-100 border-zinc-900">
							RUNNING
						</button>
						<button className="border-2 px-3 py-1 rounded text-neutral-300 hover:text-neutral-100 duration-100 border-zinc-900">
							SETTLED
						</button>
					</div>
				</div>

				<MatchesSkeleton />
			</div>
		</div>
	);
};

export default Loading;
