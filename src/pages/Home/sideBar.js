import classNames from 'classnames/bind';
import Notication from '../Notication';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Event() {
	return <h1>This is Event</h1>;
}

function Introduction() {
	return <h1>This is Introduction</h1>;
}

function SideBarHome() {
	return (
		<div className={cx('wrapper')}>
			<Event />
			<Introduction />
			<Notication />
		</div>
	);
}

export default SideBarHome;
