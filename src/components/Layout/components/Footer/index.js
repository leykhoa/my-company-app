import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
	return (
		<footer className={cx('wrapper')}>
			<div className='row'>
				<div className='col-4'>
					<h1 className={cx('title')}>ABCD joint stock company</h1>
					<div className={cx('content')}>
						<p>Address: Dien Duong - Dien Ban - Quang Nam</p>
						<p>Tax Code: 0108171240</p>
						<p>Email: leykhoaqk@gmail.com</p>
						<p>Phone: 0909.10.9396</p>
					</div>
				</div>
				<div className='col-4'></div>
				<div className='col-4'></div>
			</div>
		</footer>
	);
}

export default Footer;
