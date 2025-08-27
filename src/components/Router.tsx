import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '../features/Landing';
import ChatBot from '../features/ChatBot';
import Layout from '../Layout';

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Landing />} />
				<Route path="chatbot" element={<ChatBot />} />
			</Route>
		</Routes>
	</BrowserRouter>
);
export default Router;
