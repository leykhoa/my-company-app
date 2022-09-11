import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'attendance',
	initialState: {
		checkIn: { isLoading: false, errorMessage: '' },
		checkOut: { isLoading: false, errorMessage: '' },
	},
	reducers: {
		checkInStart: (state) => {
			state.checkIn.isLoading = true;
		},
		checkInSuccess: (state) => {
			state.checkIn.isLoading = false;
			state.checkIn.errorMessage = '';
			state.login.data = null;
		},
		checkInFailure: (state, action) => {
			state.checkIn.isLoading = false;
			state.checkIn.errorMessage = action.payload.errorMessage;
		},
		checkOutStart: (state) => {
			state.checkOut.isLoading = true;
		},
		checkOutSuccess: (state) => {
			state.checkOut.isLoading = false;
			state.checkOut.errorMessage = '';
			state.login.data = null;
		},
		checkOutFailure: (state, action) => {
			state.checkOut.isLoading = false;
			state.checkOut.errorMessage = action.payload.errorMessage;
		},
	},
});

export const {
	checkInSuccess,
	checkInFailure,
	checkInStart,
	checkOutSuccess,
	checkOutFailure,
	checkOutStart,
} = authSlice.actions;
export default authSlice.reducer;
