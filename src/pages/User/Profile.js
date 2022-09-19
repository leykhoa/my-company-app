import {
	CloudUploadOutlined,
	ExclamationCircleOutlined,
	LoadingOutlined,
	PlusOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import { Button, DatePicker, Form, Image, Input, Modal, Select, Spin, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, updateUser, uploadImage } from '~/redux/api';
import { toast, ToastContainer } from 'react-toastify';

function Profile(props) {
	let isAdmin = true;

	const user = useSelector((state) => state.auth.login.data);
	const [loading, setLoading] = useState(false);
	const [userImage, setUserImage] = useState({});
	const [disableInput, setDisableInput] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loadingUpdate = useSelector((state) => state.users.update?.isLoading) || false;

	const handleUpdateProfile = async (values) => {
		const doB = values.doB.toISOString();
		const startDate = values.startDate.toISOString();
		const newUser = { ...user, ...values, doB, startDate };
		const data = new FormData();
		data.append('file-info', userImage);
		data.append('user', newUser);

		const imageUpload = await uploadImage(newUser, dispatch, navigate, data);
		if (imageUpload.errorMessage) {
			return toast.error(`${imageUpload.errorMessage}`);
		}
		// try {
		// 	const update = await updateUser(newUser, dispatch, navigate, data);
		// 	if (update.errorMessage) {
		// 		toast.error(`${update.errorMessage}`);
		// 		return confirm();
		// 	}
		// 	toast.success('Update success');

		// 	return setDisableInput(true);
		// } catch (err) {
		// 	console.log('check err update', err);
		// }
	};

	const confirm = () => {
		Modal.confirm({
			title: 'Confirm',
			icon: <ExclamationCircleOutlined />,
			content: "You're want log out?",
			okText: 'Log out',
			cancelText: 'Cancel',
			onOk() {
				logoutUser(dispatch, navigate);
			},
		});
	};

	const editProfile = () => {
		setDisableInput(false);
	};
	const cancelUpload = () => {
		setDisableInput(true);
		form.setFieldsValue(initialValues);
	};

	const [form] = Form.useForm();

	const dateFormat = 'DD/MM/YYYY';

	const initialValues = { ...user, doB: moment(user.doB), startDate: moment(user.startDate) };

	//IMAGE

	function getBase64(file, callback) {
		let reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(file);
	}

	const beforeUpload = (file) => {
		file.status = 'done';
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isJpgOrPng) {
			toast.error('You can only upload JPG/PNG file!');
			file.status = 'error';
		}

		if (!isLt2M) {
			toast.error('Image must smaller than 2MB!');
			file.status = 'error';
		}
		return isJpgOrPng && isLt2M;
	};

	const handleActionImage = async (file) => {
		console.log('ok');
		setOpen(true);
		if (file.status === 'uploading') {
			setLoading(true);
			return;
		}
		getBase64(file, (url) => {
			file.url = url;
			setLoading(false);
			setUserImage(file);
		});
	};

	//OPEN Image
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState('Content of the modal');

	const handleOk = () => {
		setModalText('The modal will be closed after two seconds');
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 2000);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	useEffect(() => {}, [user]);

	return (
		<>
			<div>
				{user && (
					<Spin tip='Updating...' spinning={loadingUpdate}>
						<div className='row'>
							<div className='col-3'>
								<Image src={user.imageUrl} alt='avatar-user' width='100%' />
							</div>
							<Form
								form={form}
								initialValues={initialValues}
								onFinish={handleUpdateProfile}
								labelCol={{
									span: 4,
								}}
								wrapperCol={{
									span: 14,
								}}
								layout='horizontal'
								className='col-6'
							>
								<Form.Item label='Name' name='name'>
									<Input disabled={true} />
								</Form.Item>
								<Form.Item label='Email' name='email'>
									<Input disabled={true} />
								</Form.Item>
								<Form.Item label='Phone' name='phone'>
									<Input disabled={disableInput} />
								</Form.Item>
								<Form.Item label='Address' name='address'>
									<Input disabled={disableInput} />
								</Form.Item>

								<Form.Item label='DoB' name='doB'>
									<DatePicker
										format={dateFormat}
										disabled={disableInput && isAdmin}
									/>
								</Form.Item>
								<Form.Item label='Start date' name='startDate'>
									<DatePicker
										format={dateFormat}
										disabled={disableInput && isAdmin}
									/>
								</Form.Item>

								<Form.Item label='Annual leave' name='annualLeave'>
									<Input disabled={true} />
								</Form.Item>
								<Form.Item label='Salary Scale' name='salaryScale'>
									<Input disabled={disableInput && isAdmin} />
								</Form.Item>
								<Form.Item label='Department' name='department'>
									<Select disabled={disableInput && isAdmin}>
										<Select.Option value='demo'>Phòng ban</Select.Option>
									</Select>
								</Form.Item>

								{disableInput && (
									<Button
										className='btn btn-primary'
										onClick={editProfile}
										type='primary'
										ghost
										style={{ marginRight: 15, marginLeft: 60 }}
									>
										Edit Profile
									</Button>
								)}
								{!disableInput && (
									<Fragment>
										<Form.Item label='Edit avatar'>
											<Upload
												name='avatar'
												listType='picture-card'
												className='avatar-uploader'
												beforeUpload={beforeUpload}
												action={handleActionImage}
												showUploadList={false}
											>
												<div>
													<PlusOutlined />
													<div
														style={{
															marginTop: 8,
														}}
													>
														Upload
													</div>
												</div>
											</Upload>
										</Form.Item>
										<Button
											className='btn btn-primary'
											onClick={cancelUpload}
											danger
											style={{ marginRight: 15, marginLeft: 60 }}
										>
											Cancel
										</Button>

										<Button
											className='btn btn-primary'
											htmlType='submit'
											icon={<CloudUploadOutlined />}
											type='primary'
											ghost
										>
											Save profile
										</Button>
									</Fragment>
								)}
							</Form>
							<ToastContainer
								position='top-right'
								autoClose={5000}
								hideProgressBar={false}
								newestOnTop={false}
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
							/>
						</div>
					</Spin>
				)}
			</div>
			<Modal
				title='Title'
				open={true}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<div>Hello</div>
				{/* {userImage.url && (
					<img
						src={userImage.url}
						alt='avatar'
						style={{
							width: '100%',
						}}
					/>
				)} */}
			</Modal>
			<Modal title='Basic Modal' open={true} onOk={handleOk} onCancel={handleCancel}>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</>
	);
}

export default Profile;
