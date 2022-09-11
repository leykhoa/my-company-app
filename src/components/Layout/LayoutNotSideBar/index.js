import classNames from 'classnames/bind';
import styles from './LayoutNotSideBar.module.scss';

import Header from '../components/Header';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);
function LayoutNotSideBar({ children }) {
	return (
		<div className={cx('wrapper')}>
			<Header />
			<div className={cx('container')}>
				<div className={cx('content')}>{children}</div>
			</div>
			<Footer />
		</div>
	);
}
export default LayoutNotSideBar;
