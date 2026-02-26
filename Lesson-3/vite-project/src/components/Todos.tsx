import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import axios from 'axios';
import { Status, type Task } from '../../types';

const API_URL = 'http://localhost:3000';

function Todos() {
	const [tasks, setTasks] = useState<Task[]>([]);

	const [todoInput, setTodoInput] = useState('');
	const [progressInput, setProgressInput] = useState('');
	const [completedInput, setCompletedInput] = useState('');
	const [editngId, setEditingId] = useState<string | null>(null);

	const [touchId, setTouchId] = useState('');

	useEffect(() => {
		getTasks();
	}, []);

	const getTasks = async () => {
		try {
			const { data } = await axios.get(API_URL + '/tasks');
			setTasks(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleAdd = async (type: Status) => {
		try {
			const taskObj: Omit<Task, 'id'> = {
				name: type === Status.TODO ? todoInput : type === Status.PROGRESS ? progressInput : completedInput,
				status: type,
			};
			if (editngId === null) {
				await axios.post(API_URL + '/tasks', taskObj);
			} else {
				await axios.put(API_URL + `/tasks/${editngId}`, taskObj);
				setEditingId(null);
			}

			// ✅ inputlarni bo‘shatib yuboramiz
			if (type === Status.TODO) setTodoInput('');
			if (type === Status.PROGRESS) setProgressInput('');
			if (type === Status.COMPLETED) setCompletedInput('');
		} catch (error) {
			console.log(error);
		}
	};

	const calculateCount = (status: Status) => {
		const array = tasks.filter(t => t.status === status);
		return array.length;
	};

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(API_URL + `/tasks/${id}`);
			getTasks();
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = (currentTask: Task) => {
		if (currentTask.status === Status.TODO) {
			setTodoInput(currentTask.name);
		} else if (currentTask.status === Status.PROGRESS) {
			setProgressInput(currentTask.name);
		} else {
			setCompletedInput(currentTask.name);
		}
		setEditingId(String(currentTask.id));
	};

	const handleDrop = async (status: Status) => {
		try {
			await axios.patch(API_URL + `/tasks/${touchId}`, {
				status,
			});
			getTasks();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='h-screen flex items-center justify-center gap-10 p-10'>
			{/* TODO */}
			<div className='w-1/3 bg-white rounded-2xl shadow-lg flex flex-col'>
				<div className='bg-black text-white text-center py-3 rounded-t-2xl font-semibold'>
					Todo ({calculateCount(Status.TODO)})
				</div>

				<div className='p-4 flex-1' onDragOver={e => e.preventDefault()} onDrop={() => handleDrop(Status.TODO)}>
					{tasks
						.filter(t => t.status === Status.TODO)
						.map(task => (
							<TaskCard
								key={task.id}
								name={task.name}
								deleteTask={() => handleDelete(task.id)}
								editTask={() => handleEdit(task)}
								onDrag={() => setTouchId(String(task.id))}
							/>
						))}
				</div>

				{/* FOOTER */}
				<div className='p-4 border-t flex items-center gap-2'>
					<input
						value={todoInput}
						onChange={e => setTodoInput(e.target.value)}
						type='text'
						placeholder='Add todo...'
						className='flex-1 h-10 px-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-black/30'
					/>
					<button
						onClick={() => handleAdd(Status.TODO)}
						className='h-10 px-4 rounded-xl bg-black text-white font-medium hover:opacity-90 active:scale-[0.98] transition'>
						Add
					</button>
				</div>
			</div>

			{/* PROGRESS */}
			<div className='w-1/3 bg-white rounded-2xl shadow-lg flex flex-col'>
				<div className='bg-blue-600 text-white text-center py-3 rounded-t-2xl font-semibold'>
					Progress ({calculateCount(Status.PROGRESS)})
				</div>

				<div className='p-4 flex-1' onDragOver={e => e.preventDefault()} onDrop={() => handleDrop(Status.PROGRESS)}>
					{tasks
						.filter(t => t.status === Status.PROGRESS)
						.map(task => (
							<TaskCard
								key={task.id}
								name={task.name}
								deleteTask={() => handleDelete(task.id)}
								editTask={() => handleEdit(task)}
								onDrag={() => setTouchId(String(task.id))}
							/>
						))}
				</div>

				{/* FOOTER */}
				<div className='p-4 border-t flex items-center gap-2'>
					<input
						value={progressInput}
						onChange={e => setProgressInput(e.target.value)}
						type='text'
						placeholder='Add progress...'
						className='flex-1 h-10 px-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500/30'
					/>
					<button
						onClick={() => handleAdd(Status.PROGRESS)}
						className='h-10 px-4 rounded-xl bg-blue-600 text-white font-medium hover:opacity-90 active:scale-[0.98] transition'>
						Add
					</button>
				</div>
			</div>

			{/* COMPLETED */}
			<div className='w-1/3 bg-white rounded-2xl shadow-lg flex flex-col'>
				<div className='bg-green-600 text-white text-center py-3 rounded-t-2xl font-semibold'>
					Completed ({calculateCount(Status.COMPLETED)})
				</div>

				<div className='p-4 flex-1' onDragOver={e => e.preventDefault()} onDrop={() => handleDrop(Status.COMPLETED)}>
					{tasks
						.filter(t => t.status === Status.COMPLETED)
						.map(task => (
							<TaskCard
								key={task.id}
								name={task.name}
								deleteTask={() => handleDelete(task.id)}
								editTask={() => handleEdit(task)}
								onDrag={() => setTouchId(String(task.id))}
							/>
						))}
				</div>

				{/* FOOTER */}
				<div className='p-4 border-t flex items-center gap-2'>
					<input
						value={completedInput}
						onChange={e => setCompletedInput(e.target.value)}
						type='text'
						placeholder='Add completed...'
						className='flex-1 h-10 px-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-green-500/30'
					/>
					<button
						onClick={() => handleAdd(Status.COMPLETED)}
						className='h-10 px-4 rounded-xl bg-green-600 text-white font-medium hover:opacity-90 active:scale-[0.98] transition'>
						Add
					</button>
				</div>
			</div>
		</div>
	);
}

export default Todos;
