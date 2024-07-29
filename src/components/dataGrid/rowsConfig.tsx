import { GridRowsProp } from '@mui/x-data-grid';
import handleBiggerValues from '../../helpers/handleBiggerValues';
import roundToTwoDecimalPlaces from '../../helpers/roundToTwoDecimalPlaces';
import { Coins, Transaction } from '../../services/types';

export const createRows = (data: Coins, transactions?: Transaction[]): GridRowsProp =>
	data.map(
		({
			id,
			market_cap_rank,
			image,
			name,
			symbol,
			current_price,
			price_change_percentage_24h,
			total_volume,
			market_cap,
		}) => {
			const transaction = (transactions ? transactions : []).find(t => t.coin === id);

			return {
				id,
				col1: market_cap_rank,
				image,
				nameWithSymbol: `${name} ${symbol.toLocaleUpperCase()}`,
				currentPrice: `${handleBiggerValues(current_price)} USD`,
				dayChangeValue: roundToTwoDecimalPlaces(price_change_percentage_24h),
				totalVolume: `${handleBiggerValues(total_volume)} USD`,
				marketCap: `${handleBiggerValues(market_cap)} USD`,
				totalAmount: transaction ? transaction.amount : 0,
				currentValue: transaction ? `${handleBiggerValues(transaction.amount * current_price)} USD` : '0 USD',
			};
		}
	);
