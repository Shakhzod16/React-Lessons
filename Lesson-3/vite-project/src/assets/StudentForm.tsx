import { useForm } from 'react-hook-form';

type FormData = {
	firstName: string;
	lastName: string;
	age: string;
	email: string;
	password: string;
	schoolNumber: string;
};

export default function StudentForm() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>({ mode: 'onChange' });

	const password = watch('password');
	const age = watch('age');

	const onSubmit = (data: FormData) => {
		console.log(data);
	};

	const inputStyle = 'w-full rounded-xl border px-4 py-2 text-sm outline-none transition focus:ring-2';

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-5'>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					{/* Ism */}
					<div>
						<label className='font-semibold text-sm'>name:</label>
						<input
							placeholder='Name'
							className={`${inputStyle} ${
								errors.firstName ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
							}`}
							{...register('firstName', { required: 'Ism majburiy' })}
						/>
						{errors.firstName && <p className='text-red-500 text-xs mt-1'>{errors.firstName.message}</p>}
					</div>

					{/* Familiya */}
					<div>
						<label className='font-semibold text-sm'>Surname:</label>
						<input
							placeholder='Surname'
							className={`${inputStyle} ${
								errors.lastName ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
							}`}
							{...register('lastName', { required: 'Familiya majburiy' })}
						/>
						{errors.lastName && <p className='text-red-500 text-xs mt-1'>{errors.lastName.message}</p>}
					</div>

					{/* Yosh */}
					<div>
						<label className='font-semibold text-sm'>Yosh:</label>
						<select
							className={`${inputStyle} ${
								errors.age ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
							}`}
							{...register('age', {
								required: 'Yosh majburiy',
								validate: value => Number(value) >= 6 || 'Kamida 6 yosh bo‘lsin.',
							})}
							defaultValue=''>
							<option value='' disabled>
								Age
							</option>
							{[...Array(50)].map((_, i) => (
								<option key={i + 6} value={i + 6}>
									{i + 6}
								</option>
							))}
						</select>

						{errors.age ? (
							<p className='text-red-500 text-xs mt-1'>{errors.age.message}</p>
						) : (
							age && <p className='text-green-600 text-xs mt-1'>✓ Kamida 6 yosh bo‘lsin.</p>
						)}
					</div>

					{/* Email */}
					<div>
						<label className='font-semibold text-sm'>Email:</label>
						<input
							type='email'
							placeholder='email@example.com'
							className={`${inputStyle} ${
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
						{errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
					</div>

					{/* Parol */}
					<div>
						<label className='font-semibold text-sm'>Parol:</label>
						<input
							type='password'
							placeholder='********'
							className={`${inputStyle} ${
								errors.password ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
							}`}
							{...register('password', {
								required: 'Parol majburiy',
								minLength: {
									value: 8,
									message: 'Kamida 8 ta belgi.',
								},
							})}
						/>

						{errors.password ? (
							<p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>
						) : (
							password?.length >= 8 && <p className='text-green-600 text-xs mt-1'>✓ Kamida 8 ta belgi.</p>
						)}
					</div>

					{/* Maktab raqami */}
					<div>
						<label className='font-semibold text-sm'>Maktab raqami:</label>
						<input
							placeholder='Masalan: 123'
							className={`${inputStyle} ${
								errors.schoolNumber ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
							}`}
							{...register('schoolNumber', {
								required: 'Maktab raqami majburiy',
								pattern: {
									value: /^[0-9]+$/,
									message: 'Faqat raqam kiriting',
								},
							})}
						/>
						{errors.schoolNumber && <p className='text-red-500 text-xs mt-1'>{errors.schoolNumber.message}</p>}
					</div>

					{/* Button */}
					<button
						type='submit'
						className='w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition shadow-md'>
						Yuborish
					</button>
				</form>
			</div>
		</div>
	);
}
