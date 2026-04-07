import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import counterReducer from './counterSlice';
import userReducer from './userSlice1';
import groupReducer from './slices/groupSlice';
import studentReducer from './slices/studentSlice';
import { usersApi } from './slices/usersApi';
import usersReducer from './slices/usersSlice';
import { booksApi } from './slices/booksApi';
import booksReducer from './slices/booksSlice';

const store = configureStore({
	reducer: {
		counter: counterReducer,
		book: bookReducer,
		user: userReducer,
		group: groupReducer,
		student: studentReducer,
		users: usersReducer,
		books: booksReducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[booksApi.reducerPath]: booksApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware, booksApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
