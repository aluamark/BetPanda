"use client";
import React, { useEffect, useState, useRef } from "react";
import formatDate from "@/utils/formatDate";

const CarouselHeader = ({ bet }) => {
	const carouselRef = useRef(null);
	const [isScrollStart, setIsScrollStart] = useState(true);
	const [isScrollEnd, setIsScrollEnd] = useState(false);

	const scrollToLeft = () => {
		carouselRef.current.scrollBy({
			top: 0,
			left: -carouselRef.current.offsetWidth,
			behavior: "smooth",
		});
	};

	const scrollToRight = () => {
		carouselRef.current.scrollBy({
			top: 0,
			left: carouselRef.current.offsetWidth,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const container = carouselRef.current;
		const handleScroll = () => {
			const currentPosition = container.scrollLeft;
			setIsScrollStart(currentPosition === 0);
			setIsScrollEnd(
				currentPosition + container.clientWidth === container.scrollWidth
			);
		};

		container?.addEventListener("scroll", handleScroll);
		return () => {
			container?.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="relative flex flex-col">
			<div className="flex justify-between px-5 pt-5">
				<div className="flex flex-col">
					<span className="text-zinc-400 text-xs font-bold">Parlay</span>
					<span className="font-bold">{bet.betSlip.length} bets</span>
				</div>
				<div className="flex items-center gap-5 md:gap-10 text-xs">
					<button
						onClick={scrollToLeft}
						disabled={isScrollStart}
						className={`flex items-center pr-3 rounded-lg ${
							isScrollStart
								? "cursor-not-allowed text-zinc-500"
								: "bg-zinc-700 text-neutral-300 hover:bg-zinc-600"
						}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
						Previous
					</button>
					<button
						onClick={scrollToRight}
						disabled={isScrollEnd}
						className={`flex items-center pl-3 rounded-lg ${
							isScrollEnd
								? "cursor-not-allowed text-zinc-500"
								: "bg-zinc-700 text-neutral-300 hover:bg-zinc-600"
						}`}
					>
						Next
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</button>
				</div>
			</div>
			<div
				ref={carouselRef}
				className={`flex w-full overflow-x-hidden my-3 md:my-5`}
			>
				{bet.betSlip.map((bet) => (
					<div
						key={bet._id}
						className="flex flex-col flex-none gap-3 w-full justify-between"
					>
						<div
							className={`flex justify-between px-4 border-x-4 ${
								bet.betStatus === "win"
									? "border-green-500"
									: bet.betStatus === "lose"
									? "border-red-500"
									: "border-neutral-300"
							}`}
						>
							<div className="flex flex-col font-bold">
								<div className="flex flex-col md:flex-row text-zinc-400 text-xs">
									<span>ID {bet.matchId}</span>{" "}
									<span>{formatDate(bet.beginAt).split(",").join(" ")}</span>
								</div>
								<span className="hidden md:block font-bold">
									[{bet.videogame}] {bet.team1.name} - {bet.team2.name}
								</span>
								<div className="hidden md:block text-xs">
									<span className="text-neutral-400">Match Winner:</span>{" "}
									<span>{bet.selectedTeam.name}</span>
								</div>
							</div>
							{bet.status !== "settled" ? (
								<span className="text-zinc-400 text-xs">Unsettled</span>
							) : (
								<div className="flex flex-col items-end text-xs">
									<span className="capitalize text-zinc-400">Winner</span>
									<span className="text-end font-bold">{bet.winner.name}</span>
								</div>
							)}
						</div>

						<div className="md:hidden flex flex-col text-xs font-bold px-5">
							<span className="font-bold">
								[{bet.videogame}] {bet.team1.name} - {bet.team2.name}
							</span>
							<div className="text-xs">
								<span className="text-neutral-400">Match Winner:</span>{" "}
								<span>{bet.selectedTeam.name}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CarouselHeader;
