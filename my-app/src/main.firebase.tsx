import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import FirebaseApp from './FirebaseApp';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<FirebaseApp />
	</StrictMode>,
);
