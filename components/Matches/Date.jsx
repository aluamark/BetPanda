import React from "react";
import formatDate from "@/utils/formatDate";

const Date = ({ date }) => {
	const dateString = formatDate(date);
	const beginDate = dateString.split(",");

	return (
		<div className="absolute top-3 md:static flex-none w-12">
			<div className="flex flex-col justify-center text-xs">
				{beginDate
					.slice()
					.reverse()
					.map((string, index) => {
						return (
							<span
								key={index}
								className={index === 0 ? "font-semibold text-[10px]" : ""}
							>
								{string}
							</span>
						);
					})}
			</div>
		</div>
	);
};

export default Date;
