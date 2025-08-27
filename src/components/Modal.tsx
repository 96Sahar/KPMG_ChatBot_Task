import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	maxWidth = 'max-w-md',
}) => {
	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4"
					onClick={handleBackdropClick}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<motion.div
						className={`bg-white rounded-lg shadow-xl ${maxWidth} w-full max-h-[90vh] overflow-y-auto`}
						initial={{ scale: 0.8, opacity: 0, y: 50 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.8, opacity: 0, y: 50 }}
						transition={{
							duration: 0.3,
							type: 'spring',
							stiffness: 300,
							damping: 25,
						}}
						onClick={(e) => e.stopPropagation()}
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
