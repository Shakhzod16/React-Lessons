import type { Group } from './../../../types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const parseGroupsFromStorage = (): Group[] => {
	const rawGroups = localStorage.getItem('groups');
	if (!rawGroups) return [];

	try {
		const parsed = JSON.parse(rawGroups);
		if (!Array.isArray(parsed)) return [];

		return parsed.map((group, index) => ({
			id: typeof group?.id === 'number' ? group.id : index + 1,
			name: typeof group?.name === 'string' ? group.name : '',
			active: Boolean(group?.active),
		}));
	} catch {
		return [];
	}
};

type State = {
	groups: Group[];
	modalOpen: boolean;
	groupName: string;
};

const initialState: State = {
	groups: parseGroupsFromStorage(),
	modalOpen: false,
	groupName: '',
};

const groupSlice = createSlice({
	name: 'group',
	initialState,
	reducers: {
		addGroup: (state, action) => {
			state.groups.push(action.payload);
			state.groupName = '';
			localStorage.setItem('groups', JSON.stringify(state.groups));
		},
		openModal: state => {
			state.modalOpen = true;
		},
		closeModal: state => {
			state.modalOpen = false;
		},
		setGroupName: (state, action: PayloadAction<string>) => {
			state.groupName = action.payload;
		},
		changeGroupStatus: (state, action: PayloadAction<number>) => {
			const currentGroup = state.groups.find(group => group.id === action.payload);
			if (!currentGroup) return;
			{
				currentGroup.active = !currentGroup.active;
				localStorage.setItem('groups', JSON.stringify(state.groups));
			}
		},
	},
});

export const { addGroup, openModal, closeModal, setGroupName, changeGroupStatus } = groupSlice.actions;
export default groupSlice.reducer;
