interface CategoryCardProps {
	name: string;
	productsCount: number;
}

export default function CategoryCard({ name, productsCount }: CategoryCardProps) {
	return (
		<div className='bg-blue-200 p-4 rounded-lg shadow-md w-36 text-center'>
			<h3 className='text-lg italic'>{name}</h3>
			<p className='text-sm mt-1'>{productsCount} ta</p>
		</div>
	);
}
