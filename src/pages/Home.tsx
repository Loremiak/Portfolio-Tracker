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

	const dispatch = useAppDispatch();

	const { data: trendingData, isLoading: isCarouselDataLoading } = useTrendingCoins();

	const { data: coinList } = useCryptocurrenciesList();

	const { data: globalMarketData, isLoading: isMarketDataLoading } = useGlobalMarketData();

	console.log('trendingData', trendingData, 'globalMarketData', globalMarketData, 'coinList', coinList);

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
						console.log('click');
						dispatch(setSelectedCoins(coins));
					}}>
					Dodaj zaznaczone waluty do portfolio ({coins.length})
				</Button>
			) : (
				<Typography variant='h6' color='gray'>
					Zaznacz dowolne waluty aby dodać je do portfolio
				</Typography>
			)}

			<StyledDataGrid
				data={coinList ?? []}
				onRowSelectionModelChange={selected => {
					setCoins(selected);
					console.log(selected);
				}}
				isPortfolioView={false}
			/>
		</div>
	);
};

export default Home;

const StyledHeader = styled.h1`
	margin: 2rem 0;
`;
