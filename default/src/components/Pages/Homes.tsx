/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from 'react';
import type { User } from '../../../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Homes() {
	const [users, setUsers] = useState<User[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const { data } = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
			setUsers(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleTodos = (userId: number) => {
		navigate(`/todos/${userId}`);
	};

	return (
		<div className='container py-3'>
			<table className='table'>
				<thead className='table-dark'>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Website</th>
						<th>City</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.phone}</td>
							<td>{user.website}</td>
							<td>{user.address.city}</td>
							<td>
								<button onClick={() => handleTodos(user.id)} className='btn btn-primary'>
									Todos
								</button>
								<button className='btn btn-warning'>Posts</button>
								<button className='btn btn-danger'>Albums</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Homes;
