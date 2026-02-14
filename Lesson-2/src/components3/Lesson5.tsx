import { useState } from 'react';
import ProductCard from './ProductCard';

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
			description:
				'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
			name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
			price: 109.95,
		},
		{
			imgUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
			description:
				'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans.',
			name: 'Mens Casual Premium Slim Fit T-Shirts',
			price: 10.95,
		},
	]);
	return (
		<div className='py-2'>
			<div className='border rounded-lg shadow-sm flex items-center justify-between h-20! px-4!'>
				<h1>Logo</h1>
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2! px-4! rounded-full!'>
					+Product
				</button>
			</div>
			<div className='container mx-auto! mt-3! flex gap-3 items-center'>
				{products.map((product, index) => (
					<ProductCard
						name={product.name}
						description={product.description}
						imgUrl={product.imgUrl}
            price={product.price }
            key={index}
					/>
				))}
			</div>
		</div>
	);
}

export default Lesson5;
