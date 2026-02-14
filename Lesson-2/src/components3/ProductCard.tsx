import { MdDelete } from 'react-icons/md';
import { BiPencil } from 'react-icons/bi';

interface Iprops {
	imgUrl: string;
	name: string;
	description: string;
	price: number;
}

function ProductCard({ name, description, imgUrl, price }: Iprops) {
	return (
		<div>
			<div className='bg-neutral-primary-soft block max-w-75 p-5! border border-b-gray-200 rounded-2xl shadow-xs'>
				<div className='w-full h-52 overflow-hidden rounded-xl'>
					<img src={imgUrl} alt={name} className='w-full h-full object-cover' />
				</div>

				<h5 className='mt-6! mb-2! text-2xl font-semibold tracking-tight text-heading'>{name}</h5>

				<p className='mb-2! text-body line-clamp-1'>{description}</p>
				<p className='mb-2! text-sky-600 text-lg'>${price}</p>
				<div className='flex items-center justify-between'>
					<button className='inline-flex items-center text-white mt-2 bg-primary border  hover:bg-primary focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-lg! text-sm px-4! py-2.5! focus:outline-none'>
						Add to cart
						<svg
							className='w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='none'
							viewBox='0 0 24 24'>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M19 12H5m14 0-4 4m4-4-4-4'
							/>
						</svg>
					</button>
					<div className='flex items-center gap-2'>
						<button className='btn py-2! cursor-pointer active:scale-105 transition-all bg-red-500 duration-300 text-white btn-danger'>
							<MdDelete />
						</button>
						<button className='btn py-2! cursor-pointer active:scale-105 transition-all bg-amber-500! duration-300 text-white btn-danger'>
							<BiPencil />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
