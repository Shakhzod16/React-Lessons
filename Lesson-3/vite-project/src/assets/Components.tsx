import { useEffect } from 'react';

function Components() {
	useEffect(() => {
		console.log('componet tugildi');

		return () => {
			console.log('componet oldi');
		};
	});
	return <div>My Componet</div>;
}

export default Components;
