import express from "express";

import cors from "cors";

import connect from "./database/mongodb.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import routes from "./routes/index.js";
const app = express();

app.use(cors());
app.use(express.json({ extended: false, limit: "30mb" }));
app.use(passport.initialize());
passportConfig(passport);
app.get("/", (req, res) => {
	res.json("hello");
});

app.use("/", routes);

connect();
app.listen(4000, () => {
	console.log("Server is listening on port 4000");
});
