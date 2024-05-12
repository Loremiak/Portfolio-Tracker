import styled from 'styled-components';
import StyledDataGrid, { mockedMarketData } from '../components/StyledDataGrid';
import BoxContainer from '../components/box/BoxContainer';
import { useCryptocurrenciesList, useGlobalMarketData, useTrendingCoins } from '../services/api';

const Home = () => {
	const { data: trendingData } = useTrendingCoins();

	// const { data: CoinList } = useCryptocurrenciesList();

	const { data: globalMarketData } = useGlobalMarketData();

	return (
		<div>
			<StyledHeader>Ceny kryptowalut według kapitalizacji rynkowej</StyledHeader>
			{trendingData && globalMarketData ? (
				<BoxContainer coins={trendingData.coins} marketData={globalMarketData.data} />
			) : null}
			{mockedMarketData ? <StyledDataGrid data={mockedMarketData} /> : null}
		</div>
	);
};

export default Home;

const StyledHeader = styled.h1`
	margin: 2rem 0;
`;
