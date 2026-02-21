import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

type Todo = {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
};

function Components() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	const getTodos = async () => {
		setLoading(true);
		setErrorMsg('');

		try {
			const { data } = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
			setTodos(data);
		} catch (error) {
			console.log(error);
			setErrorMsg('Xatolik yuz berdi. Qayta urinib ko‘ring.');
		} finally {
			setLoading(false);
		}
	};

	// ✅ hooklar doim shu yerda, returndan oldin
	useEffect(() => {
		getTodos();
	}, []); // 👈 searchQuery emas

	// (ixtiyoriy) client-side filter
	const filteredTodos = useMemo(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return todos;
		return todos.filter(t => t.title.toLowerCase().includes(q));
	}, [todos, searchQuery]);

	return (
		<div className='container p-3'>
			<h3 className='mb-3'>Todos</h3>

			<input
				value={searchQuery}
				onChange={e => setSearchQuery(e.target.value)}
				type='search'
				placeholder='search by title...'
				className='form-control w-25 my-2'
			/>

			{loading && (
				<div className='flex justify-center pt-10'>
					<FaSpinner size={40} className='animate-spin' />
				</div>
			)}

			{errorMsg && <div className='alert alert-danger'>{errorMsg}</div>}

			{!loading && !errorMsg && (
				<table className='table table-striped table-hover align-middle'>
					<thead className='table-dark'>
						<tr>
							<th>ID</th>
							<th>UserId</th>
							<th>Title</th>
							<th>Completed</th>
						</tr>
					</thead>

					<tbody>
						{filteredTodos.map(t => (
							<tr key={t.id}>
								<td>{t.id}</td>
								<td>{t.userId}</td>
								<td>{t.title}</td>
								<td>
									{t.completed ? (
										<span className='badge text-bg-success'>Yes</span>
									) : (
										<span className='badge text-bg-secondary'>No</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default Components;
