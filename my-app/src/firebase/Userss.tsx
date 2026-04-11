import type { User } from '../../types';
import { useEffect, useState } from 'react';
import { ref, push, set, onValue, remove, update } from 'firebase/database';
import { realDB } from './firebase';
import { ImSpinner3 } from 'react-icons/im';

function Userss() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [isStudent, setIsStudent] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);

	useEffect(() => {
		const usersRef = ref(realDB, 'users/');
		const unsubscribe = onValue(usersRef, snapshot => {
			const data = snapshot.val();
			if (data) {
				const list = Object.keys(data).map(key => ({
					id: key,
					...data[key],
				}));
				setUsers(list);
				setLoading(false);
			} else {
				setUsers([]);
				setLoading(false);
			}
		});
		return () => unsubscribe();
	}, []);

	const handleSave = async () => {
		try {
			if (editingId === null) {
				const userRef = ref(realDB, 'users/');
				const newUserRef = push(userRef);

				await set(newUserRef, {
					name,
					age: Number(age),
					isStudent,
				});
			} else {
				const userRef = ref(realDB, `users/${editingId}`);
				await update(userRef, {
					name,
					age: Number(age),
					isStudent,
				});
				setEditingId(null);
				setName('');
				setAge('');
				setIsStudent(false);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleDelete = async (id: string) => {
		const userRef = ref(realDB, `users/${id}`);
		remove(userRef);
	};
	const handleEdit = (user: User) => {
		setName(user.name);
		setAge(String(user.age));
		setIsStudent(user.isStudent);
		setEditingId(user.id);
	};

	if (loading) {
		return (
			<div className='h-screen flex items-center justify-center'>
				<ImSpinner3 size={40} className='animate-spin' />
			</div>
		);
	}

	return (
		<>
			<div className='container py-3'>
				<div className='card w-25 mx-auto my-2'>
					<div className='card-header bg-dark text-white text-center'>Users</div>
					<div className='card-body'>
						<input
							value={name}
							onChange={e => setName(e.target.value)}
							type='text'
							placeholder='name...'
							className='form-control'
						/>
						<input
							value={age}
							onChange={e => setAge(e.target.value)}
							type='number'
							placeholder='age...'
							className='form-control mt-2'
						/>
						<label htmlFor='bir'>
							IsStudent{' '}
							<input
								checked={isStudent}
								onChange={e => setIsStudent(e.target.checked)}
								id='bir'
								type='checkbox'
								className='form-check-input mt-2'
							/>
						</label>
					</div>
					<div className='card-footer'>
						<button onClick={handleSave} className='btn btn-primary w-100'>
							Add User
						</button>
					</div>
				</div>
			</div>

			<div className='container py-3'>
				<table className='table table-bordered'>
					<thead>
						<tr className='table-dark'>
							<th>N</th>
							<th>Name</th>
							<th>Age</th>
							<th>Is Student</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr key={user.id}>
								<td>{index + 1}</td>
								<td>{user.name}</td>
								<td>{user.age}</td>
								<td>{user.isStudent ? 'Yes' : 'No'}</td>
								<td>
									<button onClick={() => handleEdit(user)} className='btn btn-sm btn-outline-primary'>
										Edit
									</button>
									<button onClick={() => handleDelete(user.id)} className='btn btn-sm btn-outline-danger ms-2'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Userss;
