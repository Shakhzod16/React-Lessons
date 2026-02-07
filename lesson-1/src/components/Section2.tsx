import './Section2.scss';
import { BiLandscape } from 'react-icons/bi';
import { TbSofa } from 'react-icons/tb';
import { FaKitchenSet } from 'react-icons/fa6';
import { RiRedPacketLine } from 'react-icons/ri';
import Products from './Products';

export default function Section2() {

	return (
		<div className='Kategory'>
			<h1>Kategoriya va Mahsulotlar</h1>
			<div className='kard'>
				<div className='first'>
					<BiLandscape />
					<p>Chodirlar</p>
				</div>
				<div className='first'>
					<TbSofa />
					<p>Mebel</p>
				</div>
				<div className='first'>
					<FaKitchenSet />
					<p>Oshxona jihozlari</p>
				</div>
				<div className='first'>
					<TbSofa />
					<p>Mebel</p>
				</div>
				<div className='first'>
					<RiRedPacketLine />
					<p>Mebel</p>
				</div>
			</div>
			<div>
				<Products />
			</div>
			<div
				style={{
					display: 'flex',
					justifyItems: 'center',
				}}>
				<button
					className='kategorybtn'
					style={{
						justifyItems: 'center',
						margin: '70px auto',
						padding: '16px 54px',
						borderRadius: '62px',
						border: '1px solid #245d30',
					}}>
					Hammasini ko'rish
				</button>
			</div>
		</div>
	);
}
