import { DocumentData } from 'firebase/firestore';
import { Coins } from '../services/types';

type calculateTotalValueProps = {
	transactionsValue: DocumentData[];
	portfolioCoins: Coins | undefined;
};

export const calculateTotalValue = ({ transactionsValue, portfolioCoins }: calculateTotalValueProps) =>
	transactionsValue.reduce((total, transaction) => {
		const coin = (portfolioCoins ? portfolioCoins : []).find(c => c.id === transaction.coin);

		if (coin) {
			total += transaction.amount * coin.current_price;
		}

		return total;
	}, 0);
