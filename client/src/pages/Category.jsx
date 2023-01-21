import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import dayjs from "dayjs";
import Cookie from "js-cookies";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { getUser } from "../store/auth";

const Category = () => {
	const { user } = useSelector((state) => state.auth);
	const token = Cookie.getItem("token");
	const dispatch = useDispatch();

	async function remove(id) {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (res.ok) {
			const _user = {
				...user,
				categories: user.categories.filter((category) => category._id !== id),
			};
			dispatch(getUser({ user: _user }));
		}
	}
	return (
		<>
			<Typography varaint="h6" sx={{ marginTop: 10 }}>
				List of Category
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							<TableCell align="left">Label</TableCell>
							<TableCell align="center">Icon</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{user.categories.map((row) => (
							<TableRow
								key={row._id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component="th" scope="row">
									{row.label}
								</TableCell>
								<TableCell align="center"> {row.icon} </TableCell>

								<TableCell align="center">
									<IconButton
										color="primary"
										component="label"
										// onClick={() => setEditTransaction(row)}
									>
										<EditSharpIcon />
									</IconButton>
									<IconButton
										color="error"
										component="label"
										onClick={() => remove(row._id)}>
										<DeleteSharpIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Category;
