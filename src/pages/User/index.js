import {
	DesktopOutlined,
	DollarOutlined,
	ExclamationCircleOutlined,
	FieldTimeOutlined,
	FileOutlined,
	LogoutOutlined,
	PieChartOutlined,
	ProfileOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '~/redux/api';
import Profile from './Profile';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

function Option2() {
	return <h1>This is Option 2 </h1>;
}

function Logout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
	return <div onClick={confirm}>Log out</div>;
}
const items = [
	getItem('Profile', '1', <ProfileOutlined />),
	getItem('Attendance', '2', <FieldTimeOutlined />),
	getItem('Salary', '3', <DollarOutlined />),
	getItem(<Logout />, '4', <LogoutOutlined />),
];

const User = () => {
	const user = useSelector((state) => state.auth.login.data);

	const navigate = useNavigate();
	const contentList = [
		{ key: '1', element: <Profile user={user} /> },
		{ key: '2', element: <Option2 /> },
		{ key: '3', element: <Option2 /> },
		{ key: '4' },
	];
	const [collapsed, setCollapsed] = useState(false);
	const [content, setContent] = useState(contentList[0].element);

	const handleOnClick = (e) => {
		contentList.forEach((content) => {
			if (content.key === e.key && content.element) {
				return setContent(content.element);
			}
		});
	};

	return (
		<Layout
			style={{
				minHeight: '100vh',
			}}
		>
			<Layout className='site-layout'>
				<Content
					style={{
						margin: '0 16px',
					}}
				>
					<div
						className='site-layout-background'
						style={{
							padding: 24,
							minHeight: 360,
						}}
					>
						{content}
					</div>
				</Content>
				<Footer
					style={{
						textAlign: 'center',
					}}
				>
					Ant Design ©2018 Created by Ant UED
				</Footer>
			</Layout>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div className='logo' />
				<Menu
					theme='light'
					defaultSelectedKeys={['1']}
					mode='inline'
					items={items}
					onClick={handleOnClick}
				/>
			</Sider>
		</Layout>
	);
};

export default User;
