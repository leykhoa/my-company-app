import classNames from 'classnames/bind';
import styles from './Career.module.scss';

const cx = classNames.bind(styles);

function ApplicationForm() {
	return (
		<form className={cx('apply-form')}>
			<h1>Apply now!</h1>
		</form>
	);
}

export default ApplicationForm;
