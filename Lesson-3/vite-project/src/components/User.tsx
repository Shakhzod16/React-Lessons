import axios from 'axios';
import { useEffect, useState } from 'react';
import { type User } from '../../types';

const BACKEND_URL = 'http://localhost:3000';

function User() {
	const [users, setUsers] = useState<User[]>([]);
	const [useForm, setUserForm] = useState({
		name: '',
		age: '',
		isStudent: false,
	});

	const [editId, setEditId] = useState<number | null>(null);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		try {
			const { data } = await axios.get<User[]>(`${BACKEND_URL}/users`);
			setUsers(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`${BACKEND_URL}/users/${id}`);

			if (editId === id) {
				setEditId(null);
				setUserForm({ name: '', age: '', isStudent: false });
			}
			getUsers();
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = (user: User) => {
		setEditId(user.id);
		setUserForm({
			name: user.name ?? '',
			age: String(user.age ?? ''),
			isStudent: Boolean(user.isStudent),
		});
	};

	const handleSave = async () => {
		try {
			if (!useForm.name.trim()) return;

			if (editId !== null) {
				await axios.put(`${BACKEND_URL}/users/${editId}`, {
					id: editId,
					name: useForm.name,
					age: Number(useForm.age),
					isStudent: useForm.isStudent,
				});
			} else {
				await axios.post(`${BACKEND_URL}/users`, {
					name: useForm.name,
					age: Number(useForm.age),
					isStudent: useForm.isStudent,
				});
			}

			setEditId(null);
			setUserForm({ name: '', age: '', isStudent: false });
			getUsers();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='container p-4'>
			<div className='card w-25 mx-auto my-4'>
				<div className='card-header bg-dark text-white text-center'>Card</div>
				<div className='card-body'>
					<div className='mb-3'>
						<input
							value={useForm.name}
							onChange={e => setUserForm(prev => ({ ...prev, name: e.target.value }))}
							type='text'
							placeholder='User Name'
							className='form-control'
						/>
					</div>

					<div className='mb-3'>
						<input
							value={useForm.age}
							onChange={e => setUserForm(prev => ({ ...prev, age: e.target.value }))}
							type='number'
							placeholder='User Age'
							className='form-control'
						/>
					</div>

					<div className='form-check'>
						<input
							checked={useForm.isStudent}
							onChange={e => setUserForm(prev => ({ ...prev, isStudent: e.target.checked }))}
							id='bir'
							type='checkbox'
							className='form-check-input'
						/>
						<label htmlFor='bir' className='form-check-label'>
							Is Student
						</label>
					</div>
				</div>
				<div className='card-footer'>
					<button className='btn btn-dark w-100' onClick={handleSave}>
						{editId !== null ? 'Update' : 'Save'}
					</button>
				</div>
			</div>

			<table className='table'>
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
					{users.map((user, index) => (
						<tr key={user.id}>
							<td>{index + 1}</td>
							<td>{user.name}</td>
							<td>{user.age}</td>
							<td>{String(user.isStudent)}</td>
							<td>
								<button className='btn btn-danger' onClick={() => handleDelete(user.id)}>
									🗑️
								</button>
								<button className='btn btn-warning ml-2' onClick={() => handleEdit(user)}>
									✏️
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default User;
