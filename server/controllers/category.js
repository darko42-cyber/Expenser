import User from "../models/user.js";

export const destroy = async (req, res) => {
	const categories = req.user.categories;
	const newCategories = categories.filter((category) => {
		console.log(category._id);
		return category._id.toString() !== req.params.id.toString();
	});

	console.log(newCategories);
	console.log(req.params.id);

	const user = await User.updateOne(
		{ _id: req.user.id },
		{ $set: { categories: newCategories } }
	);

	res.json({ user });
};
