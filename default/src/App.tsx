import { Routes, Route } from 'react-router-dom';

import Admin from './components/Pages/Admin';
import Settings from './components/Pages/Settings';

export default function App() {
	return (
		<div>
			<Routes>
				<Route path='/admin' element={<Admin />}>
					<Route path='/admin/settings' element={<Settings />} />
				</Route>
			</Routes>
		</div>
	);
}
