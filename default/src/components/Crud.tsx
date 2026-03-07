import { useEffect, useState } from 'react';
import type { User } from '/types/index';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

function Crud() {
	const [users, setUsers] = useState<User[]>([]);
	const [name, setNmae] = useState('');
	const [age, setAge] = useState('');

	const [editingId, setEditingId] = useState<null | string>(null);

	useEffect(() => {
		getUser();
	}, []);

	const deleteUser = async (id: string) => {
		try {
			await axios.delete(API_URL + `/users/${id}`);
			getUser();
		} catch (error) {
			console.log(error);
		}
	};
	const createUser = async () => {
		try {
			const userObj = {
				name,
				age: parseInt(age),
			};
			if (editingId === null) {
				await axios.post(API_URL + '/users', userObj);
			} else {
				await axios.put(API_URL + `/users/${editingId}`, userObj);
				setEditingId(null)
			}

			getUser();
		} catch (error) {
			console.log(error);
		}
	};

	const getUser = async () => {
		try {
			const { data } = await axios.get(API_URL + '/users');
			setUsers(data);
		} catch (error) {
			console.log(error);
		}
	};

	const editUser = (user: User) => {
		setNmae(user.name);
		setAge(user.age.toString());
		setEditingId(user.id);
	};

	return (
		<div className='container py-2'>
			<div className='card w-25 mx-auto'>
				<div className='card-header bg-dark text-white text-center'>Add User</div>
				<div className='card-body'>
					<input
						type='text'
						className='form-control'
						value={name}
						onChange={e => setNmae(e.target.value)}
						placeholder='name...'
					/>
					<input
						type='number'
						className='form-control mt-2'
						value={age}
						onChange={e => setAge(e.target.value)}
						placeholder='age...'
					/>
				</div>
				<div className='card-footer'>
					<button onClick={createUser} className='btn btn-dark w-100'>
						Save
					</button>
				</div>
			</div>

			<table className='table my-3'>
				<thead className='table-dark'>
					<tr>
						<th>N</th>
						<th>Name</th>
						<th>age</th>
						<th>actions</th>
					</tr>
				</thead>

				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{user.name}</td>
							<td>{user.age}</td>
							<td className='d-flex gap-2 align-center'>
								<button onClick={() => deleteUser(user.id)} className='btn btn-danger'>
									🗑️
								</button>
								<button onClick={() => editUser(user)} className='btn btn-warning'>
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

export default Crud;
