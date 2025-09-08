import { Link } from "react-router";
import "./LandingPage.css";

export default function LandingPage() {
	return (
		<div id="landing-page-container">
			<h1 className="title">Quizzical</h1>
			<h2 className="description">a fun quiz game</h2>
			<Link to="/quiz" id="start-btn" aria-label="start the game button">
				Start Quiz
			</Link>
		</div>
	);
}
