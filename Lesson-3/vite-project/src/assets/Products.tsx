import { useState } from 'react';
import ProductCard from './ProductCard';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

type Product = {
	id: number;
	imageUrl: string;
	name: string;
	description: string;
	price: number;
};

function Products() {
	const [products, setProducts] = useState<Product[]>([
		{
			id: 1,
			imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
			description:
				'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve.',
			name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
			price: 13.35,
		},
		{
			id: 2,
			imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
			description:
				'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, lightweight & soft fabric for comfortable wearing.',
			name: 'Mens Casual Premium Slim Fit T-Shirts',
			price: 45,
		},
	]);

	const [modalvVisible, setModalVisible] = useState(false);
	const [name, setName] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');

	const handleSave = () => {
		const productObj: Product = {
			id: Date.now(),
			name,
			imageUrl,
			price: Number(price),
			description,
		};

		setProducts(prev => [...prev, productObj]);
		setModalVisible(false);

		setName('');
		setImageUrl('');
		setDescription('');
		setPrice('');
	};

	return (
		<div className=' py-4'>
			<div className='border h-20! px-4! rounded-lg shadow-sm flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>LOGO</h1>
				<button
					type='button'
					onClick={() => setModalVisible(true)}
					className='text-white bg-sky-400 hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none'>
					+ Product
				</button>
			</div>

			<div className='mt-6! grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{products.map(product => (
					<ProductCard
						key={product.id}
						name={product.name}
						description={product.description}
						imageUrl={product.imageUrl}
						price={product.price}
					/>
				))}
			</div>

			<div>
				<Rodal customStyles={{ height: 'max-content' }} visible={modalvVisible} onClose={() => setModalVisible(false)}>
					<div className='mt-8!'>
						<input
							value={imageUrl}
							onChange={e => setImageUrl(e.target.value)}
							type='text'
							id='first_name'
							className='bg-gray-100/90 mt-8 border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3! py-2.5! shadow-xs placeholder:text-body'
							placeholder='Product img Url...'
						/>
						<input
							value={name}
							onChange={e => setName(e.target.value)}
							type='text'
							id='first_name'
							className='bg-gray-100/90 mt-3 border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3! py-2.5! shadow-xs placeholder:text-body'
							placeholder='Product name...'
						/>

						<textarea
							value={description}
							onChange={e => setDescription(e.target.value)}
							className='w-full mt-3 border border-default-medium rounded-lg bg-gray-100/90 px-3 py-2.5 text-sm text-heading shadow-xs placeholder:text-body resize-y'
							placeholder='Product description...'
						/>

						<input
							value={price}
							onChange={e => setPrice(e.target.value)}
							type='text'
							id='first_name'
							className='bg-gray-100/90 mt-3 border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3! py-2.5! shadow-xs placeholder:text-body'
							placeholder='Product price...'
						/>
						<button
							onClick={handleSave}
							type='button'
							className='text-white bg-black  focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none mt-2 w-full opacity-100 cursor-pointer hover:scale-102 transition duration-300'>
							save
						</button>
					</div>
				</Rodal>
			</div>
		</div>
	);
}

export default Products;
