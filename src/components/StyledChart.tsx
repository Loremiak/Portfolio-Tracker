import { Line } from 'react-chartjs-2';

import { Chart, registerables } from 'chart.js';
import { ChartData } from '../services/types';
Chart.register(...registerables);

const StyledChart: React.FC<ChartData> = ({ prices }) => {
	return (
		<Line
			data={{
				labels: prices.map(coin => {
					const date = new Date(coin[0]);
					const time = date.toLocaleString(navigator.language, { hour: '2-digit', minute: '2-digit' });
					return time;
				}),
				datasets: [
					{
						data: prices.map(coin => coin[1]),
						label: 'Wartość',
						borderColor: '#6EACDA',
					},
				],
			}}
			options={{
				elements: {
					point: {
						radius: 1,
					},
				},
				plugins: {
					legend: { display: false },
				},
			}}
			height={175}
		/>
	);
};

export default StyledChart;
