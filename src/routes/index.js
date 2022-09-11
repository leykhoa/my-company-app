import Attendance from '~/pages/Attendance';
import Career from '~/pages/Career';
import ChatRoom from '~/pages/ChatRoom';
import Home from '~/pages/Home';
import User from '~/pages/User';
import Members from '~/pages/Members';
import images from '~/assets/images/images';
import LayoutNotSideBar from '~/components/Layout/LayoutNotSideBar';
import ApplicationForm from '~/pages/Career/form';
import LogIn from '~/pages/LogIn';
import SideBarHome from '~/pages/Home/sideBar';
import Error from '~/pages/Error';
import AttendanceSideBar from '~/pages/Attendance/attendanceSideBar';

const publicRoute = [
	{
		path: '/',
		component: Home,
		title: 'Home',
		sideBar: SideBarHome,
	},
	{ path: '/career', component: Career, title: 'Career', sideBar: ApplicationForm },
	{ path: '/login', component: LogIn, title: 'Log In', layout: LayoutNotSideBar },
	{ path: '*', component: Error, title: ' Error', layout: LayoutNotSideBar },
];

const privateRoute = [
	{
		component: User,
		title: 'User',
		image: <img src={images.avatar} alt='img-avata' width='40px' className='rounded-pill' />,
		path: '/user',
		layout: LayoutNotSideBar,
	},
	{ path: '/attendance', component: Attendance, title: 'Attendance', sideBar: AttendanceSideBar },
	{ path: '/chat-room', component: ChatRoom, title: 'Chat', sideBar: ApplicationForm },
	{ path: '/member', component: Members, title: 'Members', layout: LayoutNotSideBar },
];

export { publicRoute, privateRoute };
