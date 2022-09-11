//import css
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from './Sidebar';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
	const content = children.length ? children.filter((child) => child.props.mainContent)[0] : null;
	const sideBar = children.length ? children.filter((child) => child.props.sideBar)[0] : null;

	return (
		<div className={cx('wrapper')}>
			<Header />
			<div className={`${cx('container')}`}>
				<div className='row'>
					<div className='col-md-8 col-sm-12 '>{content}</div>
					<div className='col-md-4 col-sm-12'>
						<Sidebar children={sideBar} />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
export default DefaultLayout;
