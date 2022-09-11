import { Button, Form, Input, Select, Checkbox, Space } from 'antd';

//library notify
import { ToastContainer, toast } from 'react-toastify';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useEffect, useState } from 'react';
import { loginUser } from '~/redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function LogIn() {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let errorMess = useSelector((state) => state.auth.login.errorMessage);
	const handleSubmit = (value) => {
		errorMess = '';
		loginUser(value, dispatch, navigate);
	};
	let message = '';
	const checkPath = window.location.pathname;
	console.log('check path', checkPath);
	if (checkPath !== '/login') {
		message = `Please login to access ${checkPath} `;
	}

	return (
		<div className={cx('wrapper')}>
			<ToastContainer />

			<Form
				name='log-in'
				onFinish={handleSubmit}
				initialValues={{ prevPath: checkPath }}
				layout='horizontal'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
			>
				<h1>{message}</h1>
				<Form.Item name='prevPath'>
					<Input type='hidden' />
				</Form.Item>
				<Form.Item label='Your account' name='email'>
					<Input />
				</Form.Item>
				<Form.Item label='Password' name='password'>
					<Space direction='vertical'>
						<Input.Password placeholder='input password' />
					</Space>
				</Form.Item>

				{errorMess && <div>{errorMess}</div>}
				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default LogIn;
