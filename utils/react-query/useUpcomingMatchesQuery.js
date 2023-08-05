import { useInfiniteQuery } from "@tanstack/react-query";
import { getUpcomingMatches } from "../helper";

const useUpcomingMatchesQuery = (game) => {
	return useInfiniteQuery({
		queryKey: ["matches", game || "all"],
		queryFn: ({ pageParam = 1 }) => getUpcomingMatches({ game, pageParam }),
		getNextPageParam: (lastPage, pages) => pages.length + 1,
		refetchOnWindowFocus: false,
	});
};

export default useUpcomingMatchesQuery;
