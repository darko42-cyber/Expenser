import pkg from "passport-jwt";
import User from "../models/user.js";
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "href1999#.";

export default (passport) => {
	passport.use(
		new JwtStrategy(opts, function (jwt_payload, done) {
			User.findById(jwt_payload._id, function (err, user) {
				if (err) {
					return done(err, false);
				}
				if (user) {
					return done(false, user);
				} else {
					return done(null, false);
				}
			});
		})
	);
};
