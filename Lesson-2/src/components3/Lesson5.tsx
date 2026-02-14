import { useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import ProductCard from './ProductCard'

type Product = {
	imgUrl: string;
	name: string;
	description: string;
	price: number;
};

function Lesson5() {
	const [products, setProducts] = useState<Product[]>([
		{
			imgUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
			description: 'Your perfect pack for everyday use and walks in the forest.',
			name: 'Fjallraven Backpack',
			price: 109.95,
		},
		{
			imgUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
			description: 'Slim-fitting style, light weight & soft fabric.',
			name: 'Mens Casual T-Shirts',
			price: 10.95,
		},
	]);

	const [name, setName] = useState('');
	const [imgUrl, setImgUrl] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [editIndex, setEditIndex] = useState<number | null>(null);

	const handleDelete = (index: number) => {
		setProducts(prev => prev.filter((_, i) => i !== index));
	};

	const handleEdit = (index: number) => {
		const product = products[index];

		setName(product.name);
		setImgUrl(product.imgUrl);
		setDescription(product.description);
		setPrice(String(product.price));

		setEditIndex(index);
		setIsOpen(true);
	};

	const handleSave = () => {
		if (!name || !imgUrl || !description || !price) {
			alert('Please fill all fields');
			return;
		}

		const newProduct: Product = {
			name,
			imgUrl,
			description,
			price: Number(price),
		};

		if (editIndex !== null) {
			const updated = [...products];
			updated[editIndex] = newProduct;
			setProducts(updated);
		} else {
			setProducts(prev => [...prev, newProduct]);
		}

		handleClose();
	};

	const handleClose = () => {
		setName('');
		setImgUrl('');
		setDescription('');
		setPrice('');
		setEditIndex(null);
		setIsOpen(false);
	};

	return (
		<div className='py-6'>
			<div className='border rounded-lg shadow-sm flex items-center justify-between h-20 px-6'>
				<h1 className='text-xl font-bold'>Product Dashboard</h1>

				<button
					onClick={() => setIsOpen(true)}
					className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition'>
					+ Add Product
				</button>
			</div>

			<div className='container mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{products.map((product, index) => (
					<ProductCard
						key={index}
						{...product}
						deleteProduct={() => handleDelete(index)}
						editProduct={() => handleEdit(index)}
					/>
				))}
			</div>

			<Rodal visible={isOpen} onClose={handleClose} width={400}>
				<div className='flex flex-col gap-4 mt-2'>
					<h2 className='text-lg font-semibold'>{editIndex !== null ? 'Update Product' : 'Add Product'}</h2>

					<input
						className='border p-2 rounded'
						placeholder='Image URL'
						value={imgUrl}
						onChange={e => setImgUrl(e.target.value)}
					/>

					<input
						className='border p-2 rounded'
						placeholder='Product Name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>

					<textarea
						className='border p-2 rounded'
						placeholder='Description'
						rows={3}
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>

					<input
						type='number'
						className='border p-2 rounded'
						placeholder='Price'
						value={price}
						onChange={e => setPrice(e.target.value)}
					/>

					<button onClick={handleSave} className='bg-black text-white py-2 rounded hover:opacity-90 transition'>
						{editIndex !== null ? 'Update' : 'Save'}
					</button>
				</div>
			</Rodal>
		</div>
	);
}

export default Lesson5;
