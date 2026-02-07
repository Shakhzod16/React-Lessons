import { LuShoppingCart } from 'react-icons/lu';
import './Header.scss';

export default function Header() {
	return (
		<div className='my-header'>
			<div className='container'>
				<img src='/public/images/Logo.svg' alt='' />
				<ul className='menu'>
					<li>Bosh sahifa</li>
					<li>Mahsulotlar</li>
					<li>Aloqa</li>
					<li>Blog</li>
				</ul>
				<div className='rigth'>
					<input type='search' />
					<LuShoppingCart size={24}/>
				</div>
			</div>
		</div>
	);
}
