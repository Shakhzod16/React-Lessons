import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Student } from '../../../types';

const parseStudentsFromStorage = (): Student[] => {
	const rawStudents = localStorage.getItem('students');
	if (!rawStudents) return [];

	try {
		const parsed = JSON.parse(rawStudents);
		if (!Array.isArray(parsed)) return [];

		const groupNameToId: Record<string, number> = {};
		const rawGroups = localStorage.getItem('groups');
		if (rawGroups) {
			try {
				const parsedGroups = JSON.parse(rawGroups);
				if (Array.isArray(parsedGroups)) {
					parsedGroups.forEach((group, index) => {
						if (typeof group?.name !== 'string') return;
						const id = typeof group?.id === 'number' ? group.id : index + 1;
						groupNameToId[group.name] = id;
					});
				}
			} catch {
				// no-op
			}
		}

		return parsed.map((student, index) => {
			const groupIdFromStudent = typeof student?.groupId === 'number' ? student.groupId : undefined;
			let legacySelectedGroupId: number | undefined;

			if (typeof student?.selectedGroupId === 'number') {
				legacySelectedGroupId = student.selectedGroupId;
			} else if (typeof student?.selectedGroupId === 'string') {
				const numericId = Number(student.selectedGroupId);
				if (!Number.isNaN(numericId) && student.selectedGroupId.trim() !== '') {
					legacySelectedGroupId = numericId;
				} else {
					legacySelectedGroupId = groupNameToId[student.selectedGroupId];
				}
			}

			return {
				id: typeof student?.id === 'number' ? student.id : Date.now() + index,
				fullName: typeof student?.fullName === 'string' ? student.fullName : '',
				age: typeof student?.age === 'number' ? student.age : Number(student?.age) || 0,
				email: typeof student?.email === 'string' ? student.email : '',
				active: typeof student?.active === 'boolean' ? student.active : true,
				groupId: groupIdFromStudent ?? legacySelectedGroupId ?? 0,
			};
		});
	} catch {
		return [];
	}
};

type StudentForm = {
	fullName: string;
	age: number;
	email: string;
	selectedGroupId: number | '';
};

interface State {
	students: Student[];
	modalVisible: boolean;
	studentForm: StudentForm;
	editingId: number | null;
}

const initialState: State = {
	students: parseStudentsFromStorage(),
	modalVisible: false,
	studentForm: {
		fullName: '',
		age: 0,
		email: '',
		selectedGroupId: '',
	},
	editingId: null,
};

const studentSlice = createSlice({
	name: 'student',
	initialState,
	reducers: {
		openStudentModal: state => {
			state.modalVisible = true;
		},
		closeStudentModal: state => {
			state.modalVisible = false;
			state.studentForm = initialState.studentForm;
			state.editingId = null;
		},
		handleStudentForm: (
			state,
			action: PayloadAction<{ key: keyof StudentForm; value: StudentForm[keyof StudentForm] }>,
		) => {
			state.studentForm = {
				...state.studentForm,
				[action.payload.key]: action.payload.value,
			};
		},
		addStudent: state => {
			const { fullName, age, email, selectedGroupId } = state.studentForm;
			if (!fullName.trim() || !email.trim() || age <= 0) return;

			if (state.editingId === null) {
				state.students.push({
					id: Date.now(),
					fullName: fullName.trim(),
					age: Number(age),
					email: email.trim(),
					active: true,
					groupId: selectedGroupId === '' ? 0 : Number(selectedGroupId),
				});
			} else {
				const currentStudent = state.students.find(student => student.id === state.editingId);
				if (!currentStudent) return;

				currentStudent.fullName = fullName.trim();
				currentStudent.age = Number(age);
				currentStudent.email = email.trim();
				currentStudent.groupId = selectedGroupId === '' ? 0 : Number(selectedGroupId);
			}

			localStorage.setItem('students', JSON.stringify(state.students));
			state.studentForm = initialState.studentForm;
			state.editingId = null;
		},
		deleteStudent: (state, action: PayloadAction<number>) => {
			state.students = state.students.filter(student => student.id !== action.payload);
			localStorage.setItem('students', JSON.stringify(state.students));
		},
		editStudent: (state, action: PayloadAction<Student>) => {
			state.editingId = action.payload.id;
			state.studentForm = {
				fullName: action.payload.fullName,
				age: action.payload.age,
				email: action.payload.email,
				selectedGroupId: action.payload.groupId === 0 ? '' : action.payload.groupId,
			};
			state.modalVisible = true;
		},
		changeStudentStatus: (state, action: PayloadAction<number>) => {
			const currentStudent = state.students.find(student => student.id === action.payload);
			if (!currentStudent) return;

			currentStudent.active = !currentStudent.active;
			localStorage.setItem('students', JSON.stringify(state.students));
		},
	},
}); 

export const {
	openStudentModal,
	closeStudentModal,
	handleStudentForm,
	addStudent,
	deleteStudent,
	editStudent,
	changeStudentStatus,
} = studentSlice.actions;
export default studentSlice.reducer;
