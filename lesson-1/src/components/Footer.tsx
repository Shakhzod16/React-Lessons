import './Footer.scss';
import { FaInstagram, FaFacebookF, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
	return (
		<footer>
			<div className='footer'>
				<div className='card1'>
					<img src='/images/Logo.svg' alt='Logo' />

					<div className='btn'>
						<button>
							<FaTwitter />
						</button>
						<button>
							<FaInstagram />
						</button>
						<button>
							<FaFacebookF />
						</button>
						<button>
							<FaGithub />
						</button>
					</div>
				</div>

				<div className='card'>
					<h6>Kompaniya</h6>
					<p>Biz haqimizda</p>
					<p>Xususiyatlar</p>
					<p>Ishlash jarayoni</p>
					<p>Karyera imkoniyatlari</p>
				</div>

				<div className='card'>
					<h6>Yordam</h6>
					<p>Biz haqimizda</p>
					<p>Xususiyatlar</p>
					<p>Ishlash jarayoni</p>
					<p>Karyera imkoniyatlari</p>
				</div>

				<div className='card'>
					<h6>Savollar</h6>
					<p>Biz haqimizda</p>
					<p>Xususiyatlar</p>
					<p>Ishlash jarayoni</p>
					<p>Karyera imkoniyatlari</p>
				</div>

				<div className='card'>
					<h6>Resurslar</h6>
					<p>Biz haqimizda</p>
					<p>Xususiyatlar</p>
					<p>Ishlash jarayoni</p>
					<p>Karyera imkoniyatlari</p>
				</div>
			</div>

			{/* <hr />

			<div className='footer_bot'>
				<p>Shop.co © 2000–2023, All Rights Reserved</p>

				<div className='five'>
					<img src='/images/Badge.svg' alt='' />
					<img src='/images/Badge.svg' alt='' />
					<img src='/images/Badge.svg' alt='' />
					<img src='/images/Badge.svg' alt='' />
					<img src='/images/Badge.svg' alt='' />
				</div>
			</div> */}
		</footer>
	);
}
