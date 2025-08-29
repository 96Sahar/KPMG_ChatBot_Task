import chatIconLight from '@/assets/icons/chatIconLight.svg';
import whitePlusSign from '@/assets/icons/whitePlusSign.svg';
import clock from '@/assets/icons/clock.svg';
import cogWheelIcon from '@/assets/icons/cogWheelIcon.svg';
import dummyData from '@/utils/dummyData';
import Button from './Button';
import RecentChatItem from '../RecentChatItem';

interface SideBarInterface {
	clearChat: () => void;
	newChat: () => void;
}

const Sidebar = ({ clearChat, newChat }: SideBarInterface) => {
	return (
		<div className="h-screen w-1/5 bg-white shadow-2xl flex flex-col rounded-lg">
			<div className="px-6 py-8 border-b border-gray-300 ">
				<div className="flex items-center space-x-3 mb-2">
					<div className="w-8 h-8 bg-orange-300 rounded-xl flex items-center justify-center shadow-sm">
						<img
							src={chatIconLight}
							alt="Chat Logo Light"
							className="w-5 h-5"
						/>
					</div>
					<p className="text-2xl font-bold tracking-wide min-w-0 truncate">
						ChatBot
					</p>
				</div>
				<p className="text-gray-500 text-sm font-light">
					KPMG AI-powered bot
				</p>
			</div>

			<div className="px-6 py-6 border-b border-gray-300">
				<Button
					buttonStyle="main"
					className="w-full text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105"
					onClick={newChat}
				>
					<div className="flex items-center justify-center space-x-2">
						<img
							src={whitePlusSign}
							alt="Plus Sign"
							className="w-5 h-5"
						/>
						<p>New Chat</p>
					</div>
				</Button>
			</div>

			<div className="px-6 py-6 flex-1 flex flex-col min-h-0">
				<p className="text-dark-blue font-medium text-sm tracking-widest mb-4 flex items-center space-x-2">
					<img src={clock} alt="Clock" className="w-5 h-5" />
					<span>Recent Chats</span>
				</p>

				<div className="space-y-2 flex-1 overflow-y-auto min-h-0">
					{dummyData.map((chat, index) => (
						<RecentChatItem
							key={index}
							chat={chat}
							onClick={() => console.log(chat)}
						/>
					))}
				</div>

				<div className="mt-8 space-y-4 ">
					<p className="text-dark-blue text-xs font-medium tracking-wide">
						QUICK ACTIONS
					</p>
					<div className="space-y-2">
						<button
							className="w-full text-left p-2 hover:bg-orange-50 rounded-lg duration-200 cursor-pointer"
							onClick={clearChat}
						>
							<div className="flex items-center space-x-2 text-xs text-dark-blue">
								<div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-500"></div>
								<span>Clear Chat</span>
							</div>
						</button>
					</div>
				</div>
			</div>

			<div className="px-6 py-4 border-t border-gray-300 flex-shrink-0">
				<div className="flex items-center justify-between cursor-pointer">
					<div className="flex items-center space-x-2 text-dark-grey text-xs">
						<div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
						<span>Online</span>
					</div>
					<button className="p-1.5 hover:bg-orange-50 rounded-lg transition-colors duration-200 cursor-pointer">
						<img
							src={cogWheelIcon}
							alt="Cog Wheel Icon"
							className="w-5 h-5 transform transition-transform duration-200 hover:rotate-90"
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
