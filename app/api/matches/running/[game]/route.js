import { NextResponse } from "next/server";
import { getRunningMatches } from "@/utils/pandascoreApiHelper";

export async function GET(request, { params }) {
	const game = params.game;
	const { searchParams } = new URL(request.url);
	const pageParam = searchParams.get("pageParam");

	try {
		const matches = await getRunningMatches({ game, pageParam });

		return NextResponse.json(matches, { status: 200 });
	} catch (error) {
		console.error("Error during API request: ", error.message);

		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500 }
		);
	}
}
