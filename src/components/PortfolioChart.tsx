import { PieChart } from '@mui/x-charts/PieChart';
import { Transaction } from '../services/types';

const PortfolioChart = ({ transactions }: { transactions: Transaction[] }) => {
	const data = transactions.map(({ amount, coin, price }) => {
		const value = Number((amount * price).toFixed(2));

		return {
			id: coin,
			value: value,
			label: `${coin}: ${value} USD`,
		};
	});

	return (
		<PieChart
			series={[
				{
					data,
					highlightScope: { faded: 'global', highlighted: 'item' },
					faded: { innerRadius: 10, additionalRadius: -10, color: 'gray' },
				},
			]}
			height={200}
            width={800}
		/>
	);
};

export default PortfolioChart;
