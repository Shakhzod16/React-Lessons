import type { Book } from '../types';

interface Props {
	book: Book;
	onEdit: (book: Book) => void;
	onDelete: (id: number) => void;
}

export default function BookCard({ book, onEdit, onDelete }: Props) {
	return (
		<div className='bg-white p-5 rounded-2xl shadow border'>
			<div className='flex justify-between items-start'>
				<div>
					<h2 className='text-lg font-semibold'>{book.name}</h2>
					<p className='text-sm text-gray-500'>Author: {book.author}</p>
				</div>
				<span className='bg-black text-white px-3 py-1 rounded-full text-sm'>${book.price}</span>
			</div>

			<p className='text-sm text-gray-600 mt-3'>{book.description}</p>

			<div className='flex gap-2 mt-4'>
				<button onClick={() => onEdit(book)} className='px-3 py-2 bg-blue-500 text-white rounded-xl text-sm'>
					Edit
				</button>

				<button onClick={() => onDelete(book.id)} className='px-3 py-2 bg-red-500 text-white rounded-xl text-sm'>
					Delete
				</button>
			</div>
		</div>
	);
}
