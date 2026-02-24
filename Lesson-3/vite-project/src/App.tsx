import { useEffect, useState } from 'react';
import type { Book, BookCreate } from './types';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import User from './components/User';

const API = 'http://127.0.0.1:3000/books';

export default function App() {
	// ✅ User componentni render qilish uchun uni return ichiga qo‘shamiz
	const [books, setBooks] = useState<Book[]>([]);
	const [open, setOpen] = useState(false);
	const [editBook, setEditBook] = useState<Book | null>(null);

	// ==========================
	// ⛔️ Vaqtinchalik: backend funksiyalar ishlamasin, lekin kod tursin
	// (xohlasang keyin kommentdan chiqarib ishlatib yuborasiz)
	// ==========================

	// const fetchBooks = async () => {
	// 	try {
	// 		const res = await fetch(API);
	// 		if (!res.ok) throw new Error('Server error');
	// 		const data = await res.json();
	// 		setBooks(data);
	// 	} catch (err) {
	// 		console.error('Fetch error:', err);
	// 	}
	// };

	useEffect(() => {
		// fetchBooks(); // ⛔️ vaqtinchalik o‘chirildi
	}, []);

	// const handleSubmit = async (data: BookCreate) => {
	// 	try {
	// 		if (editBook) {
	// 			await fetch(`${API}/${editBook.id}`, {
	// 				method: 'PUT',
	// 				headers: { 'Content-Type': 'application/json' },
	// 				body: JSON.stringify({ ...data, id: editBook.id }),
	// 			});
	// 		} else {
	// 			await fetch(API, {
	// 				method: 'POST',
	// 				headers: { 'Content-Type': 'application/json' },
	// 				body: JSON.stringify(data),
	// 			});
	// 		}

	// 		setOpen(false);
	// 		setEditBook(null);
	// 		fetchBooks();
	// 	} catch (err) {
	// 		console.error('Submit error:', err);
	// 	}
	// };

	// const handleDelete = async (id: number) => {
	// 	try {
	// 		await fetch(`${API}/${id}`, { method: 'DELETE' });
	// 		fetchBooks();
	// 	} catch (err) {
	// 		console.error('Delete error:', err);
	// 	}
	// };

	// ✅ vaqtinchalik ishlaydigan "dummy" handlerlar (error bermasligi uchun)
	const handleSubmit = async (_data: BookCreate) => {
		// vaqtinchalik
		setOpen(false);
		setEditBook(null);
	};

	const handleDelete = async (_id: number) => {
		// vaqtinchalik
	};

	return (
		<div className='min-h-screen bg-gray-100 p-8'>
			{/* ✅ USER COMPONENT */}
			<div className='mb-6 rounded-xl bg-white p-4 shadow'>
				<User />
			</div>

			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold'>Books</h1>
				<button
					onClick={() => {
						setEditBook(null);
						setOpen(true);
					}}
					className='px-4 py-2 bg-black text-white rounded-xl'>
					+ Book
				</button>
			</div>

			<div className='grid grid-cols-3 gap-4'>
				{books.map(book => (
					<BookCard
						key={book.id}
						book={book}
						onEdit={b => {
							setEditBook(b);
							setOpen(true);
						}}
						onDelete={handleDelete}
					/>
				))}
			</div>

			<BookModal
				open={open}
				onClose={() => {
					setOpen(false);
					setEditBook(null);
				}}
				onSubmit={handleSubmit}
				editBook={editBook}
			/>
		</div>
	);
}
