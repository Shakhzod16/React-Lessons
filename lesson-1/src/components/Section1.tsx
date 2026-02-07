import './Section1.scss';

export default function Section1() {
	return (
		<div className='main'>
			<div className='left'>
				<h1>
					Zo'r jihozlar bilan <br /> sarguzashtlarni <br /> kashf eting
				</h1>
				<p>
					Sarguzasht ishqibozlari uchun moʻljallangan ochiq havoda kerakli <br />
					jihozlarimizni kashf eting. Yuqori sifatli chodirlardan qulay lager <br />
					anjomlarigacha, hammasi sizning tajribangizni yuksaltirish uchun.
				</p>
				<button>Xarid qiling</button>
				<div className='all'>
					<div className='one'>
						<span>
							<h1>200</h1>+
						</span>
						<p>Xalqaro brendlar</p>
					</div>
					<div className='one'>
						<span>
							<h1>2,000</h1>+
						</span>
						<p>Yuqori Sifatli Mahsulotlar</p>
					</div>
					<div className='one'>
						<span>
							<h1>30,000</h1>+
						</span>
						<p>Baxtli mijozlar</p>
					</div>
				</div>
			</div>
			<div className='rigth'>
				<img src='/public/images/image.svg' alt='' />
			</div>
		</div>
	);
}
