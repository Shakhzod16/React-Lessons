import { useState } from 'react';
import './App.css';
import Components from './assets/Components';
// import StudentForm from './assets/StudentForm';
// import Products from './assets/Products';
// import Users from './assets/Users';

function App() {
	const [show, setShow] = useState(false);
	return (
		<>
			{/* <Products /> */}
			{/* <Users /> */}
			{/* <StudentForm /> */}
			<div>
				<button onClick={() => setShow(true)}>show</button>
				<button
					className='ml-2 bg-black text-white'
					onClick={() => {
						setShow(false);
					}}>
					hide
				</button>
				{show ? <Components /> : null}
			</div>
		</>
	);
}

export default App;
