interface ButtonProps {
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	buttonStyle?: 'main' | 'secondary';
}
const Button = ({
	onClick,
	children,
	className,
	disabled,
	type,
	buttonStyle,
}: ButtonProps) => {
	let style = '';
	if (buttonStyle === 'main')
		style =
			'bg-light-blue/80 font-semibold hover:bg-light-blue/70 justify-center items-center w-56 h-12 rounded-xl';

	return (
		<div className="flex flex-col items-center">
			<button
				type={type}
				disabled={disabled}
				onClick={onClick}
				className={`flex text-dark-blue ${style} transition-colors duration-300 cursor-pointer ${className}`}
			>
				{children}
			</button>
		</div>
	);
};

export default Button;
