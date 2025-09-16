import { v4 as uuidv4 } from "uuid";
import he from "he";

export interface props {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}
export interface IQuestionDTO {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
}

export interface ChoiceDictionary {
	[key: string]: string;
}

export interface IQuestionModel {
	id: string;
	category: string;
	choices: ChoiceDictionary;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
	select_answer?: string; // set the uuid as the selected answer.
}

export interface QuestionDictionary {
	[key: string]: IQuestionModel;
}

export function MapQuestion(dto: IQuestionDTO): IQuestionModel {
	const choices: ChoiceDictionary = {};

	[...dto.incorrect_answers, dto.correct_answer].forEach((answer) => {
		choices[uuidv4()] = he.decode(answer);
	});

	const questionModel: IQuestionModel = {
		id: uuidv4(),
		category: he.decode(dto.category),
		choices: choices,
		difficulty: dto.difficulty,
		incorrect_answers: dto.incorrect_answers,
		question: he.decode(dto.question),
		type: dto.type,
	};

	return questionModel;
}
