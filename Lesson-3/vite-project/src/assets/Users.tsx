import UserCard from './UserCard';

type User = {
	id: number;
	email: string;
	password: string;
	name: string;
	role: 'admin' | 'user';
	profileImage: string;
};

const users: User[] = [
	{
		id: 1,
		email: 'john.doe@example.com',
		password: 'password123',
		name: 'John Doe',
		role: 'admin',
		profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 2,
		email: 'sarah.smith@example.com',
		password: 'securePass456',
		name: 'Sarah Smith',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 3,
		email: 'mike.johnson@example.com',
		password: 'mike789',
		name: 'Mike Johnson',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 4,
		email: 'emily.davis@example.com',
		password: 'emily_secure',
		name: 'Emily Davis',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 5,
		email: 'alex.wilson@example.com',
		password: 'alex_pass',
		name: 'Alex Wilson',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 6,
		email: 'lisa.brown@example.com',
		password: 'lisa_secret',
		name: 'Lisa Brown',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 7,
		email: 'david.miller@example.com',
		password: 'david_admin',
		name: 'David Miller',
		role: 'admin',
		profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 8,
		email: 'sophia.lee@example.com',
		password: 'sophia_pass',
		name: 'Sophia Lee',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 9,
		email: 'james.taylor@example.com',
		password: 'james_99',
		name: 'James Taylor',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 10,
		email: 'olivia.white@example.com',
		password: 'olivia_pwd',
		name: 'Olivia White',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 11,
		email: 'robert.garcia@example.com',
		password: 'robert_garcia',
		name: 'Robert Garcia',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 12,
		email: 'chloe.martinez@example.com',
		password: 'chloe_secure',
		name: 'Chloe Martinez',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 13,
		email: 'daniel.anderson@example.com',
		password: 'daniel_123',
		name: 'Daniel Anderson',
		role: 'admin',
		profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 14,
		email: 'mia.thomas@example.com',
		password: 'mia_password',
		name: 'Mia Thomas',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 15,
		email: 'william.jackson@example.com',
		password: 'william_pass',
		name: 'William Jackson',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 16,
		email: 'ava.harris@example.com',
		password: 'ava_secure',
		name: 'Ava Harris',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 17,
		email: 'ethan.moore@example.com',
		password: 'ethan_moore',
		name: 'Ethan Moore',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 18,
		email: 'isabella.clark@example.com',
		password: 'isabella_pwd',
		name: 'Isabella Clark',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 19,
		email: 'ryan.lewis@example.com',
		password: 'ryan_secure',
		name: 'Ryan Lewis',
		role: 'admin',
		profileImage: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=256&h=256&fit=crop',
	},
	{
		id: 20,
		email: 'grace.walker@example.com',
		password: 'grace_walker',
		name: 'Grace Walker',
		role: 'user',
		profileImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=256&h=256&fit=crop',
	},
];

function Users() {
	return (
		<div className='min-h-screen bg-gray-100 p-10'>
			<h1 className='text-5xl font-bold text-center mb-10 text-blue-600'>Users</h1>

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
