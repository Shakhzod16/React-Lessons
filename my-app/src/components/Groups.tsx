import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import { changeGroupStatus } from '../reducers/slices/groupSlice';
import Group from './Group';

function Groups() {
	const { groups } = useAppSelector(state => state.group);
	const { students } = useAppSelector(state => state.student);
	const dispatch = useAppDispatch();

	const getStudentsCount = (groupId: number, isActive: boolean) => {
		if (!isActive) return 0;
		return students.filter(student => student.groupId === groupId).length;
	};

	return (
		<div className='container flex overflow-x-auto items-center gap-3'>
			{groups.map(group => (
				<Group
					key={group.id}
					name={group.name}
						studentsCount={getStudentsCount(group.id, group.active)}
					active={group.active}
					changeStatus={() => dispatch(changeGroupStatus(group.id))}
				/>
			))}
		</div>
	);
}

export default Groups;
