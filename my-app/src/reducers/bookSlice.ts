import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Book = {
	id: number;
	name: string;
	year: number;
};

type State = {
	books: Book[];
	editngId: number | null;
	bookForm: {
		name: string;
		year: string;
	};
};

const initialState: State = {
	books: [],
	editngId: null,
	bookForm: {
		name: '',
		year: '',
	},
};

const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		addBook: (state, action: PayloadAction<Book>) => {
			if (state.editngId === null) {
				state.books.push(action.payload);
			} else {
				const currentBook = state.books.find(b => b.id === state.editngId);
				if (!currentBook) return;

				currentBook.name = state.bookForm.name;
				currentBook.year = parseInt(state.bookForm.year);
				state.editngId = null;
			}

			state.bookForm.name = '';
			state.bookForm.year = '';
		},

		getBookName: (state, action: PayloadAction<string>) => {
			state.bookForm.name = action.payload;
		},

		getBookYear: (state, action: PayloadAction<string>) => {
			state.bookForm.year = action.payload;
		},

		removeBook: (state, action: PayloadAction<number>) => {
			state.books = state.books.filter(b => b.id !== action.payload);
		},

		editBook: (state, action: PayloadAction<{ id: number; name: string; year: string }>) => {
			state.bookForm.name = action.payload.name;
			state.bookForm.year = action.payload.year;
			state.editngId = action.payload.id;
		},
	},
});

export const { addBook, getBookName, getBookYear, removeBook, editBook } = bookSlice.actions;
export default bookSlice.reducer;
