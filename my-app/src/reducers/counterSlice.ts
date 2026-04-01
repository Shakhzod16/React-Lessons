import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		count: 0,
	},
	reducers: {
		increment: state => {
			state.count += 1;
		},
		decriment: state => {
			state.count -= 1;
		},
		reset: state => {
			state.count = 0;
		},
		addTen: (state, action) => {
			state.count += action.payload;
		},
	},
});

export const { increment, decriment, reset, addTen } = counterSlice.actions;
export default counterSlice.reducer;
