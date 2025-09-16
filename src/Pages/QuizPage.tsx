import { useEffect, useState } from "react";
import Question from "../Components/Question";
import "./QuizPage.css";
import {
	type IQuestionModel,
	type QuestionDictionary,
	type IQuestionDTO,
	MapQuestion,
} from "../utility";

import { v4 as uuidv4 } from "uuid";

export default function QuizPage() {
	const numberOfQuestions = 5;

	// states
	const [data, setData] = useState<QuestionDictionary>({});
	const [validate, setValidate] = useState(false);

	function updateChange(key: string, newModel: IQuestionModel) {
		setData((prev) => {
			prev[key] = newModel;
			return prev;
		});
	}

	useFetchQuestionData(numberOfQuestions, setData);

	return (
		<main id="quiz-container">
			<div>
				{Object.keys(data)?.map((key: string) => {
					return (
						<Question
							key={key}
							questionId={key}
							questionModel={data[key]}
							className="sdf"
							validate={validate}
							onChange={updateChange}
						/>
					);
				})}
			</div>
			<div>
				<button
					onClick={() => {
						setValidate(true);
					}}
				>
					Check Answers
				</button>
			</div>
		</main>
	);
}

function useFetchQuestionData(
	numberOfQuestions: number,
	setData: React.Dispatch<React.SetStateAction<QuestionDictionary>>
) {
	useEffect(() => {
		fetch(
			`https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=easy&type=multiple`
		)
			.then((res) => res.json())
			.then((data) => {
				const questionDictionary: QuestionDictionary = {};
				const results: IQuestionDTO[] = data.results;

				results.forEach((element: IQuestionDTO) => {
					questionDictionary[uuidv4()] = MapQuestion(element);
				});

				setData(questionDictionary);
			})
			.catch((error) => {
				console.error("fetch error", error);
			});
	}, []);
}
