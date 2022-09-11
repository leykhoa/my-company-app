import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Attendance.module.scss';
import { Button } from 'antd';
import { checkIn } from '~/redux/api';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AttendanceSideBar() {
	const user = useSelector((state) => state.auth.login.data);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const day = moment(new Date()).format('[Today is] dddd[,] MMMM[ ]Do[, ]YYYY ');
	const workStatus = user.workStatus;
	const handleCheckInOut = async () => {
		try {
			const checkin = await checkIn(user, dispatch, navigate);
			return checkin;
		} catch (err) {
			console.log('check err222', err);
		}
	};

	return (
		<div className={cx('wrapper')}>
			<div className={cx('title')}>{day}</div>
			<div>
				<Button onClick={handleCheckInOut}>{workStatus ? 'CHECK OUT' : 'CHECK IN'}</Button>
			</div>
		</div>
	);
}

export default AttendanceSideBar;
