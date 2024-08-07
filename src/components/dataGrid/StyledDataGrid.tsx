import { DataGrid, gridClasses, GridRowSelectionModel, GridCallbackDetails } from '@mui/x-data-grid';
import { Coins, Transaction } from '../../services/types';
import { useState } from 'react';
import PortfolioHandleModal from '../modals/PortfolioHandleModal';
import useAuth from '../../hooks/useAuth';
import { createColumns } from './columnsConfig';
import { createRows } from './rowsConfig';
import ConfirmModal from '../modals/ConfirmModal';
import { DocumentData } from 'firebase/firestore';
import { Box } from '@mui/system';

// export const mockedMarketData = [
// 	{
// 		id: 'bitcoin',
// 		symbol: 'btc',
// 		name: 'Bitcoin',
// 		image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
// 		current_price: 66512,
// 		market_cap: 1309151192256,
// 		market_cap_rank: 1,
// 		fully_diluted_valuation: 1396340416676,
// 		total_volume: 27264900575,
// 		high_24h: 66795,
// 		low_24h: 64565,
// 		price_change_24h: 1647.05,
// 		price_change_percentage_24h: 2.53921,
// 		market_cap_change_24h: 36019673037,
// 		market_cap_change_percentage_24h: 2.82922,
// 		circulating_supply: 19688734,
// 		total_supply: 21000000,
// 		max_supply: 21000000,
// 		ath: 73738,
// 		ath_change_percentage: -9.82606,
// 		ath_date: '2024-03-14T07:10:36.635Z',
// 		atl: 67.81,
// 		atl_change_percentage: 97958.371,
// 		atl_date: '2013-07-06T00:00:00.000Z',
// 		roi: null,
// 		last_updated: '2024-04-22T21:03:52.101Z',
// 	},
// 	{
// 		id: 'ethereum',
// 		symbol: 'eth',
// 		name: 'Ethereum',
// 		image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
// 		current_price: 3188.38,
// 		market_cap: 383266512345,
// 		market_cap_rank: 2,
// 		fully_diluted_valuation: 383266512345,
// 		total_volume: 12045347151,
// 		high_24h: 3232.07,
// 		low_24h: 3134.8,
// 		price_change_24h: 31.46,
// 		price_change_percentage_24h: 0.99646,
// 		market_cap_change_24h: 5119044634,
// 		market_cap_change_percentage_24h: 1.35372,
// 		circulating_supply: 120072366.963471,
// 		total_supply: 120072366.963471,
// 		max_supply: null,
// 		ath: 4878.26,
// 		ath_change_percentage: -34.60112,
// 		ath_date: '2021-11-10T14:24:19.604Z',
// 		atl: 0.432979,
// 		atl_change_percentage: 736732.25931,
// 		atl_date: '2015-10-20T00:00:00.000Z',
// 		roi: {
// 			times: 63.119173294136026,
// 			currency: 'btc',
// 			percentage: 6311.917329413603,
// 		},
// 		last_updated: '2024-04-22T21:04:16.227Z',
// 	},
// 	{
// 		id: 'tether',
// 		symbol: 'usdt',
// 		name: 'Tether',
// 		image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
// 		current_price: 1.001,
// 		market_cap: 109843327858,
// 		market_cap_rank: 3,
// 		fully_diluted_valuation: 109843327858,
// 		total_volume: 43930512796,
// 		high_24h: 1.003,
// 		low_24h: 0.997978,
// 		price_change_24h: 0.00034333,
// 		price_change_percentage_24h: 0.03433,
// 		market_cap_change_24h: 6291562,
// 		market_cap_change_percentage_24h: 0.00573,
// 		circulating_supply: 109840251114.814,
// 		total_supply: 109840251114.814,
// 		max_supply: null,
// 		ath: 1.32,
// 		ath_change_percentage: -24.37841,
// 		ath_date: '2018-07-24T00:00:00.000Z',
// 		atl: 0.572521,
// 		atl_change_percentage: 74.76139,
// 		atl_date: '2015-03-02T00:00:00.000Z',
// 		roi: null,
// 		last_updated: '2024-04-22T21:00:16.542Z',
// 	},
// ];

type StyledDataGridProps = {
	data: Coins;
	onRowSelectionModelChange:
		| ((rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails) => void)
		| undefined;
	isPortfolioView: boolean;
	onTransactionSubmit?: (coin: string, amount: number, price: number) => void;
	onTransactionRemove?: (coin: string) => void;
	transactions?: Transaction[] | DocumentData[];
};

const StyledDataGrid: React.FC<StyledDataGridProps> = ({
	data,
	onRowSelectionModelChange,
	isPortfolioView,
	onTransactionSubmit,
	onTransactionRemove,
	transactions = [],
}) => {
	const [openModal, setOpenModal] = useState(false);
	const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
	const [coinToDelete, setCoinToDelete] = useState<string | null>(null);

	const [selectedCoin, setSelectedCoin] = useState<string>('');

	const { isAuthenticated } = useAuth();

	const handleAddButtonClick = (rowId: string) => {
		setSelectedCoin(rowId);
		setOpenModal(true);
	};

	const handleDeleteButtonClick = (coin: string) => {
		setCoinToDelete(coin);
		setOpenConfirmationModal(true);
	};

	const rows = createRows(data, transactions);
	const columns = createColumns(handleAddButtonClick, transactions, handleDeleteButtonClick);

	return (
		<>
			<PortfolioHandleModal
				open={openModal}
				onClose={() => setOpenModal(false)}
				coin={selectedCoin}
				onSubmit={(amount, price) => {
					if (onTransactionSubmit) {
						onTransactionSubmit(selectedCoin, amount, price);
					}
					setOpenModal(false);
				}}
			/>
			<ConfirmModal
				open={openConfirmationModal}
				onClose={() => setOpenConfirmationModal(false)}
				title='Czy na pewno chcesz usunąć tę transakcję?'
				onConfirm={() => {
					if (coinToDelete && onTransactionRemove) {
						onTransactionRemove(coinToDelete);
					}
					setOpenConfirmationModal(false);
					setCoinToDelete(null);
				}}
			/>
			<Box margin='1rem 0 3rem 0' width='100%' flex='1'>
				<DataGrid
					columnVisibilityModel={{
						addValue: isPortfolioView,
						removeValue: isPortfolioView,
						totalAmount: isPortfolioView,
						currentValue: isPortfolioView,
					}}
					rows={rows}
					columns={columns}
					checkboxSelection={isAuthenticated}
					pageSizeOptions={[]}
					hideFooterPagination
					disableRowSelectionOnClick
					autoHeight
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
						backgroundColor: 'white',
					}}
				/>
			</Box>
		</>
	);
};

export default StyledDataGrid;
