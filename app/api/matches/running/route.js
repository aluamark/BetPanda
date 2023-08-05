import { NextResponse } from "next/server";
import { getAllRunningMatches } from "@/utils/pandascoreApiHelper";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const pageParam = searchParams.get("pageParam");

	try {
		const matches = await getAllRunningMatches({ pageParam });

		return NextResponse.json(matches, { status: 200 });
	} catch (error) {
		console.error("Error during API request: ", error.message);

		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500 }
		);
	}
}
