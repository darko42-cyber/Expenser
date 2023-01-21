import { createBrowserRouter } from "react-router-dom";
import App from "./App.js";
import ChatWindow from "./components/ChatWindow.jsx";

import Home from "./pages/Home.jsx";
import Room from "./pages/Room.jsx";

// import Room from "./pages/Room.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/room/:roomId",
				element: <Room />,
			},
		],
	},
]);

export default router;
