import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalMuiStyles from './components/GlobalMuiStyles.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<GlobalMuiStyles />
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ToastContainer
					position='top-center'
					autoClose={2000}
					closeButton={false}
					limit={1}
					hideProgressBar={false}
					closeOnClick={true}
					pauseOnHover={true}
					theme='colored'
					transition={Bounce}
				/>
				<App />
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);
