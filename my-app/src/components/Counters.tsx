import { addTen, decriment, increment, reset } from '../reducers/counterSlice';
import { useAppDispatch, useAppSelector } from '../reducers/hooks';

const Counters = () => {
	const dispatch = useAppDispatch();
	const { count } = useAppSelector(state => state.counter);

	const handlePlus = () => {
		dispatch(increment());
	};
	const handleMinus = () => {
		dispatch(decriment());
	};
	const handleReset = () => {
		dispatch(reset());
	};
	const handleAdd = () => {
		dispatch(addTen(10));
	};

	return (
		<div className='p-6 gap-2!'>
			<h1>{count}</h1>
			<button onClick={handlePlus} className='btn btn-primary'>
				+
			</button>
			<button onClick={handleMinus} className='btn btn-danger my-2'>
				-
			</button>
			<button onClick={handleReset} className='btn btn-danger'>
				reset
			</button>
			<button onClick={handleAdd} className='btn btn-dark'>
				{' '}
				+10
			</button>
		</div>
	);
};
export default Counters;
