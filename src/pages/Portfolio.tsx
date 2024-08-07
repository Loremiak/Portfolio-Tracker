import StyledDataGrid from '../components/dataGrid/StyledDataGrid';
import { useCryptocurrenciesListByIds } from '../services/api';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import ConfirmModal from '../components/modals/ConfirmModal';
import StyledLink from '../components/StyledLink';
import { calculateTotalValue } from '../helpers/calculateTotalValue';
import { calculateTotalSpent } from '../helpers/calculateTotalSpent';
import {
	useRemoveTransactionsByCoin,
	usePortfolioCoins,
	useTransactions,
	useRemovePortfolioCoins,
	useAddOrUpdateTransaction,
} from '../services/firebaseApi';
import { Box } from '@mui/system';

const Portfolio = () => {
	const [coinsToDelete, setCoinsToDelete] = useState<string[]>([]);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	const { data: transactionsValue = [] } = useTransactions();
	const { data: selectedPortfolioCoins = [] } = usePortfolioCoins();
	const { data: portfolioCoins } = useCryptocurrenciesListByIds(selectedPortfolioCoins);

	const removePortfolioCoinsMutation = useRemovePortfolioCoins();
	const addOrUpdateTransaction = useAddOrUpdateTransaction();
	const removeTransactionsByCoin = useRemoveTransactionsByCoin();

	console.log('portfolioCoinsValue', selectedPortfolioCoins, 'transactionsValue', transactionsValue);

	const onConfirmModal = () => {
		if (coinsToDelete.length) {
			removePortfolioCoinsMutation.mutate(coinsToDelete);
		} else {
			removePortfolioCoinsMutation.mutate(undefined);
		}

		setIsConfirmModalOpen(false);
		setCoinsToDelete([]);
	};

	const handleTransactionSubmit = (coin: string, amount: number, price: number) => {
		addOrUpdateTransaction.mutate({ coin, amount, price });
	};

	const handleTransactionRemove = (coin: string) => {
		removeTransactionsByCoin.mutate(coin);
	};

	const totalValue = calculateTotalValue({ transactionsValue, portfolioCoins });
	const totalSpent = calculateTotalSpent(transactionsValue);

	// edit zamiast dodawania

	return (
		<Box maxWidth='100%' marginBottom='3rem'>
			<Box display='flex' flexDirection='column' gap='1.5rem' margin='2rem 0' padding='1rem' bgcolor='lightblue'>
				<Typography>Twój portfel aktywów</Typography>
				<Typography>
					{selectedPortfolioCoins.length
						? 'Możesz tutaj przeglądać twoje obecne portfolio oraz sprawdzać ile zarobiłeś. Jeżeli chcesz dodać więcej walut do portfolio to udaj się na stronę główną, zaznacz je a następnie kliknij przycisk z dodaniem ich do portfolio.'
						: 'Aby móc śledzić wybrane waluty, udaj się na stronę główną, zaznacz je a następnie kliknij przycisk z dodaniem ich do portfolio.'}
				</Typography>
			</Box>
			<h1>Twoje portfolio</h1>
			{portfolioCoins && selectedPortfolioCoins.length > 0 ? (
				<>
					<Box display='flex' flexDirection='column' gap='1rem' margin='1rem 0'>
						<p>Suma wydatków: {totalValue.toFixed(2)} USD</p>
						<p>Obecne saldo: {totalValue.toFixed(2)} USD</p>
						<p>Całkowity zysk/strata: {totalValue - totalSpent} USD</p>
					</Box>
					<Box display='flex' flexDirection='row' gap='2rem'>
						<Button variant='outlined' disabled={!coinsToDelete.length} onClick={() => setIsConfirmModalOpen(true)}>
							Usuń zaznaczone waluty
						</Button>
						<Button variant='outlined' onClick={() => setIsConfirmModalOpen(true)}>
							Usuń wszystkie waluty
						</Button>
						<ConfirmModal
							open={isConfirmModalOpen}
							onClose={() => setIsConfirmModalOpen(false)}
							title='Czy na pewno chcesz usunąć wybrane waluty?'
							onConfirm={onConfirmModal}
						/>
					</Box>
					<StyledDataGrid
						onRowSelectionModelChange={selected => setCoinsToDelete(selected as string[])}
						data={portfolioCoins}
						isPortfolioView
						onTransactionSubmit={handleTransactionSubmit}
						onTransactionRemove={handleTransactionRemove}
						transactions={transactionsValue}
					/>
				</>
			) : (
				<StyledLink
					label='Udaj się na stronę główną aby dodać wybrane waluty do portfolio'
					marginTop='1.5rem'
					color='#6EACDA'
					fontWeight='bolder'
				/>
			)}
			<Box display='flex' flexDirection='row' gap='2rem'></Box>
		</Box>
	);
};

export default Portfolio;
