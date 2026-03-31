type Book = {
	id: number;
	name: string;
	year: number;
};

type State = {
	books: Book[];
	name: string;
	year: string;
	editingIndex: number | null;
};

export const initialState: State = {
	books: [],
	name: '',
	year: '',
	editingIndex: null,
};

type Action =
	| { type: 'ADD_BOOK'; payload: Book }
	| { type: 'GET_NAME'; payload: string }
	| { type: 'GET_YEAR'; payload: string }
	| { type: 'CLEAR_FORM' }
	| { type: 'DELETE_BOOK'; payload: number }
	| { type: 'EDIT_BOOK'; payload: number };

export function bookReducer(state: State, action: Action) {
	switch (action.type) {
		case 'ADD_BOOK':
			if (state.editingIndex == null) {
				return { ...state, books: [...state.books, action.payload] };
			} else {
				const currentBook = state.books[state.editingIndex];
				currentBook.name = state.name;
				currentBook.year = parseInt(state.year);
				return { ...state, editingIndex: null };
			}

		case 'GET_NAME':
			return { ...state, name: action.payload };

		case 'GET_YEAR':
			return { ...state, year: action.payload };

		case 'CLEAR_FORM':
			return { ...state, name: '', year: '' };

		case 'EDIT_BOOK':
			return {
				...state,
				name: state.books[action.payload].name,
				year: state.books[action.payload].year + '',
				editingIndex: action.payload,
			};

		default:
			return state;
	}
}
