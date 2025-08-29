import { motion } from 'framer-motion';
const TypingAnimation = () => {
	return (
		<div className="text-xs text-gray-500 mt-3 h-4 flex items-center px-2">
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				className="flex items-center gap-2"
			>
				<div className="flex gap-1">
					<div
						className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
						style={{
							animationDelay: '0ms',
						}}
					></div>
					<div
						className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
						style={{
							animationDelay: '150ms',
						}}
					></div>
					<div
						className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
						style={{
							animationDelay: '300ms',
						}}
					></div>
				</div>
				<span>Press Enter to send</span>
			</motion.div>
		</div>
	);
};
export default TypingAnimation;
