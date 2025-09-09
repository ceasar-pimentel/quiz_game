import { useEffect, useState, useRef } from "react";
import Question from "../Components/Question";
import "./QuizPage.css";
import type { QuestionModel } from "../utility";
import he from "he";

export default function QuizPage() {
	const numberOfQuestions = 5;
	const [data, setData] = useState<QuestionModel[]>([]);
	const correctAnswers = useRef(0);

	function updateChange(index: number, newModel: QuestionModel) {
		setData((prev) => {
			const copy = [...prev];
			copy[index] = newModel;
			console.log(copy[index].selected_answer);
			return copy;
		});
	}

	function checkAnswersHandler() {
		for (const question of data as QuestionModel[]) {
			if (question.selected_answer === question.correct_answer) {
				correctAnswers.current++;
			}
		}

		console.log(correctAnswers);
	}

	useEffect(() => {
		fetch(
			`https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=easy&type=multiple`
		)
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
						questionIndex={index}
					/>
				))}
			</div>
			<div>
				<button onClick={checkAnswersHandler}>Check Answers</button>
			</div>
		</main>
	);
}
