import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
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
				</Provider>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);
