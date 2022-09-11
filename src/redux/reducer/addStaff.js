import { createSlice } from '@reduxjs/toolkit';

export const addStaffSlice = createSlice({
	name: 'add_staff',
	initialState: { addStaff: { isLoading: false, error: false, success: false } },
	reducers: {
		addStaffStart: (state) => {
			state.addStaff.isLoading = true;
		},
		addStaffSuccess: (state, action) => {
			state.addStaff.isLoading = false;
			state.addStaff.error = false;
			state.addStaff.success = true;
		},
		addStaffFailure: (state) => {
			state.addStaff.isLoading = false;
			state.addStaff.error = true;
			state.addStaff.success = false;
		},
	},
});
export const { addStaffStart, addStaffFailure, addStaffSuccess } = addStaffSlice.actions;

export default addStaffSlice.reducer;
