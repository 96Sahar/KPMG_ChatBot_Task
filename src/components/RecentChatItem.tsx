interface RecentChatItemInterface {
	chat: string;
	onClick?: () => void;
}
const RecentChatItem = ({ chat, onClick }: RecentChatItemInterface) => {
	return (
		<div
			className="group p-3 rounded-xl hover:bg-white-cream cursor-pointer transition-all duration-200 border border-transparent  hover:shadow-md"
			onClick={onClick}
		>
			<div className="flex items-center space-x-3">
				<div className="w-2 h-2 bg-orange-300 rounded-full group-hover:bg-orange-400 transition-colors duration-200"></div>
				<p className="text-dark-blue text-sm transition-colors duration-200 truncate">
					{chat}
				</p>
			</div>
		</div>
	);
};

export default RecentChatItem;
