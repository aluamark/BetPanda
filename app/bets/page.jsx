import React from "react";
import BetList from "@/components/Bets/BetList";

const Page = () => {
	return (
		<div className="min-h-screen h-screen max-w-screen-sm lg:max-w-screen-xl mx-auto pt-20 pb-10 text-sm md:px-5">
			<div className="h-full bg-zinc-900 py-5 px-2 rounded-lg">
				<BetList />
			</div>
		</div>
	);
};

export default Page;
