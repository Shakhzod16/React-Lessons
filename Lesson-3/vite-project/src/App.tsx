import './App.css';
import { Routes, Route } from 'react-router-dom';
import Todo1 from './components/Todo1';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Todo1 />} />
		</Routes>
	);
}

export default App;
