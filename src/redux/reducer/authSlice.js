import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		login: { isLoading: false, errorMessage: '', data: null },
		logout: { isLoading: false, errorMessage: '' },
		checkIn: { isLoading: false, errorMessage: '' },
		checkOut: { isLoading: false, errorMessage: '' },
	},
	reducers: {
		loginStart: (state) => {
			state.login.isLoading = true;
		},
		loginSuccess: (state, action) => {
			state.login.isLoading = false;
			state.login.errorMessage = '';
			state.login.data = action.payload;
		},
		loginFailure: (state, action) => {
			state.login.isLoading = false;
			state.login.errorMessage = action.payload.errorMessage;
		},
		logoutStart: (state) => {
			state.logout.isLoading = true;
		},
		logoutSuccess: (state) => {
			state.logout.isLoading = false;
			state.logout.errorMessage = '';
			state.login.data = null;
		},
		logoutFailure: (state, action) => {
			state.logout.isLoading = false;
			state.logout.errorMessage = action.payload.errorMessage;
		},
	},
});

export const { loginSuccess, loginFailure, loginStart, logoutSuccess, logoutFailure, logoutStart } =
	authSlice.actions;
export default authSlice.reducer;
