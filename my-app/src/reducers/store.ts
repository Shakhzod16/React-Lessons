import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import bookReducer from './bookSlice';

const store = configureStore({
	reducer: {
		counter: counterReducer,
		book: bookReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
