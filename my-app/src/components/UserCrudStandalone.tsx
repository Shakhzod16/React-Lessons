import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc, type Firestore } from 'firebase/firestore';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { db, firebaseConfigError } from '../firebase/firebase';
import './UserCrudStandalone.css';

type User = {
	id: string;
	name: string;
	age: number;
	isStudent: boolean;
	createdAt: number;
};

type UserForm = {
	name: string;
	age: string;
	isStudent: boolean;
};

const emptyForm: UserForm = {
	name: '',
	age: '',
	isStudent: false,
};

const getErrorMessage = (error: unknown) => {
	if (error instanceof Error) return error.message;
	return 'Unknown error';
};

function UserCrudStandaloneReady({ firestoreDb }: { firestoreDb: Firestore }) {
	const [users, setUsers] = useState<User[]>([]);
	const [form, setForm] = useState<UserForm>(emptyForm);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const usersCollection = useMemo(() => collection(firestoreDb, 'usersCrudDemo'), [firestoreDb]);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			usersCollection,
			snapshot => {
				const mappedUsers = snapshot.docs
					.map(item => {
						const data = item.data() as Partial<Omit<User, 'id'>>;
						const safeAge = typeof data.age === 'number' ? data.age : Number(data.age ?? 0);

						return {
							id: item.id,
							name: typeof data.name === 'string' ? data.name : '',
							age: Number.isNaN(safeAge) ? 0 : safeAge,
							isStudent: Boolean(data.isStudent),
							createdAt: typeof data.createdAt === 'number' ? data.createdAt : 0,
						};
					})
					.sort((a, b) => a.createdAt - b.createdAt);

				setUsers(mappedUsers);
				setError(null);
				setIsLoading(false);
			},
			snapshotError => {
				setError(getErrorMessage(snapshotError));
				setIsLoading(false);
			},
		);

		return () => unsubscribe();
	}, [usersCollection]);

	const resetForm = () => {
		setForm(emptyForm);
		setEditingId(null);
		setError(null);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const name = form.name.trim();
		const age = Number(form.age);

		if (!name) {
			setError('Name is required');
			return;
		}

		if (!Number.isInteger(age) || age <= 0) {
			setError('Age must be a positive integer');
			return;
		}

		const payload = {
			name,
			age,
			isStudent: form.isStudent,
		};

		setIsSaving(true);
		setError(null);

		try {
			if (editingId) {
				await updateDoc(doc(firestoreDb, 'usersCrudDemo', editingId), payload);
			} else {
				await addDoc(usersCollection, {
					...payload,
					createdAt: Date.now(),
				});
			}
			resetForm();
		} catch (submitError) {
			setError(getErrorMessage(submitError));
		} finally {
			setIsSaving(false);
		}
	};

	const handleDelete = async (id: string) => {
		setError(null);
		try {
			await deleteDoc(doc(firestoreDb, 'usersCrudDemo', id));
			if (editingId === id) resetForm();
		} catch (deleteError) {
			setError(getErrorMessage(deleteError));
		}
	};

	const handleEdit = (user: User) => {
		setEditingId(user.id);
		setForm({
			name: user.name,
			age: String(user.age),
			isStudent: user.isStudent,
		});
		setError(null);
	};

	return (
		<div className='crud-wrapper'>
			<form className='crud-card' onSubmit={event => void handleSubmit(event)}>
				<div className='crud-card-header'>Add User</div>

				<div className='crud-card-body'>
					<input
						value={form.name}
						onChange={event => setForm(prev => ({ ...prev, name: event.target.value }))}
						type='text'
						placeholder='name...'
						className='form-control'
					/>
					<input
						value={form.age}
						onChange={event => setForm(prev => ({ ...prev, age: event.target.value }))}
						type='number'
						placeholder='age...'
						className='form-control mt-2'
					/>

					<label className='crud-checkbox-row'>
						<span>IsStudent</span>
						<input
							checked={form.isStudent}
							onChange={event => setForm(prev => ({ ...prev, isStudent: event.target.checked }))}
							type='checkbox'
						/>
					</label>
				</div>

				<div className='crud-card-footer'>
					<button type='submit' className='btn crud-save-btn' disabled={isSaving}>
						{editingId ? 'update' : 'save'}
					</button>
					{editingId ? (
						<button type='button' className='btn btn-secondary btn-sm' onClick={resetForm}>
							cancel
						</button>
					) : null}
				</div>

				{error ? <p className='crud-error'>{error}</p> : null}
			</form>

			<div className='crud-table-wrap'>
				<table className='table table-striped align-middle mb-0'>
					<thead className='table-dark'>
						<tr>
							<th>N</th>
							<th>Name</th>
							<th>Age</th>
							<th>IsStudent</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							<tr>
								<td colSpan={5} className='text-center py-3'>
									Loading...
								</td>
							</tr>
						) : users.length === 0 ? (
							<tr>
								<td colSpan={5} className='text-center py-3'>
									No users
								</td>
							</tr>
						) : (
							users.map((user, index) => (
								<tr key={user.id}>
									<td>{index + 1}</td>
									<td>{user.name}</td>
									<td>{user.age}</td>
									<td>{String(user.isStudent)}</td>
									<td>
										<div className='crud-actions'>
											<button
												type='button'
												onClick={() => void handleDelete(user.id)}
												className='btn btn-danger btn-sm px-2 py-0'
												aria-label={`Delete ${user.name}`}>
												x
											</button>
											<button type='button' onClick={() => handleEdit(user)} className='btn btn-warning btn-sm py-0'>
												edit
											</button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function UserCrudStandalone() {
	if (!db) {
		return (
			<div className='crud-wrapper'>
				<div className='alert alert-warning mb-0'>
					{firebaseConfigError ?? 'Firebase is not configured. Check your .env file.'}
				</div>
			</div>
		);
	}

	return <UserCrudStandaloneReady firestoreDb={db} />;
}

export default UserCrudStandalone;
