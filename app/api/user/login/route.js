import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/User";

export async function POST(request) {
	const { email, password } = await request.json();

	await connectMongo();

	const user = await User.findOne({ email }).select("+password");
	if (user && !user.password) {
		return NextResponse.json(
			{
				error:
					"Email is connected to a Google account. Please login with your Google account.",
			},
			{ status: 401 }
		);
	}
	if (!user) {
		return NextResponse.json(
			{ error: "Invalid credentials." },
			{ status: 401 }
		);
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) {
		return NextResponse.json(
			{ error: "Invalid credentials." },
			{ status: 401 }
		);
	}

	const userRemovedPassword = user.toObject();
	delete userRemovedPassword.password;

	return NextResponse.json(
		{ message: "Logged in successfully.", user: userRemovedPassword },
		{ status: 200 }
	);
}
