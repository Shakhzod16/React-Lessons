import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'

function Register() {
	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

	const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/chat');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='card w-25'>
				<div className='card-header bg-dark text-white text-center'>Register</div>
				<div className='card-body'>
					<input
						value={email}
						onChange={e => setEmail(e.target.value)}
						type='email'
						className='form-control'
						id='email'
						placeholder='Email'
					/>

					<input
						value={password}
						onChange={e => setPassword(e.target.value)}
						type='password'
						className='form-control mt-2!'
						id='password'
						placeholder='Password'
					/>
				</div>
				<div className='card-footer text-center'>
					<button className='btn btn-primary w-100' onClick={handleRegister}>
						Register
					</button>
				</div>
			</div>
		</div>
	);
}

export default Register;
