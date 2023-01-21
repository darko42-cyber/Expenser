import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookie from "js-cookies";
import AppBar from "./components/AppBar";
import { useDispatch } from "react-redux";
import { getUser } from "./store/auth";
const token = Cookie.getItem("token");
export default function App() {
	const dispatch = useDispatch();

	const [loading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		setIsLoading(true);
		const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		setIsLoading(false);

		if (res.ok) {
			const user = await res.json();
			dispatch(getUser(user));
		}
	};

	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<div>
			<AppBar />
			<Outlet />
		</div>
	);
}
