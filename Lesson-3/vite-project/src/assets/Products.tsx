import { useState } from 'react';
import ProductCard from './ProductCard';

type Product = {
	id: number;
	imageUrl: string;
	name: string;
	description: string;
	price: number;
};

function Products() {
	const [products] = useState<Product[]>([
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

	return (
		<div className=' py-4'>
			{/* Header */}
			<div className='border h-20! px-4! rounded-lg shadow-sm flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>LOGO</h1>
				<button
					type='button'
					className='text-white bg-sky-400 hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none'>
					+ Product
				</button>
			</div>

			{/* Products Grid */}
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
		</div>
	);
}

export default Products;
