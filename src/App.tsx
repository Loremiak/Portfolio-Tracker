import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Portfolio from './pages/Portfolio';
import CoinDetails from './pages/CoinDetails';
import Auth from './pages/Auth';
import { ResetPassword } from './pages/ResetPassword';
import useAuth from './hooks/useAuth';
import Error from './components/Error';
import { Box } from '@mui/system';

function App() {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/reset-password';

    return (
        <Box width="100%" height="100%" bgcolor="#eeeeee">
            <Box display="flex" flexDirection="column" minHeight="100vh" maxWidth="1270px" margin="0 auto" position="relative">
                {!isAuthPage ? <Navbar /> : null}
                <Box flex="1">
                    <Routes>
                        <Route path="/" element={<Outlet />}>
                            <Route index element={<Home />} />
                            {isAuthenticated ? <Route path="/portfolio" element={<Portfolio />} /> : null}
                            <Route path="/coin-details/:id" element={<CoinDetails />} />
                            <Route path="/login" element={<Auth isLoginForm />} />
                            <Route path="/register" element={<Auth />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="*" element={<Error />} />
                        </Route>
                    </Routes>
                </Box>
                {!isAuthPage ? <Footer /> : null}
            </Box>
        </Box>
    );
}

export default App;
