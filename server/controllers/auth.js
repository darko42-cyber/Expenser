import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const categories = [
	{ label: "Travel", icon: "user" },
	{ label: "Shopping", icon: "user" },
	{ label: "Investment", icon: "user" },
	{ label: "Bills", icon: "user" },
];

export const register = async (req, res) => {
	const { email, password } = req.body;

	//* hashing password
	const salt = bcrypt.genSaltSync(10);

	const hashedPassword = bcrypt.hashSync(password, salt);

	//? checking if user has an account already

	const userExist = await User.findOne({ email });
	if (userExist) {
		return res.status(406).json({ message: "User already exist" });
	}

	const user = new User({ ...req.body, password: hashedPassword, categories });
	const savedUser = await user.save();

	res.status(201).send(savedUser);
};

export const login = async (req, res) => {
	const { password, email } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(406).json({ message: "Credentials not found" });
	}

	const match = await bcrypt.compare(password, user.password);

	//?Generating token
	const payload = {
		username: email,
		_id: user._id,
	};
	const token = jwt.sign(payload, "href1999#.");

	res.status(200).json({ message: "successfully log in", token, user });
};
