import { Outlet, useLocation } from 'react-router-dom';

function Admin() {
	const { pathname } = useLocation();
	return (
		<div className='h-screen border-2 flex'>
			{/*   Left */}
			<div className='w-[300px] border-r-2 px-2 py-2'>
				<h4 className='text-center'>Admin Dashboard</h4>
				<div className='mt-4'>
					<button
						className={`btn ${pathname === '/admin/settings' ? 'btn-dark' : 'btn btn-dark'} btn-outline-dark w-100 mb-3 `}>
						Settings
					</button>
					<button className='btn btn-outline-dark w-100 mb-3'>Users</button>
					<button className='btn btn-outline-dark w-100 mb-3'>Products</button>
					<button className='btn btn-outline-dark w-100 mb-3'>Categorys</button>
					<button className='btn btn-outline-dark w-100 mb-3'>Orders</button>
					<button className='btn btn-outline-dark w-100 mb-3'>Home</button>
				</div>
			</div>
			{/* right */}
			<div className='border w-100 border-red-500!'>
				<Outlet />
			</div>
		</div>
	);
}

export default Admin;
