import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import counterReducer from './counterSlice';
import userReducer from './userSlice1';

const store = configureStore({
	reducer: {
		counter: counterReducer,
		book: bookReducer,
		user: userReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
