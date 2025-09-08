import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";
import QuizPage from "./Pages/QuizPage";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />}>
					<Route index element={<LandingPage />} />
					<Route path="/quiz" element={<QuizPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
