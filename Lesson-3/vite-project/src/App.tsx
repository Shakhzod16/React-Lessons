import { useState } from 'react';
import './App.css';

import Components from './assets/Components';
import CompontentsTodos from './assets/CompontentsTodos';
import CompontentsUsers from './assets/CompontentsUsers';

type Tab = 'todos' | 'users' | 'posts';

function App() {
	const [tab, setTab] = useState<Tab>('todos');

	return (
		<div className='p-4'>
			<div className='flex justify-center gap-4'>
				<button
					type='button'
					onClick={() => setTab('todos')}
					className={`text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl
          focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium
          rounded-lg text-sm px-4 py-2.5 text-center leading-5
          ${tab === 'todos' ? 'ring-4 ring-blue-300' : ''}`}>
					Todos
				</button>

				<button
					type='button'
					onClick={() => setTab('users')}
					className={`text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl
          focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium
          rounded-lg text-sm px-4 py-2.5 text-center leading-5
          ${tab === 'users' ? 'ring-4 ring-blue-300' : ''}`}>
					Users
				</button>

				<button
					type='button'
					onClick={() => setTab('posts')}
					className={`text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl
          focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium
          rounded-lg text-sm px-4 py-2.5 text-center leading-5
          ${tab === 'posts' ? 'ring-4 ring-blue-300' : ''}`}>
					Posts
				</button>
			</div>

			<div className='mt-6'>
				{tab === 'todos' && <Components />}
				{tab === 'users' && <CompontentsUsers />}
				{tab === 'posts' && <CompontentsTodos />}
			</div>
		</div>
	);
}

export default App;
