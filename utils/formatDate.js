const formatDate = (dateString) => {
	const date = new Date(dateString);

	// Get the user's timezone
	const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	// Create options object for formatting
	const options = {
		timeZone: userTimezone,
		hour: "numeric",
		minute: "numeric",
		day: "numeric",
		month: "short",
		hour12: true,
	};

	const formattedDate = date
		.toLocaleDateString("default", options)
		.toUpperCase();

	const noCommaDate = formattedDate.split(",");
	const removeTimeSpace = noCommaDate[1].trim().split(" ").join("");

	return noCommaDate[0] + "," + removeTimeSpace;
};

export default formatDate;
