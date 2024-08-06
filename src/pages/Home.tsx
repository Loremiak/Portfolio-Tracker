import styled from 'styled-components';
import StyledDataGrid from '../components/dataGrid/StyledDataGrid';
import BoxContainer from '../components/box/BoxContainer';
import { useCryptocurrenciesList, useGlobalMarketData, useTrendingCoins } from '../services/api';
import { Button, Divider, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import SelectOptions from '../components/SelectOptions';
import useAuth from '../hooks/useAuth';
import { useUpdatePortfolioCoins } from '../services/firebaseApi';

const Home = () => {
	const { isAuthenticated } = useAuth();

	const [coins, setCoins] = useState<string[]>([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState('5');

	const { data: trendingData, isLoading: isCarouselDataLoading } = useTrendingCoins();

	const { data: coinList } = useCryptocurrenciesList(page, pageSize);

	const { data: globalMarketData, isLoading: isMarketDataLoading } = useGlobalMarketData();

	const updatePortfolioCoinsMutation = useUpdatePortfolioCoins();

	const updatePortfolioCoins = () => {
		updatePortfolioCoinsMutation.mutate(coins);
	};

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
				<Button variant='outlined' onClick={updatePortfolioCoins}>
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
						onRowSelectionModelChange={selected => setCoins(selected as string[])}
						isPortfolioView={false}
					/>
					<PaginationContainer>
						<StyledPagination
							count={5}
							page={page}
							onChange={(_, page) => {
								setPage(page);
							}}
							color='primary'
							shape='rounded'
						/>
						<SelectOptions
							pageSize={pageSize}
							handleChange={event => {
								setPage(1);
								setPageSize(event.target.value as string);
							}}
						/>
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
