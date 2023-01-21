import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function Guest({ children }) {
	const { isAuthenticated } = useSelector((state) => state.auth);

	return !isAuthenticated ? children : <Navigate to="/" replace={true} />;
}
