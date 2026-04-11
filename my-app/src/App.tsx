import Login from './components/Login';
import Chat from './components/Chat';
import Register from './firebase/Register';
import Userss from './firebase/Userss';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Navigate to='/login' />} />
				<Route path='/chat' element={<Chat />} />
				<Route path='/users' element={<Userss />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
