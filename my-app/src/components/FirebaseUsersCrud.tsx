import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc, type Firestore } from 'firebase/firestore';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { db, firebaseConfigError } from '../firebase/firebase';

type UserDoc = {
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

const initialForm: UserForm = {
	name: '',
	age: '',
	isStudent: false,
};

const getErrorMessage = (error: unknown) => {
	if (error instanceof Error) return error.message;
	return 'Nomalum xatolik yuz berdi';
};

function FirebaseUsersCrudReady({ firestoreDb }: { firestoreDb: Firestore }) {
	const [users, setUsers] = useState<UserDoc[]>([]);
	const [form, setForm] = useState<UserForm>(initialForm);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const usersCollection = useMemo(() => collection(firestoreDb, 'users'), [firestoreDb]);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			usersCollection,
			snapshot => {
				const nextUsers = snapshot.docs
					.map(item => {
						const data = item.data() as Partial<Omit<UserDoc, 'id'>>;
						const safeAge = typeof data.age === 'number' ? data.age : Number(data.age ?? 0);

						return {
							id: item.id,
							name: typeof data.name === 'string' ? data.name : '',
							age: Number.isNaN(safeAge) ? 0 : safeAge,
							isStudent: Boolean(data.isStudent),
							createdAt: typeof data.createdAt === 'number' ? data.createdAt : 0,
						};
					})
					.sort((a, b) => b.createdAt - a.createdAt);

				setUsers(nextUsers);
				setIsLoading(false);
				setError(null);
			},
			snapshotError => {
				setError(getErrorMessage(snapshotError));
				setIsLoading(false);
			},
		);

		return () => unsubscribe();
	}, [usersCollection]);

	const resetForm = () => {
		setForm(initialForm);
		setEditingId(null);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const trimmedName = form.name.trim();
		const ageNumber = Number(form.age);

		if (!trimmedName) {
			setError('Name kiritilishi shart');
			return;
		}

		if (!Number.isInteger(ageNumber) || ageNumber < 0) {
			setError('Age butun son va 0 dan katta yoki teng bolishi kerak');
			return;
		}

		setIsSaving(true);
		setError(null);

		const payload = {
			name: trimmedName,
			age: ageNumber,
			isStudent: form.isStudent,
		};

		try {
			if (editingId) {
				await updateDoc(doc(firestoreDb, 'users', editingId), payload);
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
			await deleteDoc(doc(firestoreDb, 'users', id));
			if (editingId === id) {
				resetForm();
			}
		} catch (deleteError) {
			setError(getErrorMessage(deleteError));
		}
	};

	const handleEdit = (user: UserDoc) => {
		setEditingId(user.id);
		setForm({
			name: user.name,
			age: String(user.age),
			isStudent: user.isStudent,
		});
	};

	return (
		<div className='container py-4'>
			<div className='card mx-auto' style={{ maxWidth: '420px' }}>
				<div className='card-header bg-dark text-white text-center'>Add User</div>
				<div className='card-body'>
					<form onSubmit={event => void handleSubmit(event)}>
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

						<div className='mt-2'>
							<label htmlFor='isStudentCheckbox' className='form-check-label me-2'>
								IsStudent
							</label>
							<input
								id='isStudentCheckbox'
								type='checkbox'
								checked={form.isStudent}
								onChange={event => setForm(prev => ({ ...prev, isStudent: event.target.checked }))}
								className='form-check-input'
							/>
						</div>

						<div className='card-footer bg-white border-0 px-0 pb-0 mt-3'>
							<div className='d-flex gap-2'>
								<button type='submit' disabled={isSaving} className='btn btn-dark w-100'>
									{editingId ? 'Update' : 'Save'}
								</button>
								{editingId ? (
									<button type='button' onClick={resetForm} className='btn btn-outline-secondary w-100'>
										Cancel
									</button>
								) : null}
							</div>
						</div>
					</form>
				</div>
			</div>

			{error ? <div className='alert alert-danger mt-3'>{error}</div> : null}

			<div className='table-responsive mt-3'>
				<table className='table table-bordered table-striped align-middle'>
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
								<td colSpan={5} className='text-center'>
									Loading...
								</td>
							</tr>
						) : users.length === 0 ? (
							<tr>
								<td colSpan={5} className='text-center'>
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
										<div className='d-flex gap-2'>
											<button
												type='button'
												onClick={() => void handleDelete(user.id)}
												className='btn btn-danger btn-sm'>
												x
											</button>
											<button type='button' onClick={() => handleEdit(user)} className='btn btn-warning btn-sm'>
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

function FirebaseUsersCrud() {
	if (!db) {
		return (
			<div className='container py-4'>
				<div className='alert alert-warning'>
					{firebaseConfigError ?? 'Firebase initialize qilib bolmadi. .env dagi qiymatlarni tekshiring.'}
				</div>
			</div>
		);
	}

	return <FirebaseUsersCrudReady firestoreDb={db} />;
}

export default FirebaseUsersCrud;
