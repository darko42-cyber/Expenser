import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: false,
		user: {},
	},

	reducers: {
		getUser: (state, action) => {
			state.user = action.payload.user;

			state.isAuthenticated = true;
		},
		logout: (state, action) => {
			state.user = {};
			state.isAuthenticated = false;
		},
	},
});

export default authSlice.reducer;
export const { getUser, logout } = authSlice.actions;
