import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/User";
import Bet from "@/models/Bet";

export async function POST(request) {
	const { bet } = await request.json();

	await connectMongo();

	const user = await User.findOne({ email: bet.email });

	if (!user) {
		return NextResponse.json({ error: "No user found." }, { status: 404 });
	}

	const betInfo = new Bet(bet);
	const savedBet = await betInfo.save();

	if (savedBet) {
		user.bets.push(savedBet._id);
		user.balance = user.balance - bet.amount;
		await user.save();
	}

	return NextResponse.json({ bet: savedBet }, { status: 201 });
}
