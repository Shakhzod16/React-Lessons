import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type User = {
	id: number;
	name: string;
	age: number;
	isStudent: boolean;
};

type State = {
	users: User[];
	editngId: number | null;
	userForm: {
		name: string;
		age: string;
		isStudent: boolean;
	};
};

const initialState: State = {
	users: [],
	editngId: null,
	userForm: {
		name: '',
		age: '',
		isStudent: true,
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<User>) => {
			if (state.editngId === null) {
				state.users.push(action.payload);
			} else {
				const currentUser = state.users.find(u => u.id === state.editngId);
				if (!currentUser) return;

				currentUser.name = state.userForm.name;
				currentUser.age = parseInt(state.userForm.age);
				currentUser.isStudent = state.userForm.isStudent;

				state.editngId = null;
			}

			state.userForm.name = '';
			state.userForm.age = '';
			state.userForm.isStudent = true;
		},

		getUserName: (state, action: PayloadAction<string>) => {
			state.userForm.name = action.payload;
		},

		getUserAge: (state, action: PayloadAction<string>) => {
			state.userForm.age = action.payload;
		},

		getUserStatus: (state, action: PayloadAction<boolean>) => {
			state.userForm.isStudent = action.payload;
		},

		removeUser: (state, action: PayloadAction<number>) => {
			state.users = state.users.filter(u => u.id !== action.payload);
		},

		editUser: (state, action: PayloadAction<{ id: number; name: string; age: string; isStudent: boolean }>) => {
			state.userForm.name = action.payload.name;
			state.userForm.age = action.payload.age;
			state.userForm.isStudent = action.payload.isStudent;
			state.editngId = action.payload.id;
		},
	},
});

export const { addUser, getUserName, getUserAge, getUserStatus, removeUser, editUser } = userSlice.actions;

export default userSlice.reducer;
