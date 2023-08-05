import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/User";

import { loginUser } from "@/utils/helper";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			type: "credentials",
			credentials: {},
			async authorize(credentials, req) {
				const { email, password } = credentials;
				const { user } = await loginUser({ email, password });

				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async signIn({ user }) {
			await connectMongo();

			const existingUser = await User.findOne({ email: user.email });

			if (!existingUser) {
				const newUser = new User({ email: user.email });
				await newUser.save();
			}

			return true;
		},
		// async session({ session }) {
		// 	await connectMongo();

		// 	const user = await User.findOne({ email: session.user.email });

		// 	session.user.balance = user.balance;
		// 	session.user.bets = user.bets;

		// 	return session;
		// },
	},
});

export { handler as GET, handler as POST };
