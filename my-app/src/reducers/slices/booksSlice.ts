import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiBook } from './booksApi';

type State = {
	books: ApiBook[];
	editingId: string | null;
	bookForm: {
		name: string;
		author: string;
		year: string;
	};
};

const initialState: State = {
	books: [],
	editingId: null,
	bookForm: {
		name: '',
		author: '',
		year: '',
	},
};

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setBooks: (state, action: PayloadAction<ApiBook[]>) => {
			state.books = action.payload;
		},
		handleBookForm: (state, action: PayloadAction<{ key: keyof State['bookForm']; value: string }>) => {
			state.bookForm[action.payload.key] = action.payload.value;
		},
		startEditBook: (state, action: PayloadAction<ApiBook>) => {
			state.editingId = action.payload.id;
			state.bookForm.name = action.payload.name;
			state.bookForm.author = action.payload.author;
			state.bookForm.year = String(action.payload.year);
		},
		clearBookForm: state => {
			state.bookForm.name = '';
			state.bookForm.author = '';
			state.bookForm.year = '';
			state.editingId = null;
		},
	},
});

export const { setBooks, handleBookForm, startEditBook, clearBookForm } = booksSlice.actions;

export default booksSlice.reducer;
