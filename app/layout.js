import "./globals.css";

import { Analytics } from "@vercel/analytics/react";

import Providers from "./providers";
import Navbar from "@/components/Navbar/Navbar";
import BetSlip from "@/components/BetSlip/BetSlip";
import Footer from "@/components/Footer/Footer";

export const metadata = {
	title: "BetPanda",
	description: "Bet. For. Fun.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="relative text-neutral-300 bg-slate-800 scroll-smooth select-none">
				<div id="root">
					<Providers>
						<Navbar />
						{children}
						<BetSlip />
						<Footer />
					</Providers>
				</div>
				<Analytics />
			</body>
		</html>
	);
}
