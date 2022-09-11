import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectPage({ children }) {
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.login.data);
	if (!user) {
		return (
			<>
				<h1>Hello</h1>
				<div>{children}</div>
			</>
		);
	}
	return <>{children}</>;
}

export default ProtectPage;
