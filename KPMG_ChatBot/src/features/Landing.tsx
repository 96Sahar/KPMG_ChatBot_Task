import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import RegisterModal from '../components/RegisterModal';
export const Landing = () => {
	const navigate = useNavigate();
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

	const openRegisterModal = () => setIsRegisterModalOpen(true);
	const closeRegisterModal = () => setIsRegisterModalOpen(false);

	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="max-w-5xl bg-white rounded-2xl px-20 py-16 text-center space-y-12 shadow-layered-card">
				<h1 className="text-2xl font-semibold leading-tight whitespace-pre-line text-dark-blue">
					Welcome to the KPMG AI Chatbot!
				</h1>
				<div className="flex justify-center">
					<Button
						buttonStyle="main"
						onClick={() => navigate('/chatbot')}
					>
						Login
					</Button>
					<Button
						buttonStyle="main"
						className="ml-4"
						onClick={openRegisterModal}
					>
						Register
					</Button>
				</div>
			</div>

			<RegisterModal
				isOpen={isRegisterModalOpen}
				onClose={closeRegisterModal}
			/>
		</div>
	);
};

export default Landing;
