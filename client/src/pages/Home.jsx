import { Container } from "@mui/material";
import Cookie from "js-cookies";
import React, { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Home = () => {
	const [transactions, setTransactions] = useState([]);

	const [editTransaction, setEditTransaction] = useState({});

	useEffect(() => {
		fetchTransaction();
	}, []);

	async function fetchTransaction() {
		const token = Cookie.getItem("token");
		const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await res.json();

		setTransactions(data);
	}
	return (
		<Container>
			<TransactionForm
				fetchTransaction={fetchTransaction}
				editTransaction={editTransaction}
				setEditTransaction={setEditTransaction}
			/>
			<TransactionList
				transactions={transactions}
				fetchTransaction={fetchTransaction}
				setEditTransaction={setEditTransaction}
			/>
		</Container>
	);
};

export default Home;
