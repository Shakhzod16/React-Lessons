import { useEffect, useState } from 'react';
// import TaskCard from './TaskCard';
import axios from 'axios';
import { Status, type Task } from '../../types';

const API_URL = 'http://localhost:3000';

function Todos() {
	const [tasks, setTasks] = useState<Task[]>([]);

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

	const calculateCount = (status: Status) => {
		const array = tasks.filter(t => t.status === status);
		return array.length;
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

				<div className='p-4 flex-1' onDragOver={e => e.preventDefault()} onDrop={() => handleDrop(Status.TODO)}></div>
			</div>

			{/* PROGRESS */}
			<div className='w-1/3 bg-white rounded-2xl shadow-lg flex flex-col'>
				<div className='bg-blue-600 text-white text-center py-3 rounded-t-2xl font-semibold'>
					Progress ({calculateCount(Status.PROGRESS)})
				</div>

				<div
					className='p-4 flex-1'
					onDragOver={e => e.preventDefault()}
					onDrop={() => handleDrop(Status.PROGRESS)}></div>
			</div>

			{/* COMPLETED */}
			<div className='w-1/3 bg-white rounded-2xl shadow-lg flex flex-col'>
				<div className='bg-green-600 text-white text-center py-3 rounded-t-2xl font-semibold'>
					Completed ({calculateCount(Status.COMPLETED)})
				</div>

				<div
					className='p-4 flex-1'
					onDragOver={e => e.preventDefault()}
					onDrop={() => handleDrop(Status.COMPLETED)}></div>
			</div>
		</div>
	);
}

export default Todos;
