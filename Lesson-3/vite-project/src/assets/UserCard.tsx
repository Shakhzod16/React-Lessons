interface UserCardProps {
	name: string;
	email: string;
	password: string;
	role: string;
	profileImage: string;
}

function UserCard({ name, email, password, role, profileImage }: UserCardProps) {
	return (
		<div className='bg-white rounded-2xl shadow-md p-5 w-full max-w-[320px] hover:shadow-lg transition'>
			{/* Header */}
			<div className='flex items-center gap-3 mb-4'>
				<img src={profileImage} alt={name} className='w-14 h-14 rounded-full object-cover' />
				<div>
					<h3 className='font-semibold text-lg'>{name}</h3>
					<p className='text-sm text-gray-500'>{email}</p>
				</div>

				<span
					className={`ml-auto text-xs px-3 py-1 rounded-full ${
						role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
					}`}>
					{role}
				</span>
			</div>

			{/* Password */}
			<div className='bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-4'>
				<span className='font-medium'>Password:</span> {password}
			</div>

			{/* Buttons */}
			<div className='flex gap-3'>
				<button className='flex-1 border rounded-lg py-2 hover:bg-gray-100 transition'>View</button>
				<button className='flex-1 bg-gray-800 text-white rounded-lg py-2 hover:bg-gray-700 transition'>Message</button>
			</div>
		</div>
	);
}

export default UserCard;
