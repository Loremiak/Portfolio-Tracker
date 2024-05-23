import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Portfolio from './pages/Portfolio';
import CoinDetails from './pages/CoinDetails';
import AuthView from './pages/AuthView';

function App() {
	const location = useLocation();
	const isAuthPage = location.pathname === '/login';

	return (
		<div className='App'>
			{!isAuthPage ? <Navbar /> : null}
			<Routes>
				<Route path='/' element={<Outlet />}>
					<Route index element={<Home />} />
					<Route path='/portfolio' element={<Portfolio />} />
					<Route path='/coin-details/:id' element={<CoinDetails />} />
					<Route path='/login' element={<AuthView />} />
					<Route path='*' element={<>Error</>} />
				</Route>
			</Routes>
			{!isAuthPage ? <Footer /> : null}
		</div>
	);
}

export default App;
