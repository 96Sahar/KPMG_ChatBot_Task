import React from 'react';

interface ModalHeaderProps {
	title: string;
	onClose: () => void;
	subtitle?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
	title,
	onClose,
	subtitle,
}) => {
	return (
		<div className="p-8 pb-0">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-3xl font-bold text-gray-900">{title}</h2>
				<button
					onClick={onClose}
					className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
				>
					×
				</button>
			</div>
			{subtitle && (
				<p className="text-sm text-gray-600 mb-8">{subtitle}</p>
			)}
		</div>
	);
};

export default ModalHeader;
