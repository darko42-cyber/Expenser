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
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Register = () => {
	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);

		const form = {
			firstName: data.get("firstName"),
			lastName: data.get("lastName"),
			email: data.get("email"),
			password: data.get("password"),
		};

		const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
			method: "POST",
			body: JSON.stringify(form),
			headers: { "content-type": "application/json" },
		});
		if (res.ok) {
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
					Sign Up
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								label="First Name"
								required
								fullWidth
								id="firstName"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								name="lastName"
								label="Last Name"
								required
								fullWidth
								id="lastName"
								autoComplete="family-name"
							/>
						</Grid>
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
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							{" "}
							<RouterLink to="/login">
								<Link component="span" variant="body2">
									Already have and account? Sign in
								</Link>{" "}
							</RouterLink>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Register;
