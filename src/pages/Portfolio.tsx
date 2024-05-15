import styled from 'styled-components';
import StyledDataGrid from '../components/StyledDataGrid';
import { useCryptocurrenciesListByIds } from '../services/api';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectedCoins, setSelectedCoins } from '../store/coinsSlice';
import { Button } from '@mui/material';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useState } from 'react';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { compareArrays } from '../helpers/compareArrays';
import Bitcoin from '../assets/bitcoin.jpeg';

const mockedBTCETH = [
	{
		id: 'bitcoin',
		symbol: 'btc',
		name: 'Bitcoin',
		image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
		current_price: 61377,
		market_cap: 1210319713695,
		market_cap_rank: 1,
		fully_diluted_valuation: 1290360924749,
		total_volume: 11853312970,
		high_24h: 61458,
		low_24h: 60698,
		price_change_24h: 239.66,
		price_change_percentage_24h: 0.392,
		market_cap_change_24h: 4335354294,
		market_cap_change_percentage_24h: 0.35949,
		circulating_supply: 19697368,
		total_supply: 21000000,
		max_supply: 21000000,
		ath: 73738,
		ath_change_percentage: -16.83938,
		ath_date: '2024-03-14T07:10:36.635Z',
		atl: 67.81,
		atl_change_percentage: 90331.83837,
		atl_date: '2013-07-06T00:00:00.000Z',
		roi: null,
		last_updated: '2024-05-12T15:54:50.555Z',
	},
	{
		id: 'ethereum',
		symbol: 'eth',
		name: 'Ethereum',
		image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
		current_price: 2935.72,
		market_cap: 352855224265,
		market_cap_rank: 2,
		fully_diluted_valuation: 352855224265,
		total_volume: 5208652638,
		high_24h: 2939.79,
		low_24h: 2905.1,
		price_change_24h: 8.34,
		price_change_percentage_24h: 0.285,
		market_cap_change_24h: 879628917,
		market_cap_change_percentage_24h: 0.24991,
		circulating_supply: 120111216.190931,
		total_supply: 120111216.190931,
		max_supply: null,
		ath: 4878.26,
		ath_change_percentage: -39.8594,
		ath_date: '2021-11-10T14:24:19.604Z',
		atl: 0.432979,
		atl_change_percentage: 677488.48539,
		atl_date: '2015-10-20T00:00:00.000Z',
		roi: {
			times: 62.93702636225577,
			currency: 'btc',
			percentage: 6293.7026362255765,
		},
		last_updated: '2024-05-12T15:54:53.880Z',
	},
];

const Portfolio = () => {
	const [coinsToDelete, setCoinsToDelete] = useState<GridRowSelectionModel>([]);

	const dispatch = useAppDispatch();

	const selectedCoinsSelector = useAppSelector(selectedCoins);

	const { data: portfolioCoins, isError, isRefetchError } = useCryptocurrenciesListByIds(selectedCoinsSelector);

	console.log(selectedCoinsSelector);

	console.log('coinsToDelete', coinsToDelete);

	return (
		<PortfolioContainer>
			<StyledInfoContainer>
				<p>Twój portfel aktywów</p>
				<p>
					Możesz tutaj przeglądać twoje obecne portfolio oraz sprawdzać ile zarobiłeś. Jeżeli chcesz dodać więcej walut
					do portfolio to udaj się na stronę główną, zaznacz je a następnie kliknij przycik z dodaniem ich do portfolio.
				</p>
			</StyledInfoContainer>
			<h1>Twoje portfolio</h1>
			{portfolioCoins ? (
				<>
					<ButtonsContainer>
						<Button
							variant='outlined'
							disabled={!coinsToDelete.length}
							onClick={() => {
								const uniqueElements = compareArrays(selectedCoinsSelector, coinsToDelete as string[]);
								dispatch(setSelectedCoins(uniqueElements));
								console.log(uniqueElements);
							}}>
							Usuń zaznaczone waluty
						</Button>
						<Button variant='outlined' onClick={() => dispatch(setSelectedCoins([]))}>
							Usuń wszystkie waluty
						</Button>
					</ButtonsContainer>
					<StyledDataGrid
						onRowSelectionModelChange={selected => {
							console.log(selected);
							setCoinsToDelete(selected);
						}}
						data={portfolioCoins}
					/>
				</>
			) : (
				<MissingPortfolioCoins>
					{isError || isRefetchError ? 'error' : <img width={'300px'} src={Bitcoin} alt='btc' />}
				</MissingPortfolioCoins>
			)}
		</PortfolioContainer>
	);
};

const PortfolioContainer = styled.div`
	margin-bottom: 3rem;
`;

const StyledInfoContainer = styled.div`
	background-color: lightblue;
	padding: 0.5rem;
	margin-top: 2rem;
`;

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 2rem;
`;

const MissingPortfolioCoins = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 300px;
`;

export default Portfolio;
