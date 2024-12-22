import "./App.css";
import reactLogo from "./assets/react.svg";
import useCountdown from "./hooks/useCountdown";
import viteLogo from "/vite.svg";

function App() {
	const { timeLeft, startCountdown } = useCountdown({
		seconds: 6000,
		onComplete: () => () => {
			console.log("Countdown completed!");
		},
	});

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => startCountdown()}>
					{timeLeft.days}days{timeLeft.hours}h:{timeLeft.minutes}m:
					{timeLeft.seconds}s
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
