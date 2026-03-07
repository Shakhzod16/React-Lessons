import { useEffect, useState } from 'react';
import type { User } from '/types/index';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

function Crud() {
	const [users, setUsers] = useState<User[]>([]);
	const [name, setNmae] = useState('');
	const [age, setAge] = useState('');

	useEffect(() => {
		getUser();
	}, []);

	const deleteUser = () => {};
	const createUser = async () => {
		try {
      await axios.post(API_URL + '/users', { name, age: parseInt(age) });
      getUser()
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

	const editUser = () => {};

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
								<button className='btn btn-danger'>🗑️</button>
								<button className='btn btn-warning'>✏️</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Crud;
