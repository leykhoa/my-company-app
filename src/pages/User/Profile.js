import {
	CloudUploadOutlined,
	ExclamationCircleOutlined,
	PlusOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import {
	Button,
	Cascader,
	Checkbox,
	DatePicker,
	Form,
	Image,
	Input,
	InputNumber,
	Modal,
	Radio,
	Select,
	Spin,
	Switch,
	Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ImgCrop from 'antd-img-crop';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, updateUser } from '~/redux/api';
import { toast, ToastContainer } from 'react-toastify';

function Profile(props) {
	const user = props.user;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loadingUpdate = useSelector((state) => state.users.update.isLoading);
	const handleUpdateProfile = async (values) => {
		const doB = values.doB.toISOString();
		const startDate = values.startDate.toISOString();
		const newUser = { ...user, ...values, doB, startDate };
		try {
			const update = await updateUser(newUser, dispatch, navigate);
			if (update.errorMessage) {
				toast.error(`${update.errorMessage}`, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				return confirm();
			}
			toast.success('Update success', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});

			return setDisableInput(true);
		} catch (err) {
			console.log('check err update', err);
		}
	};

	const handleCancel = () => {
		setPreviewVisible(false);
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

	const [disableInput, setDisableInput] = useState(true);

	const editProfile = () => {
		setDisableInput(!disableInput);
	};

	// const onFormLayoutChange = ({ disabled }) => {
	// 	setComponentDisabled(disabled);
	// };
	const [form] = Form.useForm();

	const dateFormat = 'DD/MM/YYYY';
	const getFile = (e) => {
		console.log('Upload event:', e);
	};

	const [fileList, setFileList] = useState([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
	]);

	const onChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	const initialValues = { ...user, doB: moment(user.doB), startDate: moment(user.startDate) };
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const getBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				console.log('check getbase', reader);
				return resolve(reader.result);
			};

			reader.onerror = (error) => reject(error);
		});
	const onPreview = async (file) => {
		console.log('check file', file);

		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setPreviewImage(file.url || file.preview);
		setPreviewVisible(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
	};

	const cancelUpload = () => {
		setDisableInput(true);
		form.setFieldsValue(initialValues);
	};
	let isAdmin = true;
	return (
		<>
			<div>
				{user && (
					<Spin tip='Updating...' spinning={loadingUpdate}>
						<div className='row'>
							<div className='col-6'>
								<Image
									src={fileList.length ? fileList[0].url : user.imageUrl}
									alt='avata'
									width='100%'
								/>
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
										<Form.Item label='Edit avata'>
											<ImgCrop rotate>
												<Upload
													action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
													listType='picture-card'
													fileList={fileList}
													onChange={onChange}
													onPreview={onPreview}
													disabled={disableInput}
												>
													{fileList.length < 1 && '+ Upload'}
												</Upload>
											</ImgCrop>
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
							<Modal
								visible={previewVisible}
								title={previewTitle}
								footer={null}
								onCancel={handleCancel}
							>
								<img
									alt='example'
									style={{
										width: '100%',
									}}
									src={previewImage}
								/>
							</Modal>
							<ToastContainer />
						</div>
					</Spin>
				)}
			</div>
		</>
	);
}

export default Profile;
