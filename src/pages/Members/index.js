import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, getMembers, logoutUser } from '~/redux/api';
import {
	EditOutlined,
	EllipsisOutlined,
	ExclamationCircleOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Modal } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Members.module.scss';

const cx = classNames.bind(styles);

const { Meta } = Card;

function Members() {
	const user = useSelector((state) => state.auth?.login.data);
	const members = useSelector((state) => state.users?.members.data);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const departments = [];

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

	useEffect(() => {
		try {
			const allMembers = getMembers(user, dispatch, navigate);
			if (allMembers.errorMessage) {
				toast.error(`${allMembers.errorMessage}`, {
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
		} catch (err) {
			console.log('check getmember', err);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	if (members) {
		members.forEach((user) => {
			if (!departments.includes(user.department)) {
				if (user.department === 'Executive Board') {
					return departments.unshift(user.department);
				}
				return departments.push(user.department);
			}
		});
	}
	const handleUserShow = () => {
		console.log('ok');
	};
	return (
		<>
			<ToastContainer />
			<h1>Welcome!</h1>
			<h3>All members of our team!</h3>

			<div className='container'>
				{departments.map((department, index) => {
					return (
						<div className='row'>
							<div className={cx('user')}>
								{members
									.filter((member) => member.department === department)
									.map((user, index) => (
										<button className={cx('user-card')}>
											<Card
												style={{ width: 300 }}
												cover={
													<img alt='avatar-user' src={user.imageUrl} />
												}
												actions={
													user.isManager
														? [
																<SettingOutlined key='setting' />,
																<EditOutlined key='edit' />,
																<EllipsisOutlined key='ellipsis' />,
														  ]
														: false
												}
												key={index}
												onClick={handleUserShow}
											>
												<Meta
													avatar={
														<Avatar src='https://joeschmoe.io/api/v1/random' />
													}
													title={user.name}
													description='This is the description'
												/>
											</Card>
										</button>
									))}
							</div>

							<div className={`${cx('department')}`} key={index}>
								{department}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Members;
