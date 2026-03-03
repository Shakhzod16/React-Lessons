import { useEffect, useState } from 'react';
import axios from 'axios';
import { Status, type Order } from '../../types';
import { MdDelete } from 'react-icons/md';

const API = 'http://localhost:3000/orders';

export default function Todos() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [dragId, setDragId] = useState<number | null>(null);

	const [form, setForm] = useState({
		name: '',
		phone: '',
		count: "",
	});

	const getOrders = async () => {
		try {
			const { data } = await axios.get<Order[]>(API);
			setOrders(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getOrders();
	}, []);

	const handleSubmit = async () => {
		if (!form.name.trim() || !form.phone.trim()) return;

		try {
			await axios.post(API, {
				name: form.name,
				phone: form.phone,
				count: form.count,
				status: Status.NEW,
			});

			setForm({ name: '', phone: '', count: "" });
			getOrders();
		} catch (error) {
			console.log(error);
		}
	};

	// Bunda 2 3 cardlardan orqaga qaytmasligi uchun logic
	const isAllowedMove = (from: Status, to: Status) =>
		(from === Status.NEW && to === Status.PROGRESS) || (from === Status.PROGRESS && to === Status.DELIVERED);

	const handleDrop = async (targetStatus: Status) => {
		if (dragId === null) return;

		const current = orders.find(o => o.id === dragId);
		if (!current) return;

		if (!isAllowedMove(current.status, targetStatus)) return;

		try {
			await axios.patch(`${API}/${dragId}`, { status: targetStatus });
		} catch (error) {
			console.log(error);
			getOrders();
		} finally {
			setDragId(null);
		}
	};
	// delete
	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`${API}/${id}`);
		} catch (error) {
			console.log(error);

			getOrders();
		}
	};

	const renderColumn = (status: Status, title: string, headerClass: string) => {
		const list = orders.filter(o => o.status === status);

		return (
			<div className='w-1/3 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden'>
				<div className={`${headerClass} text-white text-center py-3 `}>{title}</div>

				<div
					className='p-4 flex-1 space-y-3 min-h-80'
					onDragOver={e => e.preventDefault()}
					onDrop={() => handleDrop(status)}>
					{list.length === 0 ? (
						<p className='text-center text-gray-400'>No orders</p>
					) : (
						list.map(order => (
							<div
								key={order.id}
								draggable={order.status !== Status.DELIVERED}
								onDragStart={() => setDragId(order.id)}
								className='bg-gray-100 p-3 rounded-xl shadow-sm cursor-pointer  flex items-center justify-between'>
								<div>
									<h4 className='font-semibold text-gray-900'>{order.name}</h4>
									<p className='text-sm text-blue-600 mt-2'>{order.phone}</p>
								</div>

								<div className='flex items-center gap-2'>
									<div className='bg-blue-500 text-white px-2 py-1 rounded-full font-extrabold'>{order.count}x</div>

									{order.status === Status.DELIVERED && (
										<button
											onClick={() => handleDelete(order.id)}
											className=' text-white px-3 py-1 rounded-full  transition'>
											<MdDelete size={34} color='red' hover:bg-red-700 />
										</button>
									)}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		);
	};

	return (
		<div className='min-h-screen bg-gray-200 p-10'>
			{/* FORM */}
			<div className='max-w-md mx-auto bg-white p-6 rounded-2xl shadow mb-10 '>
				<h2 className='text-xl font-bold text-center'>Buyurtma qo‘shish</h2>

				<input
					placeholder='Buyurtmachining ismi...'
					className='w-full border p-2 rounded-lg outline-none mt-2!'
					value={form.name}
					onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
				/>

				<input
					placeholder='Buyurtmachining tel raqami...'
					className='w-full border p-2 rounded-lg outline-none mt-2!'
					value={form.phone}
					onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
				/>

				<select
					className='w-full border p-2 rounded-lg outline-none mt-3 mb-3'
					value={form.count}
					onChange={e => setForm(prev => ({ ...prev, count: String(e.target.value) }))}>
					<option value='' disabled>
						Mahsulotlar soni
					</option>

					{Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
						<option key={n} value={n}>
							{n}
						</option>
					))}
				</select>

				<button
					onClick={handleSubmit}
					className='w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition'>
					Saqlash
				</button>
			</div>

			<div className='flex gap-6'>
				{renderColumn(Status.NEW, 'Yangi', 'bg-blue-500')}
				{renderColumn(Status.PROGRESS, 'Tayyorlanmoqda', 'bg-purple-500')}
				{renderColumn(Status.DELIVERED, 'Yetkazildi', 'bg-green-500')}
			</div>
		</div>
	);
}
