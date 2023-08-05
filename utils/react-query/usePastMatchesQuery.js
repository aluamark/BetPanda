import { useInfiniteQuery } from "@tanstack/react-query";
import { getPastMatches } from "../helper";

const usePastMatchesQuery = (game) =>
	useInfiniteQuery({
		queryKey: ["pastMatches", game || "all"],
		queryFn: ({ pageParam = 1 }) => getPastMatches({ game, pageParam }),
		getNextPageParam: (lastPage, pages) => pages.length + 1,
		refetchOnWindowFocus: false,
	});

export default usePastMatchesQuery;
