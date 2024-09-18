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
	const [selectedTransaction, setSelectedTransaction] = useState<Transaction | DocumentData | undefined>(undefined);
	const [currentPrice, setCurrentPrice] = useState(0);
	const [selectedCoin, setSelectedCoin] = useState('');

	const { isAuthenticated } = useAuth();

	const handleAddButtonClick = (rowId: string) => {
		setSelectedCoin(rowId);

		const existingTransaction = transactions.find(transaction => transaction.coin === rowId);
		setSelectedTransaction(existingTransaction);

		const selectedCurrency = data.find(coin => coin.id === rowId);

		if (selectedCurrency) {
			setCurrentPrice(selectedCurrency.current_price);
		}

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
				transaction={selectedTransaction}
				currentPrice={currentPrice}
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
				title='Czy na pewno chcesz usunąć tą transakcję?'
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
