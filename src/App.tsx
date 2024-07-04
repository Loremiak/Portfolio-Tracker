import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Portfolio from './pages/Portfolio';
import CoinDetails from './pages/CoinDetails';
import styled from 'styled-components';
import Auth from './components/Auth';

function App() {
	const location = useLocation();
	const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

	return (
		<AppContainer>
			{!isAuthPage ? <Navbar /> : null}
			<Content>
				<Routes>
					<Route path='/' element={<Outlet />}>
						<Route index element={<Home />} />
						<Route path='/portfolio' element={<Portfolio />} />
						<Route path='/coin-details/:id' element={<CoinDetails />} />
						<Route path='/login' element={<Auth header='Zaloguj się' redirectPath='/' isLoginForm />} />
						<Route path='/register' element={<Auth header='Zarejestruj się' redirectPath='/' />} />
						<Route path='*' element={<>Error</>} />
					</Route>
				</Routes>
			</Content>
			{!isAuthPage ? <Footer /> : null}
		</AppContainer>
	);
}

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	max-width: 1270px;
	margin: 0 auto;
	position: relative;
`;

const Content = styled.div`
	flex: 1;
`;

export default App;
