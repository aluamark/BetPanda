import axios from "axios";

let BASE_URL = "";

if (process.env.NODE_ENV === "production") {
	BASE_URL = "https://betpanda.vercel.app/api";
} else {
	BASE_URL = "http://localhost:3000/api";
}

const PANDASCORE = "https://api.pandascore.co";

// CREATE USER
export const createUser = async (userData) => {
	const response = await axios.post(`${BASE_URL}/user/signup`, userData, {
		headers: { "Content-Type": "application/json" },
	});
	const user = response.data;

	return user;
};

// LOGIN USER
export const loginUser = async (credentials) => {
	const response = await axios.post(`${BASE_URL}/user/login`, credentials, {
		headers: { "Content-Type": "application/json" },
	});
	const user = response.data;

	return user;
};

// GET UPCOMING MATCHES
export const getUpcomingMatches = async ({ game, pageParam = 1 }) => {
	let url = game
		? `${BASE_URL}/matches/upcoming/${game}?pageParam=${pageParam}`
		: `${BASE_URL}/matches/upcoming?pageParam=${pageParam}`;

	const response = await axios.get(url);
	const data = response.data;

	return data;
};

// GET RUNNING MATCHES
export const getRunningMatches = async ({ game, pageParam = 1 }) => {
	let url = game
		? `${BASE_URL}/matches/running/${game}?pageParam=${pageParam}`
		: `${BASE_URL}/matches/running?pageParam=${pageParam}`;

	const response = await axios.get(url);
	const data = response.data;

	return data;
};

// GET PAST MATCHES
export const getPastMatches = async ({ game, pageParam = 1 }) => {
	let url = game
		? `${BASE_URL}/matches/past/${game}?pageParam=${pageParam}`
		: `${BASE_URL}/matches/past?pageParam=${pageParam}`;

	const response = await axios.get(url);
	const data = response.data;

	return data;
};

// PLACE BET
export const placeBet = async (bet) => {
	return await axios.post(`${BASE_URL}/bet/placeBet`, bet);
};

// GET USER
export const getUser = async (email) => {
	return await axios.get(`${BASE_URL}/user/${email}`);
};

// GET
export const getSettledMatches = async (game) => {
	const options = {
		method: "GET",
		url: `${PANDASCORE}/${game ? `${game}/` : ""}matches/past`,
		headers: {
			accept: "application/json",
			authorization: `Bearer ${process.env.NEXT_PUBLIC_PANDASCORE_API_KEY}`,
		},
	};

	const response = await axios.request(options);
	const data = response.data;

	return data;
};
