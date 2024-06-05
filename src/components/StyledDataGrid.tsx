import {
	GridRowsProp,
	GridColDef,
	DataGrid,
	gridClasses,
	GridRowSelectionModel,
	GridCallbackDetails,
} from '@mui/x-data-grid';
import styled from 'styled-components';
import roundToTwoDecimalPlaces from '../helpers/roundToTwoDecimalPlaces';
import handleBiggerValues from '../helpers/handleBiggerValues';
import { Link } from 'react-router-dom';
import { Coins, Transaction } from '../services/types';
import { Button } from '@mui/material';
import { useState } from 'react';
import PortfolioHandleModal from './modals/PortfolioHandleModal';

export const mockedMarketData = [
	{
		id: 'bitcoin',
		symbol: 'btc',
		name: 'Bitcoin',
		image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
		current_price: 66512,
		market_cap: 1309151192256,
		market_cap_rank: 1,
		fully_diluted_valuation: 1396340416676,
		total_volume: 27264900575,
		high_24h: 66795,
		low_24h: 64565,
		price_change_24h: 1647.05,
		price_change_percentage_24h: 2.53921,
		market_cap_change_24h: 36019673037,
		market_cap_change_percentage_24h: 2.82922,
		circulating_supply: 19688734,
		total_supply: 21000000,
		max_supply: 21000000,
		ath: 73738,
		ath_change_percentage: -9.82606,
		ath_date: '2024-03-14T07:10:36.635Z',
		atl: 67.81,
		atl_change_percentage: 97958.371,
		atl_date: '2013-07-06T00:00:00.000Z',
		roi: null,
		last_updated: '2024-04-22T21:03:52.101Z',
	},
	{
		id: 'ethereum',
		symbol: 'eth',
		name: 'Ethereum',
		image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
		current_price: 3188.38,
		market_cap: 383266512345,
		market_cap_rank: 2,
		fully_diluted_valuation: 383266512345,
		total_volume: 12045347151,
		high_24h: 3232.07,
		low_24h: 3134.8,
		price_change_24h: 31.46,
		price_change_percentage_24h: 0.99646,
		market_cap_change_24h: 5119044634,
		market_cap_change_percentage_24h: 1.35372,
		circulating_supply: 120072366.963471,
		total_supply: 120072366.963471,
		max_supply: null,
		ath: 4878.26,
		ath_change_percentage: -34.60112,
		ath_date: '2021-11-10T14:24:19.604Z',
		atl: 0.432979,
		atl_change_percentage: 736732.25931,
		atl_date: '2015-10-20T00:00:00.000Z',
		roi: {
			times: 63.119173294136026,
			currency: 'btc',
			percentage: 6311.917329413603,
		},
		last_updated: '2024-04-22T21:04:16.227Z',
	},
	{
		id: 'tether',
		symbol: 'usdt',
		name: 'Tether',
		image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
		current_price: 1.001,
		market_cap: 109843327858,
		market_cap_rank: 3,
		fully_diluted_valuation: 109843327858,
		total_volume: 43930512796,
		high_24h: 1.003,
		low_24h: 0.997978,
		price_change_24h: 0.00034333,
		price_change_percentage_24h: 0.03433,
		market_cap_change_24h: 6291562,
		market_cap_change_percentage_24h: 0.00573,
		circulating_supply: 109840251114.814,
		total_supply: 109840251114.814,
		max_supply: null,
		ath: 1.32,
		ath_change_percentage: -24.37841,
		ath_date: '2018-07-24T00:00:00.000Z',
		atl: 0.572521,
		atl_change_percentage: 74.76139,
		atl_date: '2015-03-02T00:00:00.000Z',
		roi: null,
		last_updated: '2024-04-22T21:00:16.542Z',
	},
];

