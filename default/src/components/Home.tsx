import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className='flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#e8f1f8,_#d7e0e7_42%,_#c5d0d8_100%)] p-6'>
			<div className='w-full max-w-2xl rounded-[28px] border border-white/60 bg-white/80 p-10 text-center shadow-[0_25px_80px_rgba(43,59,74,0.18)] backdrop-blur'>
				<h1 className='mb-3 text-5xl font-semibold text-slate-800'>Asosiy Menu</h1>
				<p className='mb-8 text-lg text-slate-600'>
					Admin panelga o&apos;tish uchun quyidagi tugmadan foydalaning.
				</p>
				<Link
					to='/admin'
					className='inline-flex items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-base font-medium text-white no-underline shadow-sm transition hover:bg-sky-600'>
					Admin Panelga O&apos;tish
				</Link>
			</div>
		</div>
	);
}

export default Home;
