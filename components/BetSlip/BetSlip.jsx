"use client";
import React, { useState, useContext, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserQuery from "@/utils/react-query/useUserQuery";
import { placeBet } from "@/utils/helper";

import { motion, AnimatePresence } from "framer-motion";
import { BetSlipContext } from "@/app/providers";
import Bet from "./Bet";
import AddAmount from "./AddAmount";

import LoginModal from "../Navbar/LoginModal";
import SignUpModal from "../Navbar/SignUpModal";

const BetSlip = () => {
	const { betSlip, setBetSlip, removeBetToSlip } = useContext(BetSlipContext);
	const { data: session } = useSession();
	const { data: user } = useUserQuery();

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (betToPlace) => placeBet(betToPlace),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
	const [isLoading, setIsLoading] = useState(false);

	const [isOpen, setIsOpen] = useState(false);
	const [amount, setAmount] = useState(0);
	const [odds, setOdds] = useState(0);
	const [total, setTotal] = useState(0);
	const [noAmount, setNoAmount] = useState(false);

	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

	const handlePlaceBet = async () => {
		setIsLoading(true);
		if (amount !== 0 && amount !== "") {
			const betToPlace = {
				bet: {
					email: session.user.email,
					amount,
					totalOdds: odds,
					possiblePayout: total.toFixed(2),
					betSlip,
				},
			};

			mutation.mutate(betToPlace, {
				onSuccess: () => {
					setBetSlip([]);
					setAmount(0);
					setNoAmount(false);
					setIsLoading(false);
				},
			});
		} else {
			setNoAmount(true);
			setIsLoading(false);
		}
	};

	const handleAddAmount = (addAmount) => {
		if (addAmount) {
			const totalAmount = Number(amount) + addAmount;

			if (totalAmount <= user.data.balance) {
				setAmount(totalAmount);
			}
		} else {
			setAmount(user.data.balance);
		}
	};

	const calculateOdds = () => {
		if (betSlip.length === 1) {
			setOdds(betSlip[0].odds);
		} else if (betSlip.length > 1) {
			const totalOdds = betSlip.reduce(
				(accumulator, bet) => accumulator.toFixed(2) * bet.odds.toFixed(2),
				1
			);

			setOdds(totalOdds);
		} else {
			setOdds(0);
		}
	};

	const calculateTotal = () => {
		if (odds !== 0) {
			setTotal(Number(amount).toFixed(2) * odds.toFixed(2));
		} else {
			setTotal(0);
		}
	};

	useEffect(() => {
		calculateOdds();

		if (betSlip.length === 0) {
			setIsOpen(false);
		}
	}, [betSlip]);

	useEffect(() => {
		calculateTotal();
	}, [amount, odds]);

	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed bottom-24 right-5 max-w-screen-sm w-full"
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
					>
						<motion.div
							variants={{ collapsed: { scale: 0 }, open: { scale: 1 } }}
							transition={{ duration: 0.1 }}
							className="bg-zinc-800 text-neutral-300 border-2 border-zinc-700 rounded-lg ml-10 md:mx-0 p-5 text-sm origin-bottom-right"
						>
							<div className="flex flex-col gap-3 text-xs">
								<div
									className={`flex flex-col gap-3 overflow-y-auto${
										betSlip.length > 1 ? " h-44" : ""
									}`}
								>
									{betSlip.map((bet) => {
										return (
											<Bet
												key={bet.matchId}
												bet={bet}
												removeBetToSlip={removeBetToSlip}
											/>
										);
									})}
								</div>
								<div className="relative flex items-center">
									<input
										type="number"
										placeholder="ENTER AMOUNT"
										disabled={session && session.user ? false : true}
										className={`hide-arrows bg-zinc-800 border rounded-lg p-3 w-full focus:outline-none disabled:cursor-not-allowed ${
											noAmount ? "border-red-500" : "border-zinc-700"
										}`}
										value={amount === 0 ? "" : amount}
										onChange={(event) => {
											if (Number(event.target.value) <= user.data.balance) {
												setAmount(event.target.value);
											}

											setNoAmount(false);
										}}
									/>
									<button
										onClick={() => setAmount(0)}
										className="absolute right-3"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="4"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="flex-none stroke-red-500 hover:stroke-red-600 cursor-pointer"
										>
											<path d="M18 6 6 18" />
											<path d="m6 6 12 12" />
										</svg>
									</button>
								</div>
								<div className="flex gap-2.5 flex-wrap md:flex-nowrap">
									<AddAmount
										title="+50"
										addAmount={50}
										setAmount={handleAddAmount}
										disabled={session && session.user ? false : true}
									/>
									<AddAmount
										title="+100"
										addAmount={100}
										setAmount={handleAddAmount}
										disabled={session && session.user ? false : true}
									/>
									<AddAmount
										title="+500"
										addAmount={500}
										setAmount={handleAddAmount}
										disabled={session && session.user ? false : true}
									/>
									<AddAmount
										title="+1000"
										addAmount={1000}
										setAmount={handleAddAmount}
										disabled={session && session.user ? false : true}
									/>
									<AddAmount
										title="MAX"
										setAmount={handleAddAmount}
										disabled={session && session.user ? false : true}
									/>
								</div>
								<div className="flex flex-col">
									{session && session.user && user && user.data && (
										<div className="flex justify-between font-semibold">
											<span>AVAILABLE BALANCE</span>
											<span className="text-green-500">
												{user.data.balance.toFixed(2)} BP
											</span>
										</div>
									)}

									<div className="flex justify-between font-semibold">
										<span>TOTAL STAKE</span>
										<span>
											{amount !== "" ? Number(amount).toFixed(2) : 0.0} BP
										</span>
									</div>
									<div className="flex justify-between font-semibold">
										<span>OVERALL ODDS</span>
										<span>{odds.toFixed(2)}</span>
									</div>
									<div className="flex justify-between font-semibold">
										<span>YOU WILL GET</span>
										<span>{total.toFixed(2)} BP</span>
									</div>
								</div>
								{session && session.user ? (
									<button
										onClick={handlePlaceBet}
										className="flex justify-center items-center bg-gradient-to-t from-green-800 to-green-600 hover:to-green-500 text-white p-3 font-bold rounded-lg shadow-xl text-xs md:text-sm disabled:opacity-50"
										disabled={isLoading}
									>
										{isLoading ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="animate-spin"
											>
												<line x1="12" x2="12" y1="2" y2="6" />
												<line x1="12" x2="12" y1="18" y2="22" />
												<line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
												<line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
												<line x1="2" x2="6" y1="12" y2="12" />
												<line x1="18" x2="22" y1="12" y2="12" />
												<line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
												<line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
											</svg>
										) : (
											"PLACE BET"
										)}
									</button>
								) : (
									<button
										onClick={() => {
											setIsSignUpModalOpen(false);
											setIsLoginModalOpen(true);
										}}
										className="flex justify-center items-center bg-gradient-to-t from-green-900 to-green-600 text-white p-3 font-bold rounded shadow-xl text-sm duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										PLEASE LOGIN TO MAKE A BET
									</button>
								)}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`fixed bottom-5 right-5 flex flex-col items-center p-3 rounded-lg bg-zinc-800 transition duration-300 cursor-pointer disabled:cursor-default border-2 border-yellow-500 text-sm ${
					isOpen
						? "text-yellow-500"
						: betSlip.length === 0
						? "text-neutral-500"
						: "text-neutral-300 hover:text-yellow-500"
				}`}
				disabled={betSlip.length === 0 ? true : false}
			>
				<span
					className={`${
						betSlip.length !== 0 ? "opacity-100" : "opacity-0"
					} absolute top-1 right-1 bg-green-500 rounded-full px-1 text-white text-xs font-bold transform transition duration-100`}
				>
					{betSlip.length}
				</span>
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
					<path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
					<path d="M19 17V5a2 2 0 0 0-2-2H4" />
					<path d="M15 8h-5" />
					<path d="M15 12h-5" />
				</svg>
				Bet Slip
			</button>
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
		</>
	);
};

export default BetSlip;
