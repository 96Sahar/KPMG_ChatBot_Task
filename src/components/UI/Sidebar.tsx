const Sidebar = () => {
	return (
		<div className="fixed left-0 top-0 h-full w-48 bg-gray-100 border-r border-gray-300">
			<div className="pt-4">
				<p className="text-lg font-medium mb-6 text-center">Chatbot</p>
				<p className="border-t border-black bg-gray-100 w-full mb-[2vh]"></p>
				<button className="p-4 text-lg hover:cursor-pointer font-serif ">
					New Chat
				</button>
				<p className="border-t border-gray-300 bg-gray-100 w-full my-[4vh]"></p>
				<div className="p-4 text-lg font-light font-serif ">chats</div>
			</div>
		</div>
	);
};

export default Sidebar;
