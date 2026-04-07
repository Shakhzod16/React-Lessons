interface GroupProps {
	studentsCount: number;
	name: string;
	active: boolean;
	changeStatus: () => void;
}


function Group({ name, active, studentsCount, changeStatus }: GroupProps) {
	return (
		<div
			className={`w-[320px] h-55 border raounded-4xl! flex items-center shrink-0 flex-col mt-5 justify-center relative`}>
			<h1 className='font-medium text-[32px]! felx-col'>{name}</h1>
			<p>{studentsCount} students</p>
			<div className='form-check form-switch absolute bottom-5 right-4'>
				<input
					checked={active}
					type='checkbox'
					role='switch'
					className='form-check-input'
					id='flexSwitchCheckDefault'
					onChange={changeStatus}
				/>
			</div>
		</div>
	);
}

export default Group;