const StyledDataGrid: React.FC<{
	data: Coins;
	onRowSelectionModelChange?:
		| ((rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails) => void)
		| undefined;
	isPortfolioView: boolean;
	onTransactionSubmit?: (coin: string, amount: number, price: number, isAddition?: boolean) => void;
	transactions?: Transaction[];
}> = ({ data, onRowSelectionModelChange, isPortfolioView, onTransactionSubmit, transactions }) => {
	const [openModal, setOpenModal] = useState(false);
	const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
	const [isAdding, setIsAdding] = useState(true);

	// const getHoldings = (coin: string) => {
	// 	const coinTransactions = (transactions ? transactions : []).filter(transaction => transaction.coin === coin);
	// 	const totalAmount = coinTransactions.reduce((total, transaction) => total + transaction.amount, 0);
	// 	const currentCoinData = data.find(c => c.id === coin);
	// 	const currentValue = currentCoinData ? totalAmount * currentCoinData.current_price : 0;

	// 	return { totalAmount, currentValue };
	// };

	const rows: GridRowsProp = data.map(
		({
			id,
			market_cap_rank,
			image,
			name,
			symbol,
			current_price,
			price_change_percentage_24h,
			total_volume,
			market_cap,
		}) => {
			const transaction = (transactions ? transactions : []).find(t => t.coin === id);
			// const holdings = getHoldings(id);
			console.log('holding', transaction);

			return {
				id,
				col1: market_cap_rank,
				image,
				nameWithSymbol: `${name} ${symbol.toLocaleUpperCase()}`,
				currentPrice: `${handleBiggerValues(current_price)} USD`,
				dayChangeValue: roundToTwoDecimalPlaces(price_change_percentage_24h),
				totalVolume: `${handleBiggerValues(total_volume)} USD`,
				marketCap: `${handleBiggerValues(market_cap)} USD`,
				lastSevenDays: name,
				// totalAmount: handleBiggerValues(holdings.totalAmount),
				// currentValue: `${holdings.currentValue.toFixed(2)} USD`,
				totalAmount: transaction ? transaction.amount : 0,
				currentValue: transaction ? `${handleBiggerValues(transaction.amount * current_price)} USD` : '0 USD',
			};
		}
	);

	const columns: GridColDef[] = [
		{ field: 'col1', headerName: '#', width: 50, resizable: false, disableColumnMenu: true },
		{
			field: 'image',
			headerName: '',
			width: 25,
			resizable: false,
			hideSortIcons: true,
			disableColumnMenu: true,
			disableReorder: true,
			sortable: false,
			renderCell: params => <StyledImg src={params.value} width='30px' />,
		},
		{
			field: 'nameWithSymbol',
			headerName: 'Waluta',
			width: 130,
			resizable: false,
			disableColumnMenu: true,
			renderCell: params => <StyledLink to={`/coin-details/${params.id}`}>{params.value}</StyledLink>,
		},
		{
			field: 'currentPrice',
			headerName: 'Kurs',
			width: 120,
			resizable: false,
			disableColumnMenu: true,
		},
		{
			field: 'dayChangeValue',
			headerName: '24h',
			width: 80,
			resizable: false,
			disableColumnMenu: true,
			renderCell: params => (
				<StyledSpan $isPriceChangePositive={params.value > 0}>
					{params.value > 0 ? `+${params.value}` : `${params.value}`}%
				</StyledSpan>
			),
		},
		{ field: 'totalVolume', headerName: 'Wolumen 24h', width: 200, resizable: false, disableColumnMenu: true },
		{ field: 'marketCap', headerName: 'Kapitalizacja rynkowa', width: 210, resizable: false, disableColumnMenu: true },
		{
			field: 'lastSevenDays',
			headerName: 'Ostatnie 7 dni',
			width: 170,
			resizable: false,
			disableColumnMenu: true,
			sortable: false,
		},
		{
			field: 'totalAmount',
			headerName: 'Ilość',
			width: 70,
			resizable: false,
			disableColumnMenu: true,
		},
		{
			field: 'currentValue',
			headerName: 'Wartość',
			width: 125,
			resizable: false,
			disableColumnMenu: true,
		},
		{
			field: 'addValue',
			headerName: 'Dodaj',
			width: 60,
			resizable: false,
			disableColumnMenu: true,
			sortable: false,
			renderCell: params => {
				console.log(params.id);
				return (
					<>
						<Button
							onClick={() => {
								console.log('params.row.id', params.row.id);
								setSelectedCoin(params.row.id);
								setOpenModal(true);
							}}>
							+
						</Button>
						<PortfolioHandleModal
							open={openModal}
							onClose={() => setOpenModal(false)}
							coin={selectedCoin || ''}
							onSubmit={(amount, price) => {
								if (selectedCoin && onTransactionSubmit) {
									onTransactionSubmit(selectedCoin, amount, price);
									console.log(selectedCoin, amount, price);
								}
								setOpenModal(false);
							}}
						/>
					</>
				);
			},
		},
		{
			field: 'removeValue',
			headerName: 'Usuń',
			width: 60,
			resizable: false,
			disableColumnMenu: true,
			sortable: false,
			renderCell: () => <Button>-</Button>,
		},
	];

	return (
		<DataGridContainer>
			<DataGrid
				columnVisibilityModel={{
					addValue: isPortfolioView,
					removeValue: isPortfolioView,
					totalAmount: isPortfolioView,
					currentValue: isPortfolioView,
					lastSevenDays: !isPortfolioView,
				}}
				rows={rows}
				columns={columns}
				checkboxSelection
				pageSizeOptions={[]}
				hideFooterPagination
				disableRowSelectionOnClick
				onRowSelectionModelChange={onRowSelectionModelChange}
				sx={{
					[`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
						outline: 'none',
					},
					[`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
						outline: 'none',
					},
					[`& .${gridClasses.footerContainer}`]: {
						display: 'none',
					},
				}}
			/>
		</DataGridContainer>
	);
};

export default StyledDataGrid;

const DataGridContainer = styled.div`
	margin: 1rem 0 3rem 0;
	height: 300px;
	width: 100%;
`;

const StyledSpan = styled.span<{ $isPriceChangePositive: boolean }>`
	color: ${({ $isPriceChangePositive }) => ($isPriceChangePositive ? 'green' : 'red')};
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
	padding: 1rem 0;
`;

const StyledImg = styled.img`
	vertical-align: middle;
`;
