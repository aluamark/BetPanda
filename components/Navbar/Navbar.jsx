"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import useUserQuery from "@/utils/react-query/useUserQuery";
import { motion, AnimatePresence } from "framer-motion";
import GoogleSignInButton from "./GoogleSignInButton";
import NavbarToggle from "./NavbarToggle";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
	const { data: session } = useSession();
	const { data: user } = useUserQuery();

	const [scrolled, setScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 0;
			setScrolled(isScrolled);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav className="z-50 fixed top-0 w-full text-neutral-300">
			<div
				className={`flex justify-between items-center w-full h-14 px-5 bg-zinc-900 transition duration-500${
					scrolled && " shadow-xl"
				}`}
			>
				<Link href="/" className="flex items-center gap-1">
					<div className="flex items-center gap-1">
						<Image
							src="/BetPandaLogo.png"
							alt="bet-panda-logo"
							width={50}
							height={50}
						/>
						<Image
							src="/BetPandaLight.png"
							alt="bet-panda-name"
							width={100}
							height={50}
							className="h-[50px] object-cover"
						/>
					</div>
				</Link>

				<div className="hidden md:flex items-center divide-x divide-zinc-800">
					{session && session.user ? (
						<>
							{user && user.data && (
								<div className="flex items-center gap-3 text-green-500 font-semibold pr-3">
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
										<circle cx="8" cy="8" r="6" />
										<path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
										<path d="M7 6h1v4" />
										<path d="m16.71 13.88.7.71-2.82 2.82" />
									</svg>
									<span>{user.data.balance.toFixed(2)} BP</span>
								</div>
							)}
							<div className="flex items-center gap-3 pl-3">
								<Link
									href="/bets"
									className="border-2 border-green-800 rounded-full hover:bg-zinc-800 p-1.5"
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
										className="stroke-yellow-500"
									>
										<path d="M16 22h2c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3" />
										<polyline points="14 2 14 8 20 8" />
										<circle cx="8" cy="16" r="6" />
										<path d="M9.5 17.5 8 16.25V14" />
									</svg>
								</Link>
								<button
									onClick={() =>
										signOut({
											callbackUrl: `${window.location.origin}`,
										})
									}
									className="border-2 border-green-800 rounded-full hover:bg-zinc-800 p-1.5"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="stroke-red-500"
									>
										<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
										<polyline points="16 17 21 12 16 7" />
										<line x1="21" x2="9" y1="12" y2="12" />
									</svg>
								</button>
							</div>
						</>
					) : (
						<div className="flex gap-1">
							<button
								className="flex items-center gap-1 px-5 py-1 bg-gradient-to-t from-zinc-800 to-zinc-600 hover:text-green-400 focus:text-green-500 border-2 border-zinc-800 focus:border-green-600 duration-300 rounded-lg font-semibold text-sm shadow-xl"
								onClick={() => {
									setIsSignUpModalOpen(false);
									setIsLoginModalOpen(true);
								}}
							>
								LOGIN
							</button>

							<button
								className="flex items-center gap-1 px-5 py-1 bg-gradient-to-t from-yellow-800 to-yellow-600 border-2 border-zinc-800 focus:border-yellow-600 hover:text-neutral-100 text-sm duration-300 rounded-lg shadow-xl font-semibold"
								onClick={() => {
									setIsLoginModalOpen(false);
									setIsSignUpModalOpen(true);
								}}
							>
								REGISTER
							</button>
						</div>
					)}
				</div>

				<div
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="md:hidden cursor-pointer"
				>
					<NavbarToggle isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
				</div>
			</div>
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="md:hidden flex flex-col gap-1.5 p-5 bg-zinc-800"
					>
						{session && session.user ? (
							<>
								{user && user.data && (
									<div className="flex items-center gap-3 text-green-500 font-semibold px-1.5 pb-1.5">
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
											<circle cx="8" cy="8" r="6" />
											<path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
											<path d="M7 6h1v4" />
											<path d="m16.71 13.88.7.71-2.82 2.82" />
										</svg>
										<span>{user.data.balance.toFixed(2)} BP</span>
									</div>
								)}
								<Link
									onClick={() => setIsMenuOpen(false)}
									href="/bets"
									className="flex items-center gap-3 hover:bg-zinc-700 p-1.5 rounded-lg text-sm"
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
										className="stroke-yellow-500"
									>
										<path d="M16 22h2c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3" />
										<polyline points="14 2 14 8 20 8" />
										<circle cx="8" cy="16" r="6" />
										<path d="M9.5 17.5 8 16.25V14" />
									</svg>
									Bet History
								</Link>
								<button
									onClick={() =>
										signOut({
											callbackUrl: `${window.location.origin}`,
										})
									}
									className="flex items-center gap-3 hover:bg-zinc-700 p-1.5 rounded-lg text-sm"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="stroke-red-500"
									>
										<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
										<polyline points="16 17 21 12 16 7" />
										<line x1="21" x2="9" y1="12" y2="12" />
									</svg>
									Logout
								</button>
							</>
						) : (
							<div className="flex flex-col gap-3">
								<button
									className="flex justify-center items-center gap-1 px-5 py-3 bg-gradient-to-t from-zinc-800 to-zinc-600 hover:text-green-400 focus:text-green-500 border-2 border-zinc-800 focus:border-green-600 duration-300 rounded-lg font-semibold text-sm shadow-xl"
									onClick={() => {
										setIsMenuOpen(false);
										setIsSignUpModalOpen(false);
										setIsLoginModalOpen(true);
									}}
								>
									LOGIN
								</button>

								<button
									className="flex justify-center items-center gap-1 px-5 py-3 bg-gradient-to-t from-yellow-800 to-yellow-600 border-2 border-zinc-800 focus:border-yellow-600 hover:text-neutral-100 text-sm duration-300 rounded-lg shadow-xl font-semibold"
									onClick={() => {
										setIsMenuOpen(false);
										setIsLoginModalOpen(false);
										setIsSignUpModalOpen(true);
									}}
								>
									REGISTER
								</button>
								<GoogleSignInButton />
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			<LoginModal
				isOpen={isLoginModalOpen}
				setIsOpen={setIsLoginModalOpen}
				setIsSignUpModalOpen={setIsSignUpModalOpen}
			/>
			<SignUpModal
				isOpen={isSignUpModalOpen}
				setIsOpen={setIsSignUpModalOpen}
				setIsLoginModalOpen={setIsLoginModalOpen}
			/>
		</nav>
	);
};

export default Navbar;
