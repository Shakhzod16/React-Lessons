import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import UserCard from './UserCard';
import type { User, UserRole } from './UserCard';

const initialUsers: User[] = [
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
];

type AddUserForm = {
	profileImage: string;
	name: string;
	email: string;
	password: string;
	role: UserRole;
};

function AddUserModal({
	open,
	onClose,
	onSave,
}: {
	open: boolean;
	onClose: () => void;
	onSave: (data: AddUserForm) => void;
}) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<AddUserForm>({
		mode: 'onChange',
		defaultValues: {
			profileImage: '',
			name: '',
			email: '',
			password: '',
			role: 'user',
		},
	});

	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [open, onClose]);

	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);

	if (!open) return null;

	const input = 'w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-2';
	const err = 'mt-1 text-xs text-red-600';

	const submit = async (data: AddUserForm) => {
		onSave({
			...data,
			profileImage: data.profileImage.trim() || `https://i.pravatar.cc/150?u=${encodeURIComponent(data.email)}`,
		});
		reset();
		onClose();
	};

	return (
		<div className='fixed inset-0 z-999 flex items-center justify-center p-4'>
			<button className='absolute inset-0 bg-black/40' onClick={onClose} aria-label='Close modal' />

			{/* Modal */}
			<div className='relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl'>
				<div className='mb-5 flex items-center justify-between'>
					<h2 className='text-lg sm:text-xl font-bold'>Add User</h2>
					<button onClick={onClose} className='rounded-xl px-3 py-2 text-sm hover:bg-gray-100'>
						✕
					</button>
				</div>

				<form onSubmit={handleSubmit(submit)} className='space-y-4'>
					<input
						placeholder='user image url...'
						className={`${input} ${
							errors.profileImage ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
						}`}
						{...register('profileImage', {
							validate: v => !v || /^https?:\/\/.+/i.test(v) || 'URL http/https bilan boshlansin',
						})}
					/>
					{errors.profileImage && <p className={err}>{errors.profileImage.message}</p>}

					<input
						placeholder='user fullName...'
						className={`${input} ${
							errors.name ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
						}`}
						{...register('name', {
							required: 'Ism majburiy',
							minLength: { value: 2, message: 'Kamida 2 ta harf' },
						})}
					/>
					{errors.name && <p className={err}>{errors.name.message}</p>}

					<input
						placeholder='user email...'
						className={`${input} ${
							errors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
						}`}
						{...register('email', {
							required: 'Email majburiy',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Email formati noto‘g‘ri',
							},
						})}
					/>
					{errors.email && <p className={err}>{errors.email.message}</p>}

					<input
						type='password'
						placeholder='user password...'
						className={`${input} ${
							errors.password ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
						}`}
						{...register('password', {
							required: 'Parol majburiy',
							minLength: { value: 6, message: 'Kamida 6 ta belgi' },
						})}
					/>
					{errors.password && <p className={err}>{errors.password.message}</p>}

					<div className='flex items-center gap-3'>
						<span className='text-sm font-semibold text-gray-700'>role:</span>
						<select
							className='rounded-2xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200'
							{...register('role')}>
							<option value='user'>user</option>
							<option value='admin'>admin</option>
						</select>
					</div>

					<div className='pt-2 flex justify-center'>
						<button
							type='submit'
							disabled={isSubmitting}
							className='w-full sm:w-56 rounded-2xl bg-sky-400 py-3 font-bold text-white shadow-md hover:bg-sky-500 transition disabled:opacity-60'>
							{isSubmitting ? 'Saving...' : 'Save'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function Users() {
	const [users, setUsers] = useState<User[]>(initialUsers);
	const [open, setOpen] = useState(false);

	const nextId = useMemo(() => {
		return (users.reduce((max, u) => (u.id > max ? u.id : max), 0) || 0) + 1;
	}, [users]);

	const addUser = (data: AddUserForm) => {
		const newUser: User = { id: nextId, ...data };
		setUsers(prev => [newUser, ...prev]);
	};

	return (
		<div className='min-h-screen p-6 sm:p-10'>
			<div className='mx-auto max-w-6xl'>
				{/* Header */}
				<div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
					<h1 className='text-4xl sm:text-5xl font-bold text-blue-600'>Users</h1>

					<button
						onClick={() => setOpen(true)}
						className='self-start sm:self-auto rounded-xl bg-sky-200 px-6 py-2 font-semibold text-sky-900 hover:bg-sky-300 transition'>
						+ user
					</button>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center'>
					{users.map(user => (
						<UserCard key={user.id} user={user} />
					))}
				</div>
			</div>

			<AddUserModal open={open} onClose={() => setOpen(false)} onSave={addUser} />
		</div>
	);
}

export default Users;
