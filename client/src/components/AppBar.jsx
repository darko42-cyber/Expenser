import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookies";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth";

const ButtonAppBar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state) => state.auth);
	const _logout = () => {
		Cookie.removeItem("token");
		dispatch(logout());
		navigate("/login");
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link to="/" className="text-white">
							Expenser
						</Link>
					</Typography>
					<Link to="/category" className="text-white">
						<Button color="inherit">Category</Button>
					</Link>

					{isAuthenticated ? (
						<Button onClick={_logout} color="inherit">
							Logout
						</Button>
					) : (
						<>
							<Link to="/login" className="text-white">
								<Button color="inherit">Login</Button>
							</Link>
							<Link to="/register" className="text-white">
								<Button color="inherit">Register</Button>
							</Link>
						</>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default ButtonAppBar;
