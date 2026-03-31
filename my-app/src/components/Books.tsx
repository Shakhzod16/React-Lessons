import { useReducer } from 'react';
import { bookReducer, initialState } from '../reducers/bookReducer';

function Books() {
	const [state, dispatch] = useReducer(bookReducer, initialState);

	const handleSave = () => {
		if (!state.name || !state.year) return;

		const bookObj = {
			id: Date.now(),
			name: state.name,
			year: parseInt(state.year),
		};

		dispatch({ type: 'ADD_BOOK', payload: bookObj });
		dispatch({ type: 'CLEAR_FORM' });
	};

	return (
		<div className='container mt-5'>
			<div className='d-flex justify-content-center'>
				<div className='card shadow' style={{ width: '350px' }}>
					<div className='card-header bg-dark text-white text-center'>Add Book</div>

					<div className='card-body'>
						<input
							value={state.name}
							onChange={e => dispatch({ type: 'GET_NAME', payload: e.target.value })}
							type='text'
							placeholder='book name...'
							className='form-control mb-2'
						/>

						<input
							value={state.year}
							onChange={e => dispatch({ type: 'GET_YEAR', payload: e.target.value })}
							type='number'
							placeholder='book year...'
							className='form-control'
						/>
					</div>

					<div className='card-footer bg-white'>
						<button onClick={handleSave} className='btn btn-dark w-100'>
							{state.editingIndex === null ? 'save' : 'update'}
						</button>
					</div>
				</div>
			</div>

			<table className='table table-bordered mt-4 text-center'>
				<thead className='table-dark'>
					<tr>
						<th>N</th>
						<th>Name</th>
						<th>Year</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{state.books.length === 0 ? (
						<tr>
							<td colSpan={4}>No books</td>
						</tr>
					) : (
						state.books.map((book, index) => (
							<tr key={book.id}>
								<td>{index + 1}</td>
								<td>{book.name}</td>
								<td>{book.year}</td>
								<td>
									<button
										onClick={() => dispatch({ type: 'DELETE_BOOK', payload: book.id })}
										className='btn btn-danger btn-sm me-2'>
										x
									</button>

									<button
										onClick={() => dispatch({ type: 'EDIT_BOOK', payload: index })}
										className='btn btn-warning btn-sm'>
										edit
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default Books;
