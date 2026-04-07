import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export type ApiBook = {
	id: string;
	name: string;
	author: string;
	year: number;
};

export const booksApi = createApi({
	reducerPath: 'booksApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
	endpoints: build => ({
		getBooks: build.query<ApiBook[], void>({
			query: () => '/books',
		}),
		getOneBook: build.query<ApiBook, string>({
			query: (id: string) => `/books/${id}`,
		}),
		addBook: build.mutation<ApiBook, ApiBook>({
			query: (bookObj: ApiBook) => ({
				url: '/books',
				method: 'POST',
				body: bookObj,
			}),
		}),
		updateBook: build.mutation<ApiBook, ApiBook>({
			query: (bookObj: ApiBook) => ({
				url: `/books/${bookObj.id}`,
				method: 'PUT',
				body: bookObj,
			}),
		}),
		deleteBook: build.mutation<void, string>({
			query: (id: string) => ({
				url: `/books/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetBooksQuery,
	useGetOneBookQuery,
	useAddBookMutation,
	useUpdateBookMutation,
	useDeleteBookMutation,
} = booksApi;
