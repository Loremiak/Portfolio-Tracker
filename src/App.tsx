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
		<FullViewContainer>
			<AppContainer>
				{!isAuthPage ? <Navbar /> : null}
				<Content>
					<Routes>
						<Route path='/' element={<Outlet />}>
							<Route index element={<Home />} />
							<Route path='/portfolio' element={<Portfolio />} />
							<Route path='/coin-details/:id' element={<CoinDetails />} />
							<Route path='/login' element={<Auth redirectPath='/' isLoginForm />} />
							<Route path='/register' element={<Auth redirectPath='/login' />} />
							<Route path='*' element={<>Error</>} />
						</Route>
					</Routes>
				</Content>
				{!isAuthPage ? <Footer /> : null}
			</AppContainer>
		</FullViewContainer>
	);
}

const FullViewContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: #eeeeee;
`;

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
