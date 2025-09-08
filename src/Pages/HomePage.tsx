import { Outlet } from "react-router";
import bottom_blob from "../assets/bottom_blob.svg";
import top_blob from "../assets/top_blob.svg";
import "./HomePage.css";
export default function HomePage() {
	return (
		<main>
			<img id="bottom-blob" src={bottom_blob} />
			<Outlet />
			<img id="top-blob" src={top_blob} />
		</main>
	);
}
