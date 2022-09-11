import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import images from '~/assets/images/images';
import { privateRoute, publicRoute } from '~/routes';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import './Header.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Header() {
	const [title, setTitle] = useState('Home');
	document.title = title;
	const user = useSelector((state) => state.auth.login.data);

	return (
		<header>
			<nav className='navbar navbar-expand fixed-top'>
				<NavLink className={cx('navbar-brand')} to='/'>
					<img src={images.avatar} alt='logo-meta' width='50px' />
				</NavLink>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#collapsibleNavbar'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse row' id='collapsibleNavbar'>
					<ul className='navbar-nav col'>
						{publicRoute
							.filter((router) => {
								if (user && router.path === '/login') {
									return false;
								}
								if (router.path === '*') {
									return false;
								}
								return true;
							})
							.map((route, index) => {
								return (
									<NavLink
										className={(nav) =>
											cx('nav-link', { active: nav.isActive })
										}
										to={route.path}
										onClick={() => setTitle(route.title)}
										key={index}
									>
										{route.image ? route.image : route.title}
									</NavLink>
								);
							})}
					</ul>

					<ul className='navbar-nav col d-flex flex-row-reverse '>
						{user &&
							privateRoute.map((route, index) => {
								return (
									<NavLink
										className={(nav) =>
											cx('nav-link', { active: nav.isActive })
										}
										to={route.path}
										onClick={() => setTitle(route.title)}
										key={index}
									>
										{route.image ? route.image : route.title}
									</NavLink>
								);
							})}
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default Header;
