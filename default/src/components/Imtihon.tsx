import { useState } from 'react';

type Student = {
	id: string;
	name: string;
	age: string;
	email: string;
};

function Imtihon() {
	const [topStudents, setTopStudents] = useState<Student[]>([]);
	const [group1, setGroup1] = useState<Student[]>([]);
	const [group2, setGroup2] = useState<Student[]>([]);

	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({ name: '', age: '', email: '' });

	const [dragId, setDragId] = useState<string | null>(null);

	const createId = () => Math.random().toString(16).slice(2);

	const addStudent = () => {
		if (!form.name.trim() || !form.age.trim() || !form.email.trim()) return;

		const newStudent: Student = {
			id: createId(),
			name: form.name.trim(),
			age: form.age.trim(),
			email: form.email.trim(),
		};

		setTopStudents(prev => [newStudent, ...prev]);

		setForm({ name: '', age: '', email: '' });
		setOpen(false);
	};

	const findPlace = (id: string) => {
		if (topStudents.find(s => s.id === id)) return 'top';
		if (group1.find(s => s.id === id)) return 'group1';
		if (group2.find(s => s.id === id)) return 'group2';
		return null;
	};

	const removeFrom = (place: string, id: string) => {
		if (place === 'top') {
			const student = topStudents.find(s => s.id === id);
			setTopStudents(prev => prev.filter(s => s.id !== id));
			return student;
		}
		if (place === 'group1') {
			const student = group1.find(s => s.id === id);
			setGroup1(prev => prev.filter(s => s.id !== id));
			return student;
		}
		if (place === 'group2') {
			const student = group2.find(s => s.id === id);
			setGroup2(prev => prev.filter(s => s.id !== id));
			return student;
		}
		return undefined;
	};

	const addTo = (place: string, student: Student) => {
		if (place === 'top') setTopStudents(prev => [student, ...prev]);
		if (place === 'group1') setGroup1(prev => [student, ...prev]);
		if (place === 'group2') setGroup2(prev => [student, ...prev]);
	};

	const moveStudent = (to: 'top' | 'group1' | 'group2') => {
		if (!dragId) return;

		const from = findPlace(dragId);
		if (!from || from === to) return;

		const student = removeFrom(from, dragId);
		if (!student) return;

		addTo(to, student);
		setDragId(null);
	};

	return (
		<div style={{ padding: 20, background: '#f3f3f3', minHeight: '100vh' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
				<button
					onClick={() => setOpen(true)}
					style={{
						padding: '10px 16px',
						background: '#2b6cff',
						color: 'white',
						border: 'none',
						borderRadius: 10,
						cursor: 'pointer',
						fontWeight: 700,
					}}>
					+ Student
				</button>
			</div>

			<DropZone title='Studentlar' onDrop={() => moveStudent('top')}>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
					{topStudents.map(s => (
						<StudentCard key={s.id} student={s} setDragId={setDragId} />
					))}
					{topStudents.length === 0 && <p style={{ color: '#777' }}></p>}
				</div>
			</DropZone>

			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
				<DropZone title='Group 1' onDrop={() => moveStudent('group1')}>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
						{group1.map(s => (
							<StudentCard key={s.id} student={s} setDragId={setDragId} />
						))}
						{group1.length === 0 && <p style={{ color: '#777' }}></p>}
					</div>
				</DropZone>

				<DropZone title='Group 2' onDrop={() => moveStudent('group2')}>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
						{group2.map(s => (
							<StudentCard key={s.id} student={s} setDragId={setDragId} />
						))}
						{group2.length === 0 && <p style={{ color: '#777' }}></p>}
					</div>
				</DropZone>
			</div>

			{/* MODAL */}
			{open && (
				<div
					onClick={() => setOpen(false)}
					style={{
						position: 'fixed',
						inset: 0,
						background: 'rgba(0,0,0,.4)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: 12,
					}}>
					<div
						onClick={e => e.stopPropagation()}
						style={{
							width: 380,
							background: 'white',
							borderRadius: 14,
							padding: 16,
						}}>
						<h3 style={{ marginTop: 0 }}>Add Student</h3>

						<input
							placeholder='Ism'
							value={form.name}
							onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
							style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 10, border: '1px solid #ddd' }}
						/>
						<input
							placeholder='Yosh'
							value={form.age}
							onChange={e => setForm(p => ({ ...p, age: e.target.value }))}
							style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 10, border: '1px solid #ddd' }}
						/>
						<input
							placeholder='Email'
							value={form.email}
							onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
							style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 10, border: '1px solid #ddd' }}
						/>

						<button
							onClick={addStudent}
							style={{
								width: '100%',
								padding: 12,
								background: '#2b6cff',
								color: 'white',
								border: 'none',
								borderRadius: 10,
								fontWeight: 800,
								cursor: 'pointer',
							}}>
							Add
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Imtihon;

function StudentCard({ student, setDragId }: { student: Student; setDragId: (id: string) => void }) {
	return (
		<div
			draggable
			onDragStart={() => setDragId(student.id)}
			style={{
				width: 220,
				padding: 12,
				borderRadius: 14,
				border: '2px solid #6ea0ff',
				background: 'white',
				cursor: 'pointer',
			}}>
			<div style={{ fontWeight: 800, fontSize: 18 }}>{student.name}</div>
			<div>{student.age}</div>
			<div style={{ fontSize: 14, color: '#777' }}>{student.email}</div>
		</div>
	);
}

type DropZoneProps = {
	title: string;
	onDrop: () => void;
	children?: React.ReactNode;
};

function DropZone({ title, children, onDrop }: DropZoneProps) {
	return (
		<div
			onDragOver={e => e.preventDefault()}
			onDrop={onDrop}
			style={{
				background: 'white',
				border: '2px solid #cfcfcf',
				borderRadius: 18,
				padding: 14,
				minHeight: 190,
			}}>
			<h3 style={{ marginTop: 0 }}>{title}</h3>
			{children}
		</div>
	);
}
