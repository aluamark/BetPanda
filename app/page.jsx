import Games from "@/components/Games/Games";
import Promos from "@/components/Promos/Promos";
import Matches from "@/components/Matches/Matches";

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col xl:flex-row gap-5 text-neutral-200 pt-20 xl:pt-0 text-sm md:px-5">
			<Games />
			<div className="flex flex-col gap-5 w-full pb-10 xl:pt-20">
				<Promos />
				<Matches game={"all"} />
			</div>
		</main>
	);
}
