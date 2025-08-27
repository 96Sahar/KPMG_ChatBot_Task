import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<main className="flex-1 bg-white-cream">
			<Outlet />
		</main>
	);
};

export default Layout;
