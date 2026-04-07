import './App.css';
import { useAppDispatch, useAppSelector } from './reducers/hooks';
import {
	type ApiUser,
	useAddUserMutation,
	useDeleteUserMutation,
	useGetUsersQuery,
	useUpdateUserMutation,
} from './reducers/slices/usersApi';
import { clearUserForm, handleUserForm, startEditUser } from './reducers/slices/usersSlice';
import {
	type ApiBook,
	useAddBookMutation,
	useDeleteBookMutation,
	useGetBooksQuery,
	useUpdateBookMutation,
} from './reducers/slices/booksApi';
import { clearBookForm, handleBookForm, startEditBook } from './reducers/slices/booksSlice';

function App() {
	const {
		data: usersData = [],
		isLoading: isUsersLoading,
		isError: isUsersError,
		error: usersError,
		refetch: refetchUsers,
	} = useGetUsersQuery();

	const {
		data: booksData = [],
		isLoading: isBooksLoading,
		isError: isBooksError,
		error: booksError,
		refetch: refetchBooks,
	} = useGetBooksQuery();

	const { userForm, editingId: editingUserId } = useAppSelector(state => state.users);
	const { bookForm, editingId: editingBookId } = useAppSelector(state => state.books);
	const dispatch = useAppDispatch();

	const [addUser] = useAddUserMutation();
	const [updateUser] = useUpdateUserMutation();
	const [deleteUser] = useDeleteUserMutation();

	const [addBook] = useAddBookMutation();
	const [updateBook] = useUpdateBookMutation();
	const [deleteBook] = useDeleteBookMutation();

	const handleSaveUser = async () => {
		if (!userForm.name.trim() || !userForm.age.trim()) return;

		const age = Number(userForm.age);
		if (Number.isNaN(age)) return;

		const userObj: ApiUser = {
			id: editingUserId ?? Date.now().toString(),
			name: userForm.name.trim(),
			age,
			isStudent: age < 25,
		};

		if (editingUserId) {
			await updateUser(userObj).unwrap();
		} else {
			await addUser(userObj).unwrap();
		}

		dispatch(clearUserForm());
		refetchUsers();
	};

	const handleDeleteUser = async (id: string) => {
		await deleteUser(id).unwrap();
		refetchUsers();
	};

	const handleEditUser = (user: ApiUser) => {
		dispatch(startEditUser(user));
	};

	const handleSaveBook = async () => {
		if (!bookForm.name.trim() || !bookForm.author.trim() || !bookForm.year.trim()) return;

		const year = Number(bookForm.year);
		if (Number.isNaN(year)) return;

		const bookObj: ApiBook = {
			id: editingBookId ?? Date.now().toString(),
			name: bookForm.name.trim(),
			author: bookForm.author.trim(),
			year,
		};

		if (editingBookId) {
			await updateBook(bookObj).unwrap();
		} else {
			await addBook(bookObj).unwrap();
		}

		dispatch(clearBookForm());
		refetchBooks();
	};

	const handleDeleteBook = async (id: string) => {
		await deleteBook(id).unwrap();
		refetchBooks();
	};

	const handleEditBook = (book: ApiBook) => {
		dispatch(startEditBook(book));
	};

	if (isUsersLoading || isBooksLoading) {
		return <div className='p-5'>Loading...</div>;
	}
	if (isUsersError || isBooksError) {
		return <div>{JSON.stringify(usersError ?? booksError)}</div>;
	}

	return (
		<div className='p-4'>
			<div className='card w-25 mx-auto my-4'>
				<div className='card-header bg-dark text-white text-center'>Add User</div>
				<div className='card-body'>
					<input
						value={userForm.name}
						onChange={e => dispatch(handleUserForm({ key: 'name', value: e.target.value }))}
						type='text'
						placeholder='name... '
						className='form-control'
					/>
					<input
						value={userForm.age}
						onChange={e => dispatch(handleUserForm({ key: 'age', value: e.target.value }))}
						type='number'
						placeholder='age... '
						className='form-control mt-2'
					/>
				</div>
				<div className='card-footer'>
					<button onClick={() => void handleSaveUser()} className='btn btn-primary'>
						Add User
					</button>
				</div>
			</div>

			{usersData.map((user: ApiUser) => (
				<div key={user.id} className='border px-4 mb-2 py-3 flex items-center justify-between rounded-lg!'>
					<h1>
						{user.name} {user.age}
					</h1>
					<div className='flex items-center gap-2'>
						<button onClick={() => void handleDeleteUser(user.id)} className='btn btn-danger'>
							Delete
						</button>
						<button onClick={() => handleEditUser(user)} className='btn btn-warning'>
							Edit
						</button>
					</div>
				</div>
			))}

			<div className='card w-50 mx-auto my-4'>
				<div className='card-header bg-dark text-white text-center'>Add Book</div>
				<div className='card-body'>
					<input
						value={bookForm.name}
						onChange={e => dispatch(handleBookForm({ key: 'name', value: e.target.value }))}
						type='text'
						placeholder='book name...'
						className='form-control mb-2'
					/>
					<input
						value={bookForm.author}
						onChange={e => dispatch(handleBookForm({ key: 'author', value: e.target.value }))}
						type='text'
						placeholder='author...'
						className='form-control mb-2'
					/>
					<input
						value={bookForm.year}
						onChange={e => dispatch(handleBookForm({ key: 'year', value: e.target.value }))}
						type='number'
						placeholder='year...'
						className='form-control'
					/>
				</div>
				<div className='card-footer'>
					<button onClick={() => void handleSaveBook()} className='btn btn-primary'>
						Add Book
					</button>
				</div>
			</div>

			<div className='w-75 mx-auto'>
				<table className='table table-bordered table-striped'>
					<thead className='table-dark'>
						<tr>
							<th>N</th>
							<th>Name</th>
							<th>Author</th>
							<th>Year</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{booksData.length === 0 ? (
							<tr>
								<td colSpan={5} className='text-center'>
									No books
								</td>
							</tr>
						) : (
							booksData.map((book: ApiBook, index: number) => (
								<tr key={book.id}>
									<td>{index + 1}</td>
									<td>{book.name}</td>
									<td>{book.author}</td>
									<td>{book.year}</td>
									<td>
										<button onClick={() => void handleDeleteBook(book.id)} className='btn btn-danger btn-sm me-2'>
											Delete
										</button>
										<button onClick={() => handleEditBook(book)} className='btn btn-warning btn-sm'>
											Edit
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
