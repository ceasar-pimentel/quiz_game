import type { props, QuestionModel } from "../utility";

interface QuestionProps extends props {
	questionModel: QuestionModel;
	className: string;
	onChange: (index: number, newModel: QuestionModel) => void;
	questionIndex: number;
}

export default function Question({
	questionModel,
	className,
	onChange,
	questionIndex,
}: QuestionProps) {
	return (
		<fieldset className={className}>
			<legend>{questionModel.question}</legend>

			<section className={className}>
				{[...questionModel.incorrect_answers, questionModel.correct_answer].map(
					(answer, index) => {
						return (
							<div>
								<label key={answer}>
									<input
										id={index.toString()}
										type="radio"
										name={questionModel.question}
										value={answer}
										onClick={() =>
											onChange(questionIndex, {
												...questionModel,
												selected_answer: answer,
											})
										}
									/>
									<span>{answer}</span>
								</label>
							</div>
						);
					}
				)}
			</section>
		</fieldset>
	);
}
