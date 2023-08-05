import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/User";
import Bet from "@/models/Bet";

export async function GET(request, { params }) {
	const { email } = params;

	await connectMongo();

	const user = await User.findOne({ email }).populate("bets");

	if (!user) {
		return NextResponse.json({ error: "No user found." }, { status: 404 });
	}

	return NextResponse.json(user, { status: 200 });
}
