import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import counterReducer from './counterSlice';
import userReducer from './userSlice1';
import groupReducer from './slices/groupSlice';
import studentReducer from './slices/studentSlice';

const store = configureStore({
	reducer: {
		counter: counterReducer,
		book: bookReducer,
		user: userReducer,
		group: groupReducer,
		student: studentReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
