import { Schema, models, model } from "mongoose";

const userSchema = Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!/^\S+@\S+\.\S+$/.test(value)) {
					throw new Error("Please enter a valid email address.");
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			select: false,
			validate(value) {
				if (value.toLowerCase().includes("password")) {
					throw new Error("Password must not contain the word 'password.'");
				}
			},
		},
		balance: {
			type: Number,
			default: 5000,
		},
		bets: [
			{
				type: Schema.Types.ObjectId,
				ref: "Bet",
			},
		],
	},
	{ timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
