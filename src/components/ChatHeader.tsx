import { motion } from 'framer-motion';

interface ChatHeaderInterface {
	main: string;
	description: string;
}
const ChatHeader = ({ main, description }: ChatHeaderInterface) => {
	return (
		<motion.div
			className="p-4 bg-gradient-to-r from-black/5 to-black/10 border-b border-black/10"
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h3 className="text-dark-blue font-semibold text-lg">{main}</h3>
			<p className="text-dark-grey text-sm">{description}</p>
		</motion.div>
	);
};

export default ChatHeader;
