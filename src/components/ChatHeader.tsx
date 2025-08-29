import { motion } from 'framer-motion';
import expandIcon from '@/assets/icons/expandIcon.svg';
interface ChatHeaderInterface {
	main: string;
	description: string;
	expandedChat: boolean;
	setExpandedChat: (expanded: boolean) => void;
}

const ChatHeader = ({
	main,
	description,
	expandedChat,
	setExpandedChat,
}: ChatHeaderInterface) => {
	const toggleExpand = () => {
		setExpandedChat(!expandedChat);
	};

	return (
		<motion.div
			className="p-4 bg-gradient-to-r from-black/5 to-black/10 border-b border-black/10 flex justify-between items-center"
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div>
				<h3 className="text-dark-blue font-semibold text-lg">{main}</h3>
				<p className="text-dark-grey text-sm">{description}</p>
			</div>

			<button
				onClick={toggleExpand}
				className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/50 hover:bg-white/70 transition-colors duration-200 shadow-sm hover:shadow-md"
			>
				<img src={expandIcon} alt="expand icon" className="w-5 h-5" />
			</button>
		</motion.div>
	);
};

export default ChatHeader;
