import Header from './components/Header';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
// import Section3 from './components/Section3';

import Footer from './components/Footer';
import Today from './components/Today';

function App() {
	return (
		<div>
			<Header />
			<Section1 />
			<Section2 />
			{/* <Section3 /> */}
			<Footer />
			<Today />
		</div>
	);
}

export default App;
