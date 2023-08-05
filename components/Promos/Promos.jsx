import React from "react";
import Image from "next/image";

const ImageLoader = () => (
	<div className="flex justify-center h-[210px] bg-zinc-800 rounded-lg animate-pulse"></div>
);

const Promos = () => {
	return (
		<section className="hidden xl:block bg-zinc-900 p-5 rounded-lg">
			<div className="flex justify-center bg-[#03020A] h-full rounded-lg">
				<Image
					loader={<ImageLoader />}
					src="/promos/promo1.png"
					width={1300}
					height={300}
					alt="promo1"
					unoptimized
					className="w-auto h-auto object-cover rounded-lg"
				/>
			</div>
		</section>
	);
};

export default Promos;
