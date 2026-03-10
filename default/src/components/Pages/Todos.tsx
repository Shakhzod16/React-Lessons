/* eslint-disable react-hooks/immutability */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Todo } from '../../../types';

function Todos() {
	const { id } = useParams();
	const [todos, setTodos] = useState<Todo[]>([]);
	useEffect(() => {
		getTodos();
	}, [id]);
	const getTodos = async () => {
		try {
			const { data } = await axios.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
			setTodos(data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='container py-3'>
			<table className='table'>
				<thead className='table-primary'>
					<tr>
						<th>Id</th>
						<th>UserId</th>
						<th>Title</th>
						<th>Completed</th>
					</tr>
				</thead>
				<tbody>
					{todos.map(todo => (
						<tr key={todo.id}>
							<td>{todo.id}</td>
							<td>{todo.userId}</td>
							<td>{todo.title}</td>
							<td>{todo.completed}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Todos;
