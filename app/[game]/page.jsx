import Games from "@/components/Games/Games";
import Promos from "@/components/Promos/Promos";
import Matches from "@/components/Matches/Matches";

const Page = async () => {
	return (
		<div className="min-h-screen flex flex-col xl:flex-row gap-5 text-neutral-300 pt-20 xl:pt-0 text-sm md:px-5">
			<Games />
			<div className="flex flex-col gap-5 w-full xl:pt-20 pb-10">
				<Promos />
				<Matches />
			</div>
		</div>
	);
};

export default Page;
