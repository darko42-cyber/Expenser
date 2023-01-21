import Transaction from "../models/Transaction.js";

export const index = async (req, res) => {
	const transaction = await Transaction.find({ user_id: req.user.id }).sort({
		createdAt: -1,
	});

	res.json(transaction);
};

export const create = async (req, res) => {
	const { amount, description, date, category_id } = req.body;

	const transaction = new Transaction({
		amount,
		user_id: req.user.id,
		category_id: category_id,
		description,
		date,
	});
	await transaction.save();
	res.json({ message: "Successful" });
};

export const destroy = async (req, res) => {
	const { id } = req.params;
	try {
		await Transaction.findByIdAndDelete(id);
		res.json({ message: "Transaction deleted successfully" });
	} catch (error) {
		res.status(500).json(error.stack);
	}
};

export const update = async (req, res) => {
	try {
		await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
		res.json({ message: "Transaction updated successfully" });
	} catch (error) {
		res.status(500).json(error.stack);
	}
};
