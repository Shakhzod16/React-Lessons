import { Link, Outlet, NavLink, useLocation } from 'react-router-dom';
import { RiCloseLine, RiGroupLine, RiMegaphoneLine, RiMessage2Line, RiRobotLine } from 'react-icons/ri';

const menuItems = [
	{ to: '/admin/gruhlar', label: 'Gruhlar', icon: RiGroupLine },
	{ to: '/admin/kanallar', label: 'Kanallar', icon: RiMegaphoneLine },
	{ to: '/admin/botlar', label: 'Botlar', icon: RiRobotLine },
	{ to: '/admin/xabarlar', label: 'Xabarlar', icon: RiMessage2Line },
];

function Admin() {
	const { pathname } = useLocation();

	return (
		<div className='min-h-screen bg-[radial-gradient(circle_at_top,#e8f1f8,#d7e0e7_42%,#c5d0d8_100%)] p-6'>
			<div className='mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[28px] border border-white/60 bg-white/75 shadow-[0_25px_80px_rgba(43,59,74,0.18)] backdrop-blur'>
				<div className='w-70 border-r border-slate-200/80 bg-white/70 px-4 py-5'>
					<div className='mb-8 flex items-center gap-3'>
						<div className='flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm'>
							<RiMegaphoneLine />
						</div>
						<div>
							<h4 className='mb-0 text-base font-semibold text-slate-800'>Telegram</h4>
						</div>
					</div>

					<nav className='space-y-2'>
						{menuItems.map(item => {
							const Icon = item.icon;
							const isActive = pathname === item.to;

							return (
								<NavLink
									key={item.to}
									to={item.to}
									className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium no-underline transition ${
										isActive
											? 'bg-slate-100 text-slate-900 shadow-[inset_3px_0_0_0_#0ea5e9]'
											: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
									}`}>
									<Icon className='text-lg' />
									<span>{item.label}</span>
								</NavLink>
							);
						})}
					</nav>
				</div>

				<div className='flex-1 bg-white/60 p-4 md:p-6'>
					<div className='h-full rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]'>
						<div className='mb-4 flex justify-end'>
							<Link
								to='/'
								aria-label='Asosiy menu'
								className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 no-underline transition hover:bg-slate-100 hover:text-slate-900'>
								<RiCloseLine className='text-xl' />
							</Link>
						</div>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Admin;
