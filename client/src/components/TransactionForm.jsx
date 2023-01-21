import {
	Autocomplete,
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Cookie from "js-cookies";
import { useSelector } from "react-redux";

const initalForm = {
	amount: 0,
	description: "",
	category_id: "",
	date: new Date(),
};

const TransactionForm = ({ fetchTransaction, editTransaction }) => {
	const { categories } = useSelector((state) => state.auth.user);
	const token = Cookie.getItem("token");

	const [form, setForm] = useState(initalForm);

	useEffect(() => {
		if (editTransaction.amount !== undefined) {
			setForm(editTransaction);
		}
	}, [editTransaction]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const handleDate = (newValue) => {
		setForm({ ...form, date: newValue });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		editTransaction.amount === undefined ? create() : update();
	};

	function reload(res) {
		if (res.ok) {
			setForm(initalForm);

			fetchTransaction();
		}
	}

	const create = async () => {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
			method: "POST",
			body: JSON.stringify(form),
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		reload(res);
	};
	const update = async () => {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/${editTransaction._id}`,
			{
				method: "PATCH",
				body: JSON.stringify(form),
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		reload(res);
	};

	const getCategoryNameById = () => {
		return (
			categories.find((category) => category._id === form.category_id) ?? ""
		);
	};

	return (
		<Card sx={{ minWidth: 275, marginTop: 10 }}>
			<CardContent>
				<Typography variant="h6" sx={{ marginBottom: 2 }}>
					Add new transaction
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
					<TextField
						value={form.amount}
						onChange={handleChange}
						name="amount"
						label="amount"
						size="small"
						sx={{ marginRight: 5 }}
						variant="outlined"></TextField>
					<TextField
						value={form.description}
						onChange={handleChange}
						name="description"
						size="small"
						sx={{ marginRight: 5 }}
						label="Description"
						variant="outlined"></TextField>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DesktopDatePicker
							label="Transaction Date"
							inputFormat="MM/DD/YYYY"
							value={form.date}
							name="date"
							onChange={handleDate}
							renderInput={(params) => (
								<TextField size="small" sx={{ marginRight: 5 }} {...params} />
							)}></DesktopDatePicker>
					</LocalizationProvider>
					<Autocomplete
						value={getCategoryNameById()}
						onChange={(event, newValue) => {
							setForm({ ...form, category_id: newValue._id });
						}}
						options={categories}
						sx={{ width: 200, marginRight: 5 }}
						renderInput={(params) => (
							<TextField size="small" {...params} label="Category" />
						)}
					/>
					{editTransaction.amount !== undefined && (
						<Button type="submit" variant="secondary">
							Update
						</Button>
					)}
					{editTransaction.amount === undefined && (
						<Button type="submit" variant="contained">
							Submit
						</Button>
					)}
				</Box>
			</CardContent>
		</Card>
	);
};

export default TransactionForm;
