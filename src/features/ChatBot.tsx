import { useState, useRef, useEffect } from 'react';
import Message from '../components/Message';
import { motion } from 'framer-motion';
import Sidebar from '@/components/UI/Sidebar';
import Button from '@/components/UI/Button';
import ChatHeader from '@/components/ChatHeader';
import sendIcon from '@/assets/icons/sendIcon.svg';
import TypingAnimation from '@/components/UI/TypingAnimation';

interface MessageType {
	text: string;
	isUser: boolean;
}

const ChatBot = () => {
	const [input, setInput] = useState('');
	const [expandedChat, setExpandedChat] = useState<boolean>(false);
	const [messages, setMessages] = useState<MessageType[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const newChat = () => {
		clearChat();
		setTimeout(
			() => setMessages(() => [{ text: 'Welcome!', isUser: false }]),
			100
		);
	};

	const clearChat = () => {
		setInput('');
		setMessages(() => []);
	};

	const handleSendMessage = () => {
		if (!input.trim()) return;
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
		<div className="w-screen h-screen flex bg-light-grey ">
			<Sidebar clearChat={clearChat} newChat={newChat} />

			<div className="flex flex-1 items-center justify-center p-4">
				<motion.div
					className={`flex flex-col ${
						expandedChat ? `w-full h-full` : `w-1/3 h-[90%]`
					}  w-1/3 relative `}
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
				>
					<div className="flex flex-col h-full bg-grey rounded-2xl shadow-xl border border-gray-300 relative  ">
						<ChatHeader
							main="KPMG Chat Assistant"
							description="Ready to help"
							expandedChat={expandedChat}
							setExpandedChat={setExpandedChat}
						/>
						<div className="flex-1 overflow-y-auto p-6 space-y-3 relative hide-scrollbar">
							{messages.map((message, index) => (
								<Message
									key={index}
									message={message.text}
									isUser={message.isUser}
								/>
							))}
							<div ref={messagesEndRef} />
						</div>

						<div className="p-6 bg-gradient-to-t from-black/10 to-transparent border-t border-black/10 rounded-b-2xl">
							<div className="flex items-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:border-gray-300 duration-300 transition-all ">
								<div className="flex-1 relative rounded-2xl">
									<input
										type="text"
										value={input}
										onChange={(e) =>
											setInput(e.target.value)
										}
										onKeyDown={(e) =>
											e.key === 'Enter' &&
											handleSendMessage()
										}
										placeholder="Type your message..."
										className="w-full border-0 outline-none focus:outline-none focus:ring-0"
									/>
								</div>

								<div>
									<Button
										buttonStyle="main"
										onClick={handleSendMessage}
										disabled={!input.trim()}
										className="flex-shrink-0 w-fit px-4 py-2 bg-gradient-to-r from-dark-grey to-grey rounded-xl hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed font-medium"
									>
										<span className="flex items-center gap-2">
											Send
											<img
												src={sendIcon}
												alt="Chat Logo Light"
												className="w-5 h-5"
											/>
										</span>
									</Button>
								</div>
							</div>

							{input.length > 0 && <TypingAnimation />}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default ChatBot;
