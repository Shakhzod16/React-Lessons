import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

type User = {
	id: number;
	name: string;
	username: string;
	email: string;
};

function ComponentsUsers() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	const getUsers = async () => {
		setLoading(true);
		setErrorMsg('');

		try {
			const { data } = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
			setUsers(data);
		} catch (error) {
			setErrorMsg('Xatolik yuz berdi.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	const filteredUsers = useMemo(() => {
		const q = searchQuery.toLowerCase();
		if (!q) return users;
		return users.filter(u => u.name.toLowerCase().includes(q));
	}, [users, searchQuery]);

	return (
		<div className='container p-3'>
			<h3>Users</h3>

			<input
				type='search'
				placeholder='search by name...'
				value={searchQuery}
				onChange={e => setSearchQuery(e.target.value)}
				className='form-control w-25 my-2'
			/>

			{loading && (
				<div className='flex justify-center pt-10'>
					<FaSpinner size={40} className='animate-spin' />
				</div>
			)}

			{errorMsg && <div className='alert alert-danger'>{errorMsg}</div>}

			{!loading && !errorMsg && (
				<table className='table table-striped'>
					<thead className='table-dark'>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Username</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.map(u => (
							<tr key={u.id}>
								<td>{u.id}</td>
								<td>{u.name}</td>
								<td>{u.username}</td>
								<td>{u.email}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default ComponentsUsers;
