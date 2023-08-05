import React from "react";
import Image from "next/image";
import Link from "next/link";
import footerLinks from "./footerLinks";

const Footer = () => {
	return (
		<footer className="bg-neutral-200 text-black p-8">
			<div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-5 justify-evenly">
				<div className="flex flex-col gap-1">
					<Link href="/" className="flex flex-none gap-1 h-[50px]">
						<Image
							src="/BetPandaLogo.png"
							alt="BetPandaLogo"
							width={50}
							height={50}
							className="w-[50px] h-[50px]"
						/>
						<Image
							src="/BetPandaDark.png"
							alt="BetPandaName"
							width={100}
							height={50}
							className="h-[50px] object-cover"
						/>
					</Link>
					<p className="text-xs">**footer links are not yet finished</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-5">
					{footerLinks.map((section, index) => {
						return (
							<div key={index} className="flex flex-col gap-2.5 text-sm">
								<span className="font-semibold">{section.title}</span>

								<div className="flex flex-col gap-1.5 text-xs">
									{section.links.map((link, index) => {
										return (
											<a href={link.url} key={index}>
												{link.title}
											</a>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
				<div className="flex flex-col gap-2.5 text-sm font-bold">
					<span>Age Restriction</span>
					<span className="text-5xl">18+</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
