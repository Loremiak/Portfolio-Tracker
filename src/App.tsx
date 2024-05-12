import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Portfolio from './pages/Portfolio';
import CoinDetails from './pages/CoinDetails';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route path='/'>
					<Route index element={<Home />} />
					<Route path='/portfolio' element={<Portfolio />} />
					<Route path='/coin-details/:id' element={<CoinDetails />} />

					{/* <Route path='about' element={<About />} />
					<Route path='dashboard' element={<Dashboard />} /> */}
					<Route path='*' element={<>Error</>} />
				</Route>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
