// export type Book = {
// 	id: number;
// 	name: string;
// 	description: string;
// 	price: number;
// 	author: string;
// };

// export type BookCreate = Omit<Book, 'id'>;
// export type BookUpdate = Partial<BookCreate>;

// export type User = {
// 	id: string;
// 	name: string;
//   isStudent: boolean;
//   age:number
// };

export enum Status {
	TODO = 'todo',
	PROGRESS = 'progress',
	COMPLETED = 'completed',
}

export interface Task {
	id: number;
	name: string;
	status: Status;
}