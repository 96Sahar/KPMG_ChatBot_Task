import { useState, useRef, useEffect } from 'react';
import Message from '../components/Message';
import { motion } from 'framer-motion';
import Sidebar from '@/components/UI/Sidebar';
import Button from '@/components/UI/Button';

interface MessageType {
	text: string;
	isUser: boolean;
}

const ChatBot = () => {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState<MessageType[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const newChat = () => {
		setMessages(() => [{ text: 'Welcome!', isUser: false }]);
	};
	const clearChat = () => {
		setMessages(() => []);
	};
	const handleSendMessage = () => {
		if (!input) return;
		setMessages((prev) => [...prev, { text: input, isUser: true }]);
		setTimeout(
			() =>
				setMessages((prev) => [
					...prev,
					{ text: input, isUser: false },
				]),
			1000
		);
		setInput('');
	};
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);
	useEffect(() => setMessages([{ text: 'Welcome!', isUser: false }]), []);

	return (
		<div className="w-screen h-screen flex">
			<Sidebar clearChat={clearChat} newChat={newChat} />
			<div className="flex flex-1 items-center justify-center p-4">
				<div className="flex flex-col h-[90%] w-1/3 bg-black/10 rounded-xl">
					<div className="flex-1 overflow-y-auto p-4 space-y-2">
						{messages.map((message, index) => (
							<Message
								key={index}
								message={message.text}
								isUser={message.isUser}
							/>
						))}
						<div ref={messagesEndRef} />
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
									e.key === 'Enter' && handleSendMessage()
								}
								placeholder="Type your message..."
								className="flex-1 outline-none text-sm min-w-0"
							/>
							<Button
								buttonStyle="main"
								onClick={handleSendMessage}
								className="flex-shrink-0 w-fit px-4 text-dark-blue hover:cursor-pointer"
							>
								Send
							</Button>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ChatBot;
