import { CircularProgress, List, Typography } from '@mui/material';
import handleBiggerValues from '../../helpers/handleBiggerValues';
import roundToTwoDecimalPlaces from '../../helpers/roundToTwoDecimalPlaces';
import { formatNumber } from '../../helpers/formatNumber';
import { GlobalMarketData } from '../../services/types';

const MarketDataList: React.FC<{ globalMarketData: GlobalMarketData; isLoading: boolean }> = ({
	globalMarketData,
	isLoading,
}) => {
	return (
		<List
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				listStyleType: 'none',
				padding: '0.5rem',
				backgroundColor: '#6eacda',
				height: '38px',
			}}>
			<li>
				Waluty:
				<span>
					{' '}
					{isLoading ? <CircularProgress size='13px' /> : handleBiggerValues(globalMarketData.active_cryptocurrencies)}
				</span>
			</li>
			<li>
				Giełdy:
				<span> {isLoading ? <CircularProgress size='13px' /> : handleBiggerValues(globalMarketData.markets)}</span>
			</li>
			<li>
				Kapitalizacja rynkowa:{' '}
				<span>
					{isLoading ? <CircularProgress size='13px' /> : formatNumber(globalMarketData.total_market_cap.usd)}
				</span>{' '}
				USD
				<Typography
					component='span'
					fontWeight='bold'
					color={globalMarketData.market_cap_change_percentage_24h_usd > 0 ? 'green' : 'red'}>
					{' '}
					{isLoading ? (
						<CircularProgress size='13px' />
					) : (
						roundToTwoDecimalPlaces(globalMarketData.market_cap_change_percentage_24h_usd)
					)}
					%
				</Typography>
			</li>
			<li>
				Wolumen: {isLoading ? <CircularProgress size='13px' /> : formatNumber(globalMarketData.total_volume.usd)} USD
			</li>
		</List>
	);
};

export default MarketDataList;
