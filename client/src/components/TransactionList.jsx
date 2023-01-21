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
import { useSelector } from "react-redux";

import React from "react";

const TransactionList = ({
	transactions,
	fetchTransaction,
	setEditTransaction,
}) => {
	const { user } = useSelector((state) => state.auth);
	const token = Cookie.getItem("token");
	const remove = async (_id) => {
		console.log(token);
		if (!window.confirm("Are you sure you want to delete")) return;
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/transaction/${_id}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (res.ok) {
			window.alert("Deleted successfullyy");
		}
		fetchTransaction();
	};

	function dateFormat(date) {
		return dayjs(date).format("DD MMM, YYYY");
	}

	const categoryName = (id) => {
		const category = user.categories.find((category) => category._id === id);
		return category ? category.label : "NA";
	};
	return (
		<>
			<Typography varaint="h6" sx={{ marginTop: 10 }}>
				List of transactions
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							<TableCell>Amount</TableCell>
							<TableCell align="center">Description</TableCell>
							<TableCell align="center">Category</TableCell>
							<TableCell align="center">Date</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{transactions.map((row) => (
							<TableRow
								key={row._id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component="th" scope="row">
									{row.amount}
								</TableCell>
								<TableCell align="center"> {row.description} </TableCell>
								<TableCell align="center">
									{" "}
									{categoryName(row.category_id)}{" "}
								</TableCell>
								<TableCell align="center"> {dateFormat(row.date)} </TableCell>
								<TableCell align="center">
									<IconButton
										color="primary"
										component="label"
										onClick={() => setEditTransaction(row)}>
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

export default TransactionList;
