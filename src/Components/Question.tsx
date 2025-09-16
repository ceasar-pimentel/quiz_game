import type { props, IQuestionModel } from "../utility";
import { useRef, type JSX } from "react";

interface QuestionProps extends props {
	questionModel: IQuestionModel;
	className?: string;
	onChange: (key: string, newModel: IQuestionModel) => void;
	validate: boolean;
	questionId: string;
}

export default function Question({
	questionModel,
	className,
	onChange,
	validate,
	questionId,
}: QuestionProps) {
	if (validate) {
		// need to get the right and wrong answers and their corresponding element.
	}

	return (
		<fieldset className={className} key={questionId}>
			<legend>{questionModel.question}</legend>

			{Object.keys(questionModel.choices).map((key) => {
				const answer = questionModel.choices[key];
				return (
					<div className="choice" key={answer}>
						<label key={answer}>
							<input
								id={key}
								key={key}
								type="radio"
								name={questionModel.question}
								value={answer}
								onClick={() => onChange(key, questionModel)}
							/>
							<span>{answer}</span>
						</label>
					</div>
				);
			})}
		</fieldset>
	);
}

function buildAnswers(
	key: string,
	answer: string,
	questionModel: IQuestionModel,
	onChange: (key: string, newModel: IQuestionModel) => void
): JSX.Element {
	return (
		<div>
			<label>
				<input
					id={key}
					key={key}
					type="radio"
					name={answer}
					value={answer}
					onClick={() => onChange(key, questionModel)}
				/>
				<span>{answer}</span>
			</label>
		</div>
	);
}
