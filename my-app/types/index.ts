export interface User {
	id: string;
	name: string;
	age: number;
	isStudent: boolean;
}

export interface Group {
	id: number;
	name: string;
	active: boolean;
}

export interface Student {
	id: number;
	fullName: string;
	age: number;
	email: string;
	active: boolean;
	groupId: number;
}
