import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import {
	addUser,
	editUser,
	getUserAge,
	getUserName,
	getUserStatus,
	removeUser,
	type User,
} from '../reducers/userSlice1';

function Users() {
	const dispatch = useAppDispatch();
	const { users, userForm } = useAppSelector(state => state.user);

	const handleSave = () => {
		const userObj = {
			id: Date.now(),
			name: userForm.name,
			age: parseInt(userForm.age),
			isStudent: userForm.isStudent,
		};
		dispatch(addUser(userObj));
	};

	const handleDelete = (id: number) => {
		dispatch(removeUser(id));
	};

	const handleUpdate = (user: User) => {
		dispatch(
			editUser({
				id: user.id,
				name: user.name,
				age: user.age + '',
				isStudent: user.isStudent,
			}),
		);
	};

	return (
		<div className='container py-2'>
			<div className='card w-25 mx-auto'>
				<div className='card-header bg-dark text-white text-center'>Add User</div>

				<div className='card-body'>
					<input
						value={userForm.name}
						onChange={e => dispatch(getUserName(e.target.value))}
						type='text'
						placeholder='name...'
						className='form-control'
					/>

					<input
						value={userForm.age}
						onChange={e => dispatch(getUserAge(e.target.value))}
						type='number'
						placeholder='age...'
						className='form-control mt-2'
					/>

					<div className='mt-2'>
						<label>
							<input
								type='radio'
								checked={userForm.isStudent === true}
								onChange={() => dispatch(getUserStatus(true))}
							/>
							Student
						</label>

						<label className='ms-2'>
							<input
								type='radio'
								checked={userForm.isStudent === false}
								onChange={() => dispatch(getUserStatus(false))}
							/>
							Not Student
						</label>
					</div>
				</div>

				<div className='card-footer'>
					<button onClick={handleSave} className='btn btn-dark w-100'>
						Save
					</button>
				</div>
			</div>

			<table className='table mt-4'>
				<thead className='table-dark'>
					<tr>
						<th>N</th>
						<th>Name</th>
						<th>Age</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{users.map((user: User, index: number) => (
						<tr key={user.id}>
							<td>{index + 1}</td>
							<td>{user.name}</td>
							<td>{user.age}</td>
							<td>{user.isStudent ? 'Student' : 'Not Student'}</td>
							<td>
								<button onClick={() => handleDelete(user.id)} className='btn btn-danger'>
									🗑️
								</button>

								<button onClick={() => handleUpdate(user)} className='btn btn-warning ms-2'>
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

export default Users;
