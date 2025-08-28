import { useState } from 'react';
import Message from '../components/Message';
import { motion } from 'framer-motion';
import Sidebar from '@/components/UI/Sidebar';
import { sendMessage } from '@/services/userServices';

interface MessageType {
	text: string;
	isUser: boolean;
}

const ChatBot = () => {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState<MessageType[]>([]);

	const handleSend = async () => {
		if (!input) return;
		const message = await sendMessage(input.trim());
		if (message) {
			setMessages((prev) => [...prev, { text: message, isUser: true }]);
			setTimeout(
				() =>
					setMessages((prev) => [
						...prev,
						{ text: message, isUser: false },
					]),
				1000
			);
			setInput('');
		}
	};

	return (
		<div className="h-screen w-screen flex">
			<Sidebar />

			<div className="flex flex-1 items-center justify-center">
				<div className="text-center h-9/10 w-1/3 flex flex-col pt-6 bg-black/10 rounded-xl">
					<div className="flex-1">
						{messages.map((message, index) => (
							<Message
								key={index}
								message={message.text}
								isUser={message.isUser}
							/>
						))}
					</div>
					<motion.div
						className="p-4"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.3 }}
					>
						<div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-gray-200">
							<input
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={(e) =>
									e.key === 'Enter' && handleSend()
								}
								placeholder="Type your message..."
								className="flex-1 outline-none text-sm"
							/>
							<button
								onClick={handleSend}
								className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
							>
								Send
							</button>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ChatBot;
