import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: { type: String, required: ["Please provide your first name"] },
		lastName: { type: String, required: ["Please provide your last name"] },
		email: { type: String, required: ["Please provide your email"] },
		password: { type: String, required: ["Please provide your password"] },
		categories:[{label:String, icon:String}]
	},
	{ timestamps: true }
);

export default mongoose.model("User", userSchema);
