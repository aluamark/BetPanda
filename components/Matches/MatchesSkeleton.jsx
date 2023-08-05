import React from "react";

const MatchesSkeleton = () => {
	return (
		<div className="bg-zinc-900 rounded-lg">
			<div className="p-3 md:p-5">
				<div className="h-5 w-20 bg-zinc-800 animate-pulse"></div>
			</div>
			<div className="flex flex-col w-full">
				{Array.from({ length: 10 }, (_, index) => (
					<div
						key={index}
						className="flex flex-col divide-y divide-zinc-800 border-t border-zinc-800 w-full animate-pulse"
					>
						<div className="relative flex justify-between items-center gap-5 p-3 md:p-5 w-full md:hover:bg-neutral-900">
							<div className="absolute top-3 md:static flex-none w-12">
								<div className="h-[40px] w-[40px] bg-zinc-800 rounded-lg"></div>
							</div>

							<span className="hidden lg:flex items-center gap-5 w-96">
								<div className="hidden md:flex flex-none rounded-full w-[40px] h-[40px] bg-zinc-800"></div>
								<div className="flex flex-col w-full">
									<span className="w-full h-10 bg-zinc-800 rounded-lg"></span>
								</div>
							</span>

							<div className="flex flex-col gap-3 w-full">
								<div className="lg:hidden flex flex-col justify-center items-center w-[70%] mx-auto text-center">
									<span className="w-40 h-10 bg-zinc-800 rounded-lg"></span>
								</div>

								<div className="flex justify-center items-center gap-1.5">
									<div className="flex justify-end items-center gap-3 w-full">
										<span className="hidden md:flex w-20 h-5 bg-zinc-800 rounded-lg"></span>
										<div className="hidden md:flex flex-none w-[24px] h-[24px] bg-zinc-800 rounded-full"></div>
										<button className="flex-none py-1.5 w-full md:w-20 h-[50px] md:h-[36px] bg-zinc-800 rounded-lg"></button>
									</div>

									<div className="flex justify-center items-center w-1/2 md:w-1/3">
										<div className="flex flex-col justify-center items-center">
											<span className="w-10 h-10 bg-zinc-800 rounded-lg"></span>
										</div>
									</div>

									<div className="flex items-center gap-3 w-full">
										<button className="flex-none py-1.5 w-full md:w-20 h-[50px] md:h-[36px] bg-zinc-800 rounded-lg"></button>
										<div className="hidden md:flex flex-none w-[24px] h-[24px] bg-zinc-800 rounded-full"></div>
										<span className="hidden md:flex w-20 h-5 bg-zinc-800 rounded-lg"></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MatchesSkeleton;
