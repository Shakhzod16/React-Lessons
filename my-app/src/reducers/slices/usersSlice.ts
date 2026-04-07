import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type User = {
	id: string;
	name: string;
	age: number;
	isStudent: boolean;
};

type State = {
	users: User[];
	editingId: string | null;
	userForm: {
		name: string;
		age: string;
	};
};

const initialState: State = {
	users: [],
	editingId: null,
	userForm: {
		name: '',
		age: '',
	},
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<User[]>) => {
			state.users = action.payload;
		},
		handleUserForm: (state, action: PayloadAction<{ key: keyof State['userForm']; value: string }>) => {
			state.userForm[action.payload.key] = action.payload.value;
		},
		startEditUser: (state, action: PayloadAction<User>) => {
			state.editingId = action.payload.id;
			state.userForm.name = action.payload.name;
			state.userForm.age = String(action.payload.age);
		},
		clearUserForm: state => {
			state.userForm.name = '';
			state.userForm.age = '';
			state.editingId = null;
		},
	},
});

export const { setUsers, handleUserForm, startEditUser, clearUserForm } = userSlice.actions;

export default userSlice.reducer;
