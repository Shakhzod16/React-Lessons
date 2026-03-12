import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className='flex min-h-screen items-center justify-center bg-white'>
			<Link
				to='/admin'
				className='inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-base font-medium text-black no-underline transition hover:bg-slate-100'>
				Admin Panelga O&apos;tish
			</Link>
		</div>
	);
}

export default Home;
