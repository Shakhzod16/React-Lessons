import { useState } from 'react';

function Lesson3() {
	const [users, setUsers] = useState([
		{
			name: 'Nozim Kozimov',
			age: 23,
			isStudent: true,
		},
		{
			name: 'Nozim Kozimov',
			age: 23,
			isStudent: true,
		},
	]);
	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [isStudent, setStudent] = useState(false);

	return (
		<div className='container py-2'>
			<div className='card w-25 mx-auto my-4'>
				<div className='card-header bg-dark text-white text-center'>Add Student</div>
				<div className='card-body'>
					<input type='text' placeholder='user name...' className='form-control' />
					<input type='text' placeholder='user age...' className='form-control mt-2' />
					<label htmlFor='key'>
						IsStudent
						<input id='key' type='checkbox' className='form-check-input ml-2!' />
					</label>
				</div>
				<div className='card-footer'>
					<button className='btn btn-dark w-100'>Save</button>
				</div>
			</div>
			<table className='table'>
				<thead className='table-dark'>
					<tr>
						<th>N</th>
						<th>Name</th>
						<th>Age</th>
						<th>Is Student</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{user.name}</td>
							<td>{user.age}</td>
							<td>
								<input type='checkbox' checked={user.isStudent} readOnly />
							</td>
							<td className='flex gap-2'>
								<button className='btn btn-danger btn-sm'>Delete</button>
								<button className='btn btn-primary btn-sm'>Edit</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Lesson3;
