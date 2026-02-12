import { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

type Todo = {
	id: number;
	title: string;
	completed: boolean;
};

type Filter = 'all' | 'done' | 'todo';

export default function Vazifa() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [text, setText] = useState('');
	const [filter, setFilter] = useState<Filter>('all');
	const [error, setError] = useState('');

	const [editId, setEditId] = useState<number | null>(null);

	const handleSubmit = () => {
		if (!text.trim()) {
			setError('Iltimos, vazifani kiriting!');
			return;
		}

		if (editId === null) {
			setTodos([
				...todos,
				{
					id: Date.now(),
					title: text,
					completed: false,
				},
			]);
		} else {
			setTodos(todos.map(todo => (todo.id === editId ? { ...todo, title: text } : todo)));
			setEditId(null);
		}

		setText('');
		setError('');
	};

	const toggleTodo = (id: number) => {
		setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
	};

	const deleteTodo = (id: number) => {
		setTodos(todos.filter(todo => todo.id !== id));
	};

	const editTodo = (todo: Todo) => {
		setText(todo.title);
		setEditId(todo.id);
	};

	const deleteDone = () => {
		setTodos(todos.filter(todo => !todo.completed));
	};

	const deleteAll = () => {
		setTodos([]);
	};

	const filteredTodos = todos.filter(todo => {
		if (filter === 'done') return todo.completed;
		if (filter === 'todo') return !todo.completed;
		return true;
	});

	return (
		<div className='min-h-screen bg-gray-100 flex justify-center p-6'>
			<div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6'>
				<h1 className='text-2xl font-bold text-center mb-6'>Todo App</h1>

				{/* INPUT GROUP */}
				<div className='flex gap-2 mb-2'>
					<input
						type='text'
						placeholder='New task...'
						value={text}
						onChange={e => setText(e.target.value)}
						className='flex-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none'
					/>
					<button
						onClick={handleSubmit}
						className={`px-4 py-2 rounded-lg text-white ${
							editId === null ? 'bg-teal-500 hover:bg-teal-600' : 'bg-yellow-500 hover:bg-yellow-600'
						}`}>
						{editId === null ? 'Add' : 'Update'}
					</button>
				</div>

				{error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

				{/* FILTERS */}
				<div className='flex gap-2 my-4'>
					{(['all', 'done', 'todo'] as Filter[]).map(btn => (
						<button
							key={btn}
							onClick={() => setFilter(btn)}
							className={`flex-1 py-2 rounded-lg capitalize transition
                ${filter === btn ? 'bg-teal-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
							{btn}
						</button>
					))}
				</div>

				{/* LIST */}
				<ul className='space-y-3'>
					{filteredTodos.map(todo => (
						<li key={todo.id} className='flex items-center justify-between border rounded-lg px-4 py-2'>
							<div className='flex items-center gap-3 flex-1'>
								<input type='checkbox' checked={todo.completed} onChange={() => toggleTodo(todo.id)} />

								<span className={`${todo.completed ? 'line-through text-red-500' : ''}`}>{todo.title}</span>
							</div>

							<div className='flex items-center gap-3'>
								<button onClick={() => editTodo(todo)} /*  */ className='text-yellow-500'>
									<FaEdit />
								</button>

								<button onClick={() => deleteTodo(todo.id)} className='text-red-500'>
									<FaTrash />
								</button>
							</div>
						</li>
					))}
				</ul>

				<div className='flex gap-3 mt-6'>
					<button onClick={deleteDone} className='flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg'>
						Delete done
					</button>
					<button onClick={deleteAll} className='flex-1 bg-red-700 hover:bg-red-800 text-white py-2 rounded-lg'>
						Delete all
					</button>
				</div>
			</div>
		</div>
	);
}
