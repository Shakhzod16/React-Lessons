import { useState } from 'react';
import CategoryCard from './CategoryCard';

interface Category {
	id: number;
	name: string;
	productsCount: number;
}

export default function Categories() {
	const [categories] = useState<Category[]>([
		{ id: 1, name: 'Name 5', productsCount: 4 },
		{ id: 2, name: 'Name 2', productsCount: 5 },
		{ id: 3, name: 'Name 3', productsCount: 6 },
		{ id: 4, name: 'Name 4', productsCount: 7 },
	]);

	return (
		<div className='py-10'>
			<h1 className='text-center text-2xl mb-6 font-cursive'>Categories</h1>
			<div className='flex flex-wrap justify-center gap-5'>
				{categories.map(category => (
					<CategoryCard key={category.id} name={category.name} productsCount={category.productsCount} />
				))}
			</div>
		</div>
	);
}
