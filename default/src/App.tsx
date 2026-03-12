import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Admin from './components/Pages/Admin';
import Gruhlar from './components/Pages2/Gruhlar';
import Kanallar from './components/Pages2/Kanallar';
import Botlar from './components/Pages2/Botlar';
import Xabarlar from './components/Pages2/Xabarlar';

export default function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/admin' element={<Admin />}>
					<Route index element={<Navigate to='gruhlar' replace />} />
					<Route path='gruhlar' element={<Gruhlar />} />
					<Route path='kanallar' element={<Kanallar />} />
					<Route path='botlar' element={<Botlar />} />
					<Route path='xabarlar' element={<Xabarlar />} />
				</Route>
			</Routes>
		</div>
	);
}
