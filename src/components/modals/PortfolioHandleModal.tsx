import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { Transaction } from '../../services/types';
import { DocumentData } from 'firebase/firestore';

interface PortfolioHandleModal {
	open: boolean;
	onClose: () => void;
	onSubmit: (amount: number, price: number) => void;
	coin: string;
	currentPrice: number;
	transaction?: DocumentData | Transaction;
}

const PortfolioHandleModal: React.FC<PortfolioHandleModal> = ({
	open,
	onClose,
	onSubmit,
	coin,
	currentPrice,
	transaction,
}) => {
	const [amount, setAmount] = useState<number>(transaction?.amount || 0);
	const [price, setPrice] = useState<number>(transaction?.price || 0);

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(parseFloat(e.target.value));
	};

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(parseFloat(e.target.value));
	};

	const handleSubmit = () => {
		onSubmit(amount, price);
		setAmount(0);
		setPrice(0);
	};

	useEffect(() => {
		if (transaction) {
			setAmount(transaction.amount);
			setPrice(transaction.price);
		} else {
			setAmount(0);
			setPrice(0);
		}
	}, [transaction]);

	console.log('currentPrice', currentPrice);

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				position='absolute'
				top='50%'
				left='50%'
				bgcolor='white'
				padding='2rem'
				boxShadow='24px'
				borderRadius='8px'
				sx={{
					transform: 'translate(-50%, -50%)',
				}}>
				<Box display='flex' flexDirection='column' gap='1rem'>
					<Typography variant='h5'>Dodaj transakcję dla waluty {coin}</Typography>
					<TextField
						label='Ilość'
						type='number'
						value={amount}
						onChange={handleAmountChange}
						fullWidth
						margin='normal'
					/>
					<Box>
						<TextField
							label='Cena'
							type='number'
							value={price}
							onChange={handlePriceChange}
							fullWidth
							margin='normal'
						/>
						<Button onClick={() => setPrice(currentPrice)}>Cena rynkowa</Button>
					</Box>
					<Button
						variant='contained'
						color='primary'
						onClick={handleSubmit}
						fullWidth
						disabled={!amount || !price || amount < 0 || price < 0}>
						Dodaj
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default PortfolioHandleModal;
