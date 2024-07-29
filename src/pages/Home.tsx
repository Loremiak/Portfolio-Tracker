import styled from 'styled-components';
import StyledDataGrid from '../components/StyledDataGrid';
import BoxContainer from '../components/box/BoxContainer';
import { useCryptocurrenciesList, useGlobalMarketData, useTrendingCoins } from '../services/api';
import { Button, Divider, Pagination, Typography } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { setSelectedCoins } from '../store/coinsSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import SelectOptions from '../components/SelectOptions';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Home = () => {
	const { isAuthenticated } = useAuth();

	const [coins, setCoins] = useState<GridRowSelectionModel>([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState('5');

	const dispatch = useAppDispatch();

	const { data: trendingData, isLoading: isCarouselDataLoading } = useTrendingCoins();

	const { data: coinList } = useCryptocurrenciesList(page, pageSize);

	const { data: globalMarketData, isLoading: isMarketDataLoading } = useGlobalMarketData();

	return (
		<div>
			<StyledHeaderContainer>
				<StyledHeader>Ceny kryptowalut według kapitalizacji rynkowej</StyledHeader>
				<Divider sx={{ borderBottomWidth: 2 }} color='#6eacda' />
			</StyledHeaderContainer>
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
						try {
							dispatch(setSelectedCoins(coins));
							toast.success('Waluty dodane pomyślnie!');
						} catch (error) {
							toast.error('Wystąpił problem z dodaniem wybranych walut');
							console.error(error);
						}
					}}>
					Dodaj zaznaczone waluty do portfolio ({coins.length})
				</Button>
			) : (
				<Typography variant='h6' color='gray'>
					{isAuthenticated
						? 'Zaznacz dowolne waluty aby dodać je do portfolio'
						: 'Zaloguj się aby móc dodać wybrane waluty do swojego portfolio'}
				</Typography>
			)}
			{coinList ? (
				<>
					<StyledDataGrid
						data={coinList}
						onRowSelectionModelChange={selected => setCoins(selected)}
						isPortfolioView={false}
					/>
					<PaginationContainer>
						<StyledPagination
							count={5}
							page={page}
							onChange={(_, page) => setPage(page)}
							color='primary'
							shape='rounded'
						/>
						<SelectOptions pageSize={pageSize} handleChange={event => setPageSize(event.target.value as string)} />
					</PaginationContainer>
				</>
			) : null}
		</div>
	);
};

export default Home;

const StyledHeaderContainer = styled.div`
	margin: 4rem 0;
	font-size: 2rem;
`;

const StyledHeader = styled.h1`
	font-size: 2rem;
	margin-bottom: 0.75rem;
`;

const StyledPagination = styled(Pagination)`
	display: flex;
	justify-content: center;
`;

const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 2rem;
`;
