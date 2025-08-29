import { animate, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

const useAnimatedText = (text: string, duration: number = 1.5) => {
	const animatedText = useMotionValue(0);
	const [displayedIndex, setDisplayedIndex] = useState(0);

	useEffect(() => {
		const controls = animate(animatedText, text.length, {
			duration: duration,
			ease: 'easeInOut',
			onUpdate(value) {
				setDisplayedIndex(Math.floor(value));
			},
		});
		return () => controls.stop();
	}, [text, animatedText, duration]);

	return text.slice(0, displayedIndex);
};

export default useAnimatedText;
