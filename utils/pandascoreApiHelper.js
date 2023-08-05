import axios from "axios";

const PANDASCORE = "https://api.pandascore.co";

// GET UPCOMING MATCHES
export const getAllUpcomingMatches = async ({ pageParam = 1 }) => {
	const options = {
		method: "GET",
		url: `${PANDASCORE}/matches/upcoming`,
		params: { page: pageParam, per_page: "10" },
		headers: {
			accept: "application/json",
			authorization: `Bearer ${process.env.NEXT_PUBLIC_PANDASCORE_API_KEY}`,
		},
	};

	const response = await axios.request(options);
	const data = response.data;

	return data;
};

// GET GAME UPCOMING MATCHES
export const getUpcomingMatches = async ({ game, pageParam = 1 }) => {
	const options = {
		method: "GET",
		url: `${PANDASCORE}/${game}/matches/upcoming`,
		params: { page: pageParam, per_page: "10" },
		headers: {
			accept: "application/json",
			authorization: `Bearer ${process.env.NEXT_PUBLIC_PANDASCORE_API_KEY}`,
		},
	};

	const response = await axios.request(options);
	const data = response.data;

	return data;
};

// GET RUNNING MATCHES
export const getAllRunningMatches = async ({ pageParam = 1 }) => {
	const options = {
		method: "GET",
		url: `${PANDASCORE}/matches/running`,
		params: { page: pageParam, per_page: "10" },
		headers: {
			accept: "application/json",
			authorization: `Bearer ${process.env.NEXT_PUBLIC_PANDASCORE_API_KEY}`,
		},
	};

	const response = await axios.request(options);
	const data = response.data;

	return data;
};

// GET GAME RUNNING MATCHES
export const getRunningMatches = async ({ game, pageParam = 1 }) => {
	const options = {
		method: "GET",
		url: `${PANDASCORE}/${game}/matches/running`,
		params: { page: pageParam, per_page: "10" },
		headers: {
			accept: "application/json",
			authorization: `Bearer ${process.env.NEXT_PUBLIC_PANDASCORE_API_KEY}`,
		},
	};

	const response = await axios.request(options);
	const data = response.data;

	return data;
};

// GET PAST MATCHES
export const getAllPastMatches = async ({ pageParam = 1 }) => {
	const options = {
		method: "GET",
		url: `${PANDASCORE}/matches/past`,
		params: { page: pageParam, per_page: "10" },
		headers: {
			accept: "application/json",
			authorization: `Bearer ${process.env.NEXT_PUBLIC_PANDASCORE_API_KEY}`,
		},
	};

	const response = await axios.request(options);
	const data = response.data;

	return data;
};

// GET GAME PAST MATCHES
export const getPastMatches = async ({ game, pageParam = 1 }) => {
	const options = {
		method: "GET",
		url: `${PANDASCORE}/${game}/matches/past`,
		params: { page: pageParam, per_page: "10" },
		headers: {
			accept: "application/json",
			authorization: `Bearer ${process.env.NEXT_PUBLIC_PANDASCORE_API_KEY}`,
		},
	};

	const response = await axios.request(options);
	const data = response.data;

	return data;
};
