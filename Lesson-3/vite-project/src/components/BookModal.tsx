import { useEffect, useState } from 'react';
import type { Book, BookCreate } from '../../types';

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: BookCreate) => void;
	editBook?: Book | null;
}

export default function BookModal({ open, onClose, onSubmit, editBook }: Props) {
	const [form, setForm] = useState<BookCreate>({
		name: '',
		description: '',
		price: 0,
		author: '',
	});

	useEffect(() => {
		if (editBook) {
			setForm({
				name: editBook.name,
				description: editBook.description,
				price: editBook.price,
				author: editBook.author,
			});
		} else {
			setForm({
				name: '',
				description: '',
				price: 0,
				author: '',
			});
		}
	}, [editBook]);

	if (!open) return null;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.name === 'price' ? Number(e.target.value) : e.target.value,
		});
	};

	return (
		<div className='fixed inset-0 bg-black/40 flex justify-center items-center'>
			<div className='bg-white p-6 rounded-2xl w-100 space-y-3'>
				<h2 className='text-lg font-semibold'>{editBook ? 'Edit Book' : 'Add Book'}</h2>

				<input
					name='name'
					placeholder='Name'
					value={form.name}
					onChange={handleChange}
					className='w-full border p-2 rounded-xl'
				/>

				<input
					name='author'
					placeholder='Author'
					value={form.author}
					onChange={handleChange}
					className='w-full border p-2 rounded-xl'
				/>

				<input
					name='price'
					type='number'
					placeholder='Price'
					value={form.price}
					onChange={handleChange}
					className='w-full border p-2 rounded-xl'
				/>

				<textarea
					name='description'
					placeholder='Description'
					value={form.description}
					onChange={handleChange}
					className='w-full border p-2 rounded-xl'
				/>

				<div className='flex justify-end gap-2'>
					<button onClick={onClose} className='px-4 py-2 border rounded-xl'>
						Cancel
					</button>

					<button onClick={() => onSubmit(form)} className='px-4 py-2 bg-black text-white rounded-xl'>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
