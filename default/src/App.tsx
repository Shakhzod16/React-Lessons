import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import OurTeam from './components/OurTeam';
import Portifolio from './components/Portifolio';

export default function App() {
	return (
		<>
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/team' element={<OurTeam />} />
				<Route path='/portfolio' element={<Portifolio />} />
			</Routes>
		</>
	);
}
