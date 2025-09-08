import { useEffect, useState, useRef } from "react";
import Question from "../Components/Question";
import "./QuizPage.css";
import type { QuestionModel } from "../utility";
import he from "he";

export default function QuizPage() {
	const [data, setData] = useState<QuestionModel[]>([]);

	function updateChange(index: number, newModel: QuestionModel) {
		setData((prev) => {
			const copy = [...prev];
			copy[index] = newModel;
			return copy;
		});
	}

	useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=10")
			.then((res) => res.json())
			.then((data) => {
				const formattedData = data.results.map(
					(questionModel: QuestionModel) => {
						questionModel.category = he.decode(questionModel.category);
						questionModel.correct_answer = he.decode(
							questionModel.correct_answer
						);
						questionModel.difficulty = he.decode(questionModel.difficulty);
						questionModel.incorrect_answers =
							questionModel.incorrect_answers.map((incorrectAnswer) => {
								return he.decode(incorrectAnswer);
							});
						questionModel.question = he.decode(questionModel.question);
						questionModel.type = he.decode(questionModel.type);

						return questionModel;
					}
				);

				setData(formattedData);
			});
	}, []);

	return (
		<main id="quiz-container">
			<div>
				{data.map((questionModel: QuestionModel, index: number) => (
					<Question
						key={index}
						className="question"
						questionModel={questionModel}
						onChange={updateChange}
						index={index}
					/>
				))}
			</div>
			<div>
				<button>Check Answers</button>
			</div>
		</main>
	);
}
