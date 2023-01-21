import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, Route, createBrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

import router from "./routes";
import { Provider } from "react-redux";
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
