import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'users',
	initialState: {
		members: { isLoading: false, errorMessage: '', data: [] },
		updateUser: { isLoading: false, errorMessage: '' },
	},
	reducers: {
		getMembersStart: (state) => {
			state.members.isLoading = true;
		},
		getMembersSuccess: (state, action) => {
			state.members.isLoading = false;
			state.members.errorMessage = '';
			state.members.data = action.payload;
		},
		getMembersFailure: (state) => {
			state.members.isLoading = false;
			state.members.errorMessage = '';
		},
		updateUserStart: (state) => {
			state.updateUser.isLoading = true;
		},
		updateUserSuccess: (state, action) => {
			state.updateUser.isLoading = false;
			state.updateUser.errorMessage = '';
		},
		updateUserFailure: (state, action) => {
			state.updateUser.isLoading = false;
			state.updateUser.errorMessage = action.payload;
		},
	},
});

export const {
	getMembersStart,
	getMembersSuccess,
	getMembersFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
