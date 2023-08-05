import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/User";

export async function POST(request) {
	const { email, password } = await request.json();

	await connectMongo();

	if (!email || !password) {
		return NextResponse.json(
			{ error: "Missing required data." },
			{ status: 400 }
		);
	}

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return NextResponse.json(
			{ error: "Email is already registered." },
			{ status: 409 }
		);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = new User({
		email,
		password: hashedPassword,
	});
	const savedUser = await newUser.save();

	if (!savedUser) {
		return NextResponse.json(
			{ error: "Failed creating an account." },
			{ status: 500 }
		);
	}

	const savedUserRemovedPassword = savedUser.toObject();
	delete savedUserRemovedPassword.password;

	return NextResponse.json(
		{ message: "Registered successfully.", user: savedUserRemovedPassword },
		{ status: 201 }
	);
}
