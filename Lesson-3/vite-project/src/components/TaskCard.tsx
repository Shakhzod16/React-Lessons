import { MdDelete } from 'react-icons/md';
import { BiPencil } from 'react-icons/bi';

interface Props {
	name: string;
	deleteTask: () => void;
	editTask: () => void;
	onDrag: () => void;
}

function TaskCard({ name, deleteTask, editTask, onDrag }: Props) {
	return (
		<div
			draggable={true}
			onDrag={onDrag}
			className='border rounded-sm flex items-center justify-between py-2 px-2 mb-2'>
			<p className='mb-0'>{name}</p>
			<div className='flex items-center gap-2'>
				<button onClick={deleteTask}>
					<MdDelete size={24} color='red' />
				</button>
				<button onClick={editTask}>
					<BiPencil size={24} color='green' />
				</button>
			</div>
		</div>
	);
}

export default TaskCard;
