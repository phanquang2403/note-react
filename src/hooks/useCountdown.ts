import { useState, useEffect, useCallback } from "react";

export interface ITimeLeft {
	total: number;
	days: string;
	hours: string;
	minutes: string;
	seconds: string;
}
interface UseCountdownProps {
	seconds: number;
	onComplete?: () => void;
}
const useCountdown = ({ seconds, onComplete }: UseCountdownProps) => {
	const [isRunning, setIsRunning] = useState(false);
	const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(seconds));

	useEffect(() => {
		if (!isRunning || timeLeft.total <= 0) {
			return;
		}

		const interval = setInterval(() => {
			setTimeLeft((prev) => {
				const newTimeLeft = calculateTimeLeft(prev.total / 1000 - 1);
				if (newTimeLeft.total <= 0) {
					clearInterval(interval);
					setIsRunning(false);
					onComplete?.();
				}
				return newTimeLeft;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [isRunning, timeLeft, onComplete]);

	const startCountdown = useCallback(() => {
		setTimeLeft(calculateTimeLeft(seconds));
		setIsRunning(true);
	}, [seconds]);

	return { timeLeft, isRunning, startCountdown };
};

const calculateTimeLeft = (seconds: number) => {
	const total = seconds * 1000;
	return {
		total,
		days: padNumber(Math.max(0, Math.floor(seconds / (60 * 60 * 24)))),
		hours: padNumber(Math.max(0, Math.floor((seconds / (60 * 60)) % 24))),
		minutes: padNumber(Math.max(0, Math.floor((seconds / 60) % 60))),
		seconds: padNumber(Math.max(0, Math.floor(seconds % 60))),
	};
};

const padNumber = (num: number) => String(num).padStart(2, "0");
export default useCountdown;
