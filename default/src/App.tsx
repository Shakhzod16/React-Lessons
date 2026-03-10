import { Routes, Route } from 'react-router-dom';
import Homes from './components/Pages/Homes';
import Todos from './components/Pages/Todos';

export default function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Homes />} />
				<Route path='/homes' element={<Homes />} />
				<Route path='/todos' element={<Todos />} />
				<Route path='/todos/:id' element={<Todos />} />
			</Routes>
		</div>
	);
}
