import { MdDelete } from 'react-icons/md';
import { BiPencil } from 'react-icons/bi';

interface Props {
	imageUrl: string;
	name: string;
	description: string;
	price: number;
	deleteProduct: () => void;
	EditProduct: () => void; // <-- faqat shu joy o'zgardi (Products bilan mos)
}

function ProductCard({ name, description, imageUrl, price, deleteProduct, EditProduct }: Props) {
	return (
		<div className='w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
			{/* IMAGE */}
			<div className='flex items-center justify-center bg-gray-50 p-4'>
				<img src={imageUrl} alt={name} className='max-h-56 object-contain' />
			</div>

			{/* CONTENT */}
			<div className='p-6 text-center'>
				<h5 className='text-xl font-semibold text-gray-900 mb-3 line-clamp-2'>{name}</h5>

				<p className='text-sm text-gray-600 mb-4 line-clamp-2'>{description}</p>

				<p className='text-lg font-bold text-black mb-5'>${price}</p>

				{/* BUTTON ROW */}
				<div className='flex items-center justify-center gap-3'>
					<button className='px-4 py-2 text-sm font-medium rounded-lg bg-black text-white hover:bg-black/90 transition'>
						Read more
					</button>

					<button
						onClick={deleteProduct}
						className='p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition'
						aria-label='Delete'>
						<MdDelete size={18} />
					</button>

					<button
						onClick={EditProduct}
						className='p-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition'
						aria-label='Edit'>
						<BiPencil size={18} />
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
