import UserCard from './UserCard';

const users = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john@example.com',
		password: '123456',
		role: 'admin',
		profileImage: 'https://via.placeholder.com/150',
	},
	{
		id: 2,
		name: 'Jane Smith',
		email: 'jane@example.com',
		password: 'abcdef',
		role: 'user',
		profileImage: 'https://via.placeholder.com/150',
	},
	// qo‘shimcha users...
];

function Users() {
	return (
		<div className='min-h-screen bg-gray-100 p-10'>
			<h1 className='text-4xl font-bold text-center mb-10 text-blue-600'>Users</h1>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center'>
				{users.map(user => (
					<UserCard
						key={user.id}
						name={user.name}
						email={user.email}
						password={user.password}
						role={user.role}
						profileImage={user.profileImage}
					/>
				))}
			</div>
		</div>
	);
}

export default Users;
