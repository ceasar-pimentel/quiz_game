export interface props {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}

export interface QuestionModel {
	type: string;
	difficulty: string;
	category: string;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
	selected_answer?: string;
}
