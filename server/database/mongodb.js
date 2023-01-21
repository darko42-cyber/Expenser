import mongoose from "mongoose";

async function connect() {
	await mongoose.connect("mongodb://127.0.0.1/expense-tracker").then(() => {
		console.log("Connection successful");
	});
}

export default connect;
