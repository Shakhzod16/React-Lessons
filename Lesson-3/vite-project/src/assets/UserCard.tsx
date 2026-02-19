export type UserRole = 'admin' | 'user';

export type User = {
	id: number;
	email: string;
	password: string;
	name: string;
	role: UserRole;
	profileImage: string;
};

type UserCardProps = {
	user: User;
};

function UserCard({ user }: UserCardProps) {
	const { name, email, password, role, profileImage } = user;

	return (
		<div className='bg-white rounded-2xl shadow-md p-5 w-full max-w-[320px] hover:shadow-lg transition'>
			<div className='flex items-center gap-3 mb-4'>
				<img
					src={profileImage}
					alt={name}
					className='w-14 h-14 rounded-full object-cover'
					onError={e => {
						e.currentTarget.src = 'https://i.pravatar.cc/150?img=3';
					}}
				/>

				<div className='min-w-0'>
					<h3 className='font-semibold text-lg leading-tight truncate'>{name}</h3>
					<p className='text-sm text-gray-500 truncate'>{email}</p>
				</div>

				<span
					className={`ml-auto text-xs px-3 py-1 rounded-full ${
						role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
					}`}>
					{role === 'admin' ? 'Admin' : 'User'}
				</span>
			</div>

			<div className='bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-600 mb-4 flex items-center justify-between'>
				<span className='font-medium'>Password</span>
				<span className='font-mono'>{password}</span>
			</div>

			<div className='flex gap-3'>
				<button className='flex-1 border rounded-lg py-2 hover:bg-gray-100 transition'>View</button>
				<button className='flex-1 bg-gray-800 text-white rounded-lg py-2 hover:bg-gray-700 transition'>Message</button>
			</div>
		</div>
	);
}

export default UserCard;
