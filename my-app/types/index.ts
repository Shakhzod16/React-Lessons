export type Group = {
	id: number;
	name: string;
	active: boolean;
};
export type Student = {
	id: number;
	fullName: string;
	age: number;
	email: string;
	active: boolean;
	groupId: number;
};
