import { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const provider = new GoogleAuthProvider();

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const GoogleByEnter = async () => {
		try {
			await signInWithPopup(auth, provider);
			navigate('/chat');
		} catch (error) {
			console.log(error);
			alert('Login failed');
		}
	};

	const handleLogin = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/chat');
		} catch (error) {
			console.log(error);
			alert('Login failed');
		}
	};
	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='card w-25'>
				<div className='card-header bg-dark text-white text-center'>Login</div>
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
					<button className='btn btn-primary w-100' onClick={handleLogin}>
						Login
					</button>
					<button
						onClick={GoogleByEnter}
						className='btn btn-outline-danger w-100 mt-2! d-flex items-center gap-2 justify-center mb-0!'>
						{' '}
						<FcGoogle size={18} /> Google by enter
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
