import { NavLink } from 'react-router-dom';

export default function Navbar() {
	const linkClass = ({ isActive }: { isActive: boolean }) =>
		isActive ? 'nav-link text-warning fw-bold border-bottom border-warning' : 'nav-link text-white';

	return (
		<nav className='navbar navbar-expand-lg bg-dark px-4'>
			<div className='navbar-nav gap-4'>
				<NavLink to='/' className={linkClass}>
					Home
				</NavLink>
				<NavLink to='/about' className={linkClass}>
					About
				</NavLink>
				<NavLink to='/contact' className={linkClass}>
					Contact
				</NavLink>
				<NavLink to='/team' className={linkClass}>
					Team
				</NavLink>
				<NavLink to='/portfolio' className={linkClass}>
					Portfolio
				</NavLink>
			</div>
		</nav>
	);
}
