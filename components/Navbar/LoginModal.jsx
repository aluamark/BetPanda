"use client";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Modal from "react-modal";
import GoogleSignInButton from "./GoogleSignInButton";

Modal.setAppElement("#root");

const LoginModal = ({ isOpen, setIsOpen, setIsSignUpModalOpen }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async () => {
		setIsLoading(true);
		if (email && password) {
			const response = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (response.error) {
				setError("Invalid credentials.");
			} else {
				setIsOpen(false);
			}
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (email && password) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [email, password]);

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={() => setIsOpen(false)}
			overlayClassName="fixed inset-0 bg-black/75"
			className="min-h-screen flex justify-center items-center"
			closeTimeoutMS={300}
		>
			<div className="max-w-screen-sm w-full flex flex-col gap-5 bg-zinc-900 p-10 rounded-lg">
				<div className="flex justify-between">
					<span className="text-3xl font-bold">LOGIN</span>
					<button onClick={() => setIsOpen(false)}>
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
							className="flex-none stroke-red-500 hover:stroke-red-600 duration-300 cursor-pointer"
						>
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					</button>
				</div>

				<div className="flex flex-col gap-5 pt-3 pb-5">
					<div className="flex flex-col gap-1">
						<label className="text-zinc-400 text-sm">EMAIL</label>
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
							className="bg-zinc-700 px-3 py-1.5 font-semibold bg-gradient-to-b from-zinc-800 focus:outline-none rounded"
							value={email}
							onChange={(event) => {
								setEmail(event.target.value);
								setError("");
							}}
						/>
					</div>
					<div className="relative flex flex-col gap-1">
						<label className="text-zinc-400 text-sm">PASSWORD</label>
						<input
							type="password"
							name="password"
							placeholder="Enter your password"
							className="bg-zinc-700 px-3 py-1.5 font-semibold bg-gradient-to-b from-zinc-800 focus:outline-none rounded"
							value={password}
							onChange={(event) => {
								setPassword(event.target.value);
								setError("");
							}}
						/>
						<span className="absolute -bottom-8 text-red-500">{error}</span>
					</div>
				</div>

				<button
					onClick={handleLogin}
					className="flex justify-center items-center bg-gradient-to-t from-green-900 to-green-600 text-white p-3 font-bold rounded shadow-xl text-sm duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={isDisabled || isLoading}
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
						"LOGIN"
					)}
				</button>
				<div className="text-center">
					Don&apos;t have an account yet?{" "}
					<button
						onClick={() => {
							setIsOpen(false);
							setIsSignUpModalOpen(true);
						}}
						className="text-green-600 font-bold"
					>
						Register
					</button>
				</div>

				<div className="relative border-t border-green-900">
					<div className="absolute -top-2.5 right-1/2 translate-x-[30px] bg-zinc-900 px-5 text-green-600 text-xs font-bold">
						OR
					</div>
				</div>

				<GoogleSignInButton />
			</div>
		</Modal>
	);
};

export default LoginModal;
