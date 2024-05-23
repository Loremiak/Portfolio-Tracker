import { CircularProgress } from '@mui/material';
import styled from 'styled-components';
import handleBiggerValues from '../../helpers/handleBiggerValues';
import roundToTwoDecimalPlaces from '../../helpers/roundToTwoDecimalPlaces';
import { formatNumber } from '../../helpers/formatNumber';
import { GlobalMarketData } from '../../services/types';

const MarketDataList: React.FC<{ globalMarketData: GlobalMarketData; isLoading: boolean }> = ({
	globalMarketData,
	isLoading,
}) => {
	console.log(globalMarketData);
	return (
		<BasicInfoList>
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
				<StyledSpan $isMarketCapChangePositive={globalMarketData.market_cap_change_percentage_24h_usd > 0}>
					{' '}
					{isLoading ? (
						<CircularProgress size='13px' />
					) : (
						roundToTwoDecimalPlaces(globalMarketData.market_cap_change_percentage_24h_usd)
					)}
					%
				</StyledSpan>
			</li>
			<li>
				Wolumen: {isLoading ? <CircularProgress size='13px' /> : formatNumber(globalMarketData.total_volume.usd)} USD
			</li>
		</BasicInfoList>
	);
};

export default MarketDataList;

const BasicInfoList = styled.ul`
	display: flex;
	justify-content: space-between;
	list-style-type: none;
	padding: 0.5rem;
	margin: 0;
	background-color: lightgray;
	height: 18px;
`;

const StyledSpan = styled.span<{ $isMarketCapChangePositive: boolean }>`
	color: ${({ $isMarketCapChangePositive }) => ($isMarketCapChangePositive ? 'green' : 'red')};
	font-weight: bold;
`;
