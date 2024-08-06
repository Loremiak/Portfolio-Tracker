import styled from 'styled-components';
import StyledDataGrid from '../components/dataGrid/StyledDataGrid';
import { useCryptocurrenciesListByIds } from '../services/api';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import ConfirmModal from '../components/modals/ConfirmModal';
import { Transaction } from '../services/types';
import { toast } from 'react-toastify';
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
import { DocumentData } from 'firebase/firestore';

const Portfolio = () => {
	const [coinsToDelete, setCoinsToDelete] = useState<string[]>([]);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [transactions, setTransactions] = useState<Transaction[] | DocumentData[]>([]);

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
		addOrUpdateTransaction.mutate(
			{ coin, amount, price },
			{
				onSuccess: () => {
					console.log('Transaction added or updated successfully');
				},
				onError: error => {
					console.error('Failed to add or update transaction:', error);
				},
			}
		);
		// setTransactions(prevTransactions => {
		// 	const existingTransaction = prevTransactions.find(transaction => transaction.coin === coin);

		// 	if (existingTransaction) {
		// 		toast.success('Pomyślnie edytowano portfolio');

		// 		return prevTransactions.map(transaction =>
		// 			transaction.coin === coin
		// 				? {
		// 						...transaction,
		// 						amount: transaction.amount + amount,
		// 						price: (transaction.amount * transaction.price + amount * price) / (transaction.amount + amount),
		// 						// eslint-disable-next-line no-mixed-spaces-and-tabs
		// 				  }
		// 				: transaction
		// 		);
		// 	} else {
		// 		toast.error('Wystąpił problem przy edycji portfolio');

		// 		return [...prevTransactions, { coin, amount, price }];
		// 	}
		// });
	};

	const handleTransactionRemove = (coin: string) => {
		console.log(coin);
		setTransactions(transactions.filter(transaction => transaction.coin !== coin));

		removeTransactionsByCoin.mutate(coin, {
			onSuccess: () => {
				toast.success(`Pomyślnie usunięto wszystkie transakcje związane z ${coin}`);
			},
			onError: error => {
				toast.error(`Wystąpił problem przy usuwaniu transakcji: ${error.message}`);
			},
		});
	};

	const totalValue = calculateTotalValue({ transactionsValue, portfolioCoins });
	const totalSpent = calculateTotalSpent(transactionsValue);

	// edit zamiast dodawania

	return (
		<PortfolioContainer>
			<StyledInfoContainer>
				<Typography>Twój portfel aktywów</Typography>
				<Typography>
					{selectedPortfolioCoins.length
						? 'Możesz tutaj przeglądać twoje obecne portfolio oraz sprawdzać ile zarobiłeś. Jeżeli chcesz dodać więcej walut do portfolio to udaj się na stronę główną, zaznacz je a następnie kliknij przycisk z dodaniem ich do portfolio.'
						: 'Aby móc śledzić wybrane waluty, udaj się na stronę główną, zaznacz je a następnie kliknij przycisk z dodaniem ich do portfolio.'}
				</Typography>
			</StyledInfoContainer>
			<h1>Twoje portfolio</h1>
			{portfolioCoins && selectedPortfolioCoins.length > 0 ? (
				<>
					<PortfolioValueData>
						<p>Suma wydatków: {totalValue.toFixed(2)} USD</p>
						<p>Obecne saldo: {totalValue.toFixed(2)} USD</p>
						<p>Całkowity zysk/strata: {totalValue - totalSpent} USD</p>
					</PortfolioValueData>
					<ButtonsContainer>
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
					</ButtonsContainer>
					<StyledDataGrid
						onRowSelectionModelChange={selected => setCoinsToDelete(selected as string[])}
						data={portfolioCoins}
						isPortfolioView={true}
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
		</PortfolioContainer>
	);
};

const PortfolioContainer = styled.div`
	margin-bottom: 3rem;
	max-width: 100%;
`;

const PortfolioValueData = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin: 1rem 0;
`;

const StyledInfoContainer = styled.div`
	background-color: lightblue;
	padding: 1rem;
	margin: 2rem 0;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 2rem;
`;

// const MissingPortfolioCoins = styled.div`
// 	width: 100%;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	height: 300px;
// `;

export default Portfolio;
