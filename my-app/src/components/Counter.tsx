import { useReducer } from 'react';

type State = {
	count: number;
};

type Action = { type: 'PLUS' } | { type: 'MINUS' } | { type: 'RESET' } | { type: 'ADD'; payload: number };

const initialState: State = {
	count: 0,
};

function counterReducer(state: State, action: Action) {
	switch (action.type) {
		case 'PLUS':
			return { ...state, count: state.count + 1 };

		case 'MINUS':
			return { ...state, count: state.count - 1 };

		case 'RESET':
			return { ...state, count: 0 };

		case 'ADD':
			return { ...state, count: state.count + action.payload };

		default:
			return state;
	}
}

const Counter = () => {
	const [state, dispatch] = useReducer(counterReducer, initialState);

	const plus = () => {
		dispatch({ type: 'PLUS' });
	};
	const minus = () => {
		dispatch({ type: 'MINUS' });
	};
	const reset = () => {
		dispatch({ type: 'RESET' });
	};
	const add = (num: number) => {
		dispatch({ type: 'ADD', payload: num });
	};

	return (
		<div className='p-4'>
			<h1>{state.count}</h1>
			<button onClick={plus} className='btn btn-primary'>
				+
			</button>
			<button onClick={minus} className='btn btn-danger ml-2!'>
				-
			</button>
			<button onClick={reset} className='btn btn-danger ml-2!'>
				reset
			</button>
			<button onClick={() => add(10)} className='btn btn-danger ml-2!'>
				+10
			</button>
		</div>
	);
};

export default Counter;
