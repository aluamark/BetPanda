import React from "react";
import Image from "next/image";
import GameImage from "./GameImage";

const Opponent = ({ opponent, game }) => {
	return (
		<>
			{opponent.image_url ? (
				<div className="hidden md:flex flex-none">
					<Image
						src={opponent.image_url}
						alt={opponent.name}
						width={24}
						height={24}
						className="w-[24px] h-[24px] object-contain"
					/>
				</div>
			) : (
				<GameImage game={game} size={24} />
			)}
		</>
	);
};

export default Opponent;
