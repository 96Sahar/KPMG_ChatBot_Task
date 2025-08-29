import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useAnimatedText from '@/hooks/useAnimatedText';

interface MessageProps {
	message: string;
	icon?: string;
	isUser?: boolean;
}

const Message = ({ message, isUser }: MessageProps) => {
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const messageSpeed = message.length > 20 ? 3 : 1;
	const animatedText = useAnimatedText(message, messageSpeed);
	const textToRender = isUser ? message : animatedText;
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [message]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className={`flex py-2 p-4 max-w-full ${
				isUser ? 'justify-end' : 'justify-start'
			}`}
		>
			<div
				className={`p-4 ${
					isUser
						? 'bg-dark-blue text-white border-gray-600'
						: 'bg-white text-left border-gray-200'
				} w-fit rounded-lg border text-center flex items-center gap-2 shadow-sm`}
			>
				<div
					dangerouslySetInnerHTML={{
						__html: textToRender,
					}}
				/>
			</div>
			<div ref={bottomRef} />
		</motion.div>
	);
};

export default Message;
