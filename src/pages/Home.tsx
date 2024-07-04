import styled from 'styled-components';
import StyledDataGrid from '../components/StyledDataGrid';
import BoxContainer from '../components/box/BoxContainer';
import { useCryptocurrenciesList, useGlobalMarketData, useTrendingCoins } from '../services/api';
import { Button, Typography } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { setSelectedCoins } from '../store/coinsSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

const Home = () => {
	const [coins, setCoins] = useState<GridRowSelectionModel>([]);
	// const [page, setPage] = useState(1);

	const dispatch = useAppDispatch();

	const { data: trendingData, isLoading: isCarouselDataLoading } = useTrendingCoins();

	const { data: coinList } = useCryptocurrenciesList();

	const { data: globalMarketData, isLoading: isMarketDataLoading } = useGlobalMarketData();

	// console.log('trendingData', trendingData, 'globalMarketData', globalMarketData, 'coinList', coinList);

	return (
		<div>
			<StyledHeader>Ceny kryptowalut według kapitalizacji rynkowej</StyledHeader>
			{trendingData && globalMarketData ? (
				<BoxContainer
					coins={trendingData}
					marketData={globalMarketData}
					isCarouselDataLoading={isCarouselDataLoading}
					isMarketDataLoading={isMarketDataLoading}
				/>
			) : null}
			{coins.length > 0 ? (
				<Button
					variant='outlined'
					onClick={() => {
						dispatch(setSelectedCoins(coins));
					}}>
					Dodaj zaznaczone waluty do portfolio ({coins.length})
				</Button>
			) : (
				<Typography variant='h6' color='gray'>
					Zaznacz dowolne waluty aby dodać je do portfolio
				</Typography>
			)}
			{coinList ? (
				<StyledDataGrid
					data={coinList}
					onRowSelectionModelChange={selected => setCoins(selected)}
					isPortfolioView={false}
				/>
			) : null}
			{/* <StyledPagination count={5} page={page} onChange={(_, page) => setPage(page)} color='primary' shape='rounded' /> */}
		</div>
	);
};

export default Home;

const StyledHeader = styled.h1`
	margin: 2rem 0;
`;

// const StyledPagination = styled(Pagination)`
// 	display: flex;
// 	justify-content: center;
// `;
