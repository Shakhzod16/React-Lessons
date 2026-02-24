export type Book = {
	id: number;
	name: string;
	description: string;
	price: number;
	author: string;
};

export type BookCreate = Omit<Book, 'id'>;
export type BookUpdate = Partial<BookCreate>;

export type User = {
	id: string;
	name: string;
  isStudent: boolean;
  age:number
};
