import type { props, QuestionModel } from "../utility";

interface QuestionProps extends props {
	questionModel: QuestionModel;
	className: string;
	onChange: (index: number, newModel: QuestionModel) => void;
	index: number;
}

export default function Question({
	questionModel,
	className,
	onChange,
	index,
}: QuestionProps) {
	return (
		<fieldset className={className}>
			<legend>{questionModel.question}</legend>

			<section className={className}>
				{[...questionModel.incorrect_answers, questionModel.correct_answer].map(
					(answer) => {
						return (
							<label key={answer}>
								<input
									type="radio"
									name={questionModel.question}
									value={answer}
									onClick={() =>
										onChange(index, {
											...questionModel,
											selected_answer: answer,
										})
									}
								/>
								{answer}
							</label>
						);
					}
				)}
			</section>
		</fieldset>
	);
}
