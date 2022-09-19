import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '.';
import { loginSuccess, logoutSuccess } from '../reducer/authSlice';

export const axiosInstance = axios.create({
	baseURL: process.env.API,
	timeout: 300000,
});

export const axiosJWT = async (user, dispatch, navigate) => {
	const axiosJWT = axios.create({
		baseURL: process.env.API,
		timeout: 300000,
	});
	axiosJWT.interceptors.request.use(
		async (config) => {
			const date = new Date().getTime() / 1000;
			const decoded = jwt_decode(user.accessToken);
			if (decoded.exp < date) {
				const data = await refreshToken();
				console.log('check data refresh', data);
				if (data.request) {
					return data.config;
				}

				const refreshUser = { ...user, accessToken: data.accessToken };
				config.headers['token'] = `Bearer ${data.accessToken}`;
				dispatch(loginSuccess(refreshUser));
				return config;
			}
			config.headers['token'] = `Bearer ${user.accessToken}`;
			dispatch(loginSuccess(user));
			return config;
		},
		(err) => {
			console.log('check err', err);
			return Promise.reject(err);
		},
	);
	return axiosJWT;
};
