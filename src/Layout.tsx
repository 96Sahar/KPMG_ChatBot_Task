import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<main className="w-screen h-screen bg-white-cream ">
			<Outlet />
		</main>
	);
};

export default Layout;
