import { Routes, Route, useNavigate } from 'react-router-dom';
import { publicRoute, privateRoute } from './routes';
import { DefaultLayout } from '~/components/Layout';

import { useDispatch, useSelector } from 'react-redux';
import { axiosJWT } from './redux/api/config';
import jwt_decode from 'jwt-decode';
import { getMembers, refreshToken } from './redux/api';
import { loginSuccess } from './redux/reducer/authSlice';
import { useEffect } from 'react';
import ProtectPage from './pages/ProtectPage';

function App() {
	const user = useSelector((state) => state.auth.login.data);

	return (
		<Routes>
			{publicRoute
				.filter((route) => {
					if (user && route.path === '/login') {
						return false;
					}
					return true;
				})
				.map((route, index) => {
					const Layout = route.layout || DefaultLayout;
					const Page = route.component;
					const SideBar = route.sideBar;

					return (
						<Route
							key={index}
							element={
								<Layout>
									<Page mainContent />
									{SideBar && <SideBar sideBar />}
								</Layout>
							}
							path={route.path}
						/>
					);
				})}
			{privateRoute.map((route, index) => {
				let Layout = route.layout || DefaultLayout;
				let Page = route.component;
				let SideBar = route.sideBar;

				//Protect route when not login
				if (!user) {
					const protectedRoute = publicRoute.find(
						(routeLogin) => routeLogin.path === '/login',
					);
					Layout = protectedRoute.layout;
					Page = protectedRoute.component;
					SideBar = protectedRoute.sideBar;
				}
				return (
					<Route
						key={index}
						element={
							<Layout>
								<Page mainContent />
								{SideBar && <SideBar sideBar />}
							</Layout>
						}
						path={route.path}
					/>
				);
			})}
		</Routes>
	);
}

export default App;
