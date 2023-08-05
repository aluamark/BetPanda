"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import gamesList from "./gamesList";
import { motion } from "framer-motion";

const Games = () => {
	const { game: gameCode } = useParams();

	const selectedGame = gamesList.find((game) => game.code === gameCode);

	return (
		<aside className="xl:min-w-[250px] relative">
			<div className="sticky top-20 flex flex-col gap-5">
				<div className="grid grid-cols-5 md:grid-cols-10 xl:flex flex-col gap-1 bg-zinc-900 p-1.5 md:p-3 rounded-lg">
					{gamesList.map((game, index) => {
						return (
							<Link
								key={index}
								className={`flex justify-center items-center xl:justify-normal gap-2.5 p-1 md:p-1.5 duration-300 cursor-pointer rounded-lg hover:bg-zinc-800${
									gameCode === game.code
										? " bg-gradient-to-r from-green-900 font-bold"
										: ""
								}`}
								href={game.page}
							>
								{index === 0 ? (
									game.image
								) : (
									<div className="">
										<Image
											src={game.image}
											alt={game.title}
											width={30}
											height={30}
										/>
									</div>
								)}

								<span className="hidden xl:block">{game.title}</span>
							</Link>
						);
					})}
				</div>

				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					className="hidden xl:flex justify-center"
				>
					<Image
						src={selectedGame?.pageImage}
						width={200}
						height={200}
						alt={selectedGame?.title}
						unoptimized
						className="w-[200px] h-[200px] object-contain rounded-lg"
					/>
				</motion.div>
			</div>
		</aside>
	);
};

export default Games;
