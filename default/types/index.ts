

export type User = {
	id: number;
	name: string;
	email: string;
	phone: string;
	website: string;
	address: {
		city: string;
	};
};

export type Todo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};
