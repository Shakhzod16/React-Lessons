import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import { getBookName, getBookYear, addBook, removeBook, editBook, type Book } from '../reducers/bookSlice';

function Books1() {
	const dispatch = useAppDispatch();
	const { books, bookForm } = useAppSelector(state => state.book);

	const handleSave = () => {
		const bookObj = {
			id: Date.now(),
			name: bookForm.name,
			year: parseInt(bookForm.year),
		};
		dispatch(addBook(bookObj));
	};

	const handleDelete = (bookId: number) => {
		dispatch(removeBook(bookId));
	};

	const handleUpdate = (book: Book) => {
		dispatch(
			editBook({
				id: book.id,
				name: book.name,
				year: book.year + '',
			}),
		);
	};

	return (
		<div className='container py-2'>
			<div className='card w-25 mx-auto'>
				<div className='card-header bg-dark text-white text-center'>Add Book</div>
				<div className='card-body'>
					<input
						value={bookForm.name}
						onChange={e => dispatch(getBookName(e.target.value))}
						type='text'
						placeholder='name...'
						className='form-control'
					/>
					<input
						value={bookForm.year}
						onChange={e => dispatch(getBookYear(e.target.value))}
						type='number'
						placeholder='year...'
						className='form-control mt-2'
					/>
				</div>
				<div className='card-footer'>
					<button onClick={handleSave} className='btn btn-dark w-100'>
						Save
					</button>
				</div>
			</div>

			<table className='table mt-4'>
				<thead className='table-dark'>
					<tr>
						<th>N</th>
						<th>Name</th>
						<th>Year</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{books.map((book, index) => (
						<tr key={book.id}>
							<td>{index + 1}</td>
							<td>{book.name}</td>
							<td>{book.year}</td>
							<td>
								<button onClick={() => handleDelete(book.id)} className='btn btn-danger'>
									🗑️
								</button>
								<button onClick={() => handleUpdate(book)} className='btn btn-warning ms-2'>
									✏️
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Books1;
