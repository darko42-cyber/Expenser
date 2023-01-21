import React from "react";

import {
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	Grid,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookie from "js-cookies";
import { getUser } from "../store/auth";
import { useDispatch } from "react-redux";
const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const form = {
			email: data.get("email"),
			password: data.get("password"),
		};
		console.log(form);
		const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
			method: "POST",
			body: JSON.stringify(form),
			headers: {
				"content-type": "application/json",
			},
		});
		if (res.ok) {
			const { token, user } = await res.json();
			Cookie.setItem("token", token);
			dispatch(getUser(user));
			navigate("/");
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign In
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								name="email"
								label="Email Address"
								required
								fullWidth
								id="email"
								type="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="password"
								label="Password"
								type="password"
								required
								fullWidth
								id="password"
								autoComplete="new-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							{" "}
							<RouterLink to="/register">
								<Link component="span" variant="body2">
									Don't have and account? Sign up
								</Link>{" "}
							</RouterLink>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
