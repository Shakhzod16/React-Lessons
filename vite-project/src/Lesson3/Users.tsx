import UserCard from './Users';

const users = [
	// ← shu yerga sen yuborgan arrayni to‘liq qo‘yasan
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
