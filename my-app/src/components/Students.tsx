import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import { changeStudentStatus, deleteStudent, editStudent } from '../reducers/slices/studentSlice';

function Students() {
	const { students } = useAppSelector(state => state.student);
	const { groups } = useAppSelector(state => state.group);
	const dispatch = useAppDispatch();
	const activeGroupIds = new Set(groups.filter(group => group.active).map(group => group.id));
	const visibleStudents = students.filter(student => activeGroupIds.has(student.groupId));

	return (
		<div className='mt-5 container'>
			<table className='table'>
				<thead className='table-dark'>
					<tr>
						<th>N</th>
						<th>FullName</th>
							<th>Age</th>
							<th>Email</th>
							<th>Active</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{visibleStudents.map((student, index) => (
							<tr key={student.id}>
								<td>{index + 1}</td>
								<td>{student.fullName}</td>
								<td>{student.age}</td>
								<td>{student.email}</td>
								<td>
									<input
										type='checkbox'
										className='form-check-input'
										checked={student.active}
										onChange={() => dispatch(changeStudentStatus(student.id))}
									/>
								</td>
								<td className='whitespace-nowrap'>
									<button onClick={() => dispatch(editStudent(student))} className='btn btn-primary btn-sm me-2'>
										Edit
									</button>
									<button onClick={() => dispatch(deleteStudent(student.id))} className='btn btn-danger btn-sm'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
	);
}

export default Students;
