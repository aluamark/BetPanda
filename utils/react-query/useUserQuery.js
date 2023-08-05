import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUser } from "../helper";

const useUserQuery = () => {
	const { data: session } = useSession();

	return useQuery({
		queryKey: ["user"],
		queryFn: () => getUser(session.user.email),
		enabled: !!session,
	});
};

export default useUserQuery;
