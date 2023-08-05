import { useInfiniteQuery } from "@tanstack/react-query";
import { getRunningMatches } from "../helper";

const useRunningMatchesQuery = (game) =>
	useInfiniteQuery({
		queryKey: ["runningMatches", game || "all"],
		queryFn: ({ pageParam = 1 }) => getRunningMatches({ game, pageParam }),
		getNextPageParam: (lastPage, pages) => pages.length + 1,
		refetchOnWindowFocus: false,
	});

export default useRunningMatchesQuery;
