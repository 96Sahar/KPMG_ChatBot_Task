import Message from '../components/Message';
const ChatBot = () => {
	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<div className="text-center h-[80vh] w-[80vh] flex flex-col pt-6 bg-black/10 rounded-xl">
				<div>
					<Message
						message={
							'This is a check for something that might happen'
						}
						isUser={true}
					/>
					<Message
						message={
							'This is a check for something that might happen'
						}
						isUser={false}
					/>
				</div>
			</div>
		</div>
	);
};

export default ChatBot;
