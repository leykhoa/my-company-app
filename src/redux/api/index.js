import { addStaffStart } from '../reducer/addStaff';

import { axiosInstance, axiosJWT } from './config';

import {
	loginFailure,
	loginStart,
	loginSuccess,
	logoutStart,
	logoutSuccess,
} from '../reducer/authSlice';
import {
	ADD_STAFF,
	CHECK_IN,
	CHECK_TOKEN,
	GET_MEMBERS,
	GET_USER,
	LOGIN,
	LOGOUT,
	REFRESH_TOKEN,
	UPDATE_USER,
} from './common';
import { checkInStart } from '../reducer/attendanceSlice';
import {
	getMembersFailure,
	getMembersStart,
	getMembersSuccess,
	updateUserFailure,
	updateUserStart,
	updateUserSuccess,
} from '../reducer/userSlice';

//LOGIN
export const loginUser = (user, dispatch, navigate) => {
	dispatch(loginStart());

	axiosInstance
		.post(LOGIN, user, { withCredentials: true })

		.then((res) => {
			dispatch(loginSuccess(res.data));
			if (user.prevPath && user.prevPath !== '/login') {
				return navigate(`${user.prevPath}`);
			}
			return navigate('/');
		})
		.catch((error) => {
			dispatch(loginFailure(error.response.data));
			navigate('/login');
		});
};

//LOG OUT
export const logoutUser = (dispatch, navigate) => {
	dispatch(logoutStart());
	axiosInstance
		.get(LOGOUT, { withCredentials: true })
		.then((res) => {
			dispatch(logoutSuccess());
			navigate('/login');
		})
		.catch((err) => {
			dispatch(loginFailure(err.response.data));
			navigate('/login');
		});
};

//CHECK IN

export const checkIn = async (user, dispatch, navigate) => {
	dispatch(checkInStart());
	const axiosJWToken = await axiosJWT(user, dispatch, navigate);
	return axiosJWToken
		.post(CHECK_IN, user)
		.then((res) => {
			dispatch(loginSuccess(res.data));
		})
		.catch((err) => console.log('check res----', err));
};

//UPDATE USER
export const updateUser = async (newUser, dispatch, navigate) => {
	try {
		dispatch(updateUserStart());
		const axiosJWToken = await axiosJWT(newUser, dispatch, navigate);
		return axiosJWToken
			.patch(UPDATE_USER, newUser)
			.then((res) => {
				dispatch(loginSuccess(res.data));
				dispatch(updateUserSuccess(res.data));
				return res;
			})
			.catch((err) => {
				if (err.response) {
					dispatch(updateUserFailure(err.response.data.errorMessage));
					return { errorMessage: err.response.data.errorMessage };
				}
				console.log(err);
				return { errorMessage: 'Server Error, please connect IT Support!' };
			});
	} catch (err) {
		console.log('check err axios', err);
	}
};

//CHECK USER AND
// export const checkUser = (token, dispatch, navigate) => {
// 	dispatch(loginStart());
// 	axios
// 		.post(api.LOGIN, token)
// 		.then((res) => {
// 			dispatch(loginSuccess(res.data));
// 			localStorage.setItem('token', res.data.accessToken);
// 			navigate('/');
// 		})
// 		.catch((error) => {
// 			dispatch(loginFailure(error));
// 		});
// };

// GET MEMBERS
export const getMembers = async (user, dispatch, navigate) => {
	dispatch(getMembersStart());
	try {
		console.log('check user', user);
		const axiosJWToken = await axiosJWT(user, dispatch, navigate);
		return axiosJWToken
			.get(GET_MEMBERS, { headers: { token: `Bearer ${user.accessToken}` } })
			.then((res) => {
				console.log('check data', res);
				dispatch(getMembersSuccess(res.data));
			})
			.catch((err) => {
				dispatch(getMembersFailure(err));
			});
	} catch (err) {
		console.log(err);
	}
};

// export const addStaff = (user, dispatch, navigate) => {
// 	dispatch(addStaffStart);
// 	axiosInstance
// 		.post(ADD_STAFF, user)
// 		.then((res) => {})
// 		.catch();
// };

//UPDATE USER

export const refreshToken = async () => {
	try {
		const res = await axiosInstance.get(REFRESH_TOKEN, { withCredentials: true });
		return res.data;
	} catch (err) {
		return err.response;
	}
};
