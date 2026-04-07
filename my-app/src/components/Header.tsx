import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import { addGroup, closeModal, openModal, setGroupName } from '../reducers/slices/groupSlice';
import { openStudentModal, closeStudentModal, handleStudentForm, addStudent } from '../reducers/slices/studentSlice';

function Header() {
	const { modalOpen, groupName, groups } = useAppSelector(state => state.group);
	const { modalVisible, studentForm, editingId } = useAppSelector(state => state.student);

	const dispatch = useAppDispatch();
	const activeGroups = groups.filter(group => group.active);

	// GROUP SAVE
	const handleSave = () => {
		const groupObj = {
			id: Date.now(),
			name: groupName,
			active: false,
		};
		dispatch(addGroup(groupObj));
		dispatch(closeModal());
	};

	// STUDENT SAVE
	const handleStudentSave = () => {
		if (!studentForm.fullName || !studentForm.email || studentForm.age <= 0 || studentForm.selectedGroupId === '') return;
		dispatch(addStudent());
		dispatch(closeStudentModal());
	};

	return (
		<div className='py-4 shadow-md'>
			<div className='container flex items-center justify-between'>
				<h1>LOGO </h1>

				<input type='search' className='form-control w-25' placeholder='search by group name...' />

				<div className='flex items-center gap-3'>
					<button onClick={() => dispatch(openModal())} className='btn btn-dark'>
						+group
					</button>

					<button onClick={() => dispatch(openStudentModal())} className='btn btn-dark'>
						+student
					</button>
				</div>
			</div>

			{/* GROUP MODAL */}
			<Rodal visible={modalOpen} onClose={() => dispatch(closeModal())}>
				<div className='mt-4'>
					<input
						value={groupName}
						onChange={e => dispatch(setGroupName(e.target.value))}
						type='text'
						className='form-control'
						placeholder='Group name...'
					/>

					<button onClick={handleSave} className='btn btn-dark mt-3'>
						Add group
					</button>
				</div>
			</Rodal>

			{/* STUDENT MODAL */}
				<Rodal
					customStyles={{ height: 'max-content' }}
					visible={modalVisible}
					onClose={() => dispatch(closeStudentModal())}>
					<div className='mt-4 w-auto'>
						<h4>{editingId === null ? 'Add student' : 'Edit student'}</h4>

						{/* FULL NAME */}
						<input
							value={studentForm.fullName}
							onChange={e => dispatch(handleStudentForm({ key: 'fullName', value: e.target.value }))}
							type='text'
							className='form-control mt-2'
							placeholder='Full name...'
						/>

					{/* AGE */}
					<input
						value={studentForm.age}
						onChange={e => dispatch(handleStudentForm({ key: 'age', value: Number(e.target.value) }))}
						type='number'
						className='form-control mt-2'
						placeholder='Age...'
					/>

					{/* EMAIL */}
					<input
						value={studentForm.email}
						onChange={e => dispatch(handleStudentForm({ key: 'email', value: e.target.value }))}
						type='email'
						className='form-control mt-2'
						placeholder='Email...'
					/>

					{/* GROUP SELECT */}
						<select
							value={studentForm.selectedGroupId}
							onChange={e =>
								dispatch(
									handleStudentForm({
										key: 'selectedGroupId',
										value: Number(e.target.value),
									}),
								)
							}
							disabled={activeGroups.length === 0}
							className='form-control mt-2'>
							<option value='' disabled>
								{activeGroups.length === 0 ? 'No active group' : 'Choose Group'}
							</option>

							{activeGroups.map((group, index) => (
								<option key={index} value={group.id}>
									{group.name}
								</option>
							))}
						</select>

						{/* SAVE */}
						<button
							onClick={handleStudentSave}
							disabled={activeGroups.length === 0}
							className='btn btn-dark mt-3'>
							{editingId === null ? 'Save' : 'Update'}
						</button>
					</div>
				</Rodal>
		</div>
	);
}

export default Header;
