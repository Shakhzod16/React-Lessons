import './Products.scss';

const products = [
	{
		id: 1,
		title: 'Chodir',
		price: 120,
		oldPrice: null,
		rating: 4.5,
		image: '../../public/images/image3.svg',
	},
	{
		id: 2,
		title: "Yig'iladigan kreslo",
		price: 240,
		oldPrice: 260,
		rating: 4.5,
		image: '../../public/images/image3.svg',
	},
	{
		id: 3,
		title: 'Qulay lager kreslosi',
		price: 180,
		oldPrice: null,
		rating: 4.5,
		image: '../../public/images/image3.svg',
	},
	{
		id: 4,
		title: 'Uyqu uchun sumka',
		price: 130,
		oldPrice: 165,
		rating: 4.5,
		image: '../../public/images/image3.svg',
	},
	{
		id: 5,
		title: "Ko'chma oshxona stoli",
		price: 212,
		oldPrice: 232,
		rating: 5,
		image: '../../public/images/image3.svg',
	},
	{
		id: 6,
		title: 'Katta chodir',
		price: 145,
		oldPrice: null,
		rating: 4,
		image: '../../public/images/image3.svg',
	},
	{
		id: 7,
		title: 'Katta hajmli sumka',
		price: 80,
		oldPrice: null,
		rating: 3,
		image: '../../public/images/image3.svg',
	},
	{
		id: 8,
		title: "Lager uchun o'choq",
		price: 210,
		oldPrice: null,
		rating: 4.5,
		image: '../../public/images/image3.svg',
	},
	{
		id: 8,
		title: "Lager uchun o'choq",
		price: 210,
		oldPrice: null,
		rating: 4.5,
		image: '../../public/images/image3.svg',
	},
	{
		id: 8,
		title: "Lager uchun o'choq",
		price: 210,
		oldPrice: null,
		rating: 4.5,
		image: '../../public/images/image3.svg',
	},
	{
		id: 8,
		title: "Lager uchun o'choq",
		price: 210,
		oldPrice: null,
		rating: 4.5,
		image: '../../public/images/image3.svg',
	},
	{
		id: 8,
		title: "Lager uchun o'choq",
		price: 210,
		oldPrice: null,
		rating: 4.5,
		image: '../../public/images/image3.svg',
	},
];

export default function Products() {
	return (
		<div className='products'>
			{products.map(item => (
				<div className='product-card' key={item.id}>
					<div className='image-box'>
						<img src={item.image} alt={item.title} />
					</div>

					<h3>{item.title}</h3>

					<div className='rating'>⭐ {item.rating}</div>

					<div className='price_list'>
						<div className='price'>
							<span className='current'>${item.price}</span>
							{item.oldPrice && <span className='old'>${item.oldPrice}</span>}
						</div>

						<button>🛒</button>
					</div>
				</div>
			))}
		</div>
	);
}
