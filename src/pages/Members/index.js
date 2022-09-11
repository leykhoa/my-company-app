import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, getMembers } from '~/redux/api';

function Members() {
	const user = useSelector((state) => state.auth?.login.data);
	// const members = useSelector((state) => state.users?.members.data);
	// console.log('check member', members);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const departments = [];

	getMembers(user, dispatch, navigate);

	// if (members) {
	// 	members.forEach((user) => {
	// 		if (!departments.includes(user.department)) {
	// 			return departments.push(user.department);
	// 		}
	// 		console.log('check department', departments);
	// 	});
	// }

	return (
		<>
			<h1>Welcome!</h1>
			<h3>All members of our team!</h3>
		</>
	);
}

export default Members;
