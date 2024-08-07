import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

interface PortfolioHandleModal {
	open: boolean;
	onClose: () => void;
	onSubmit: (amount: number, price: number) => void;
	coin: string;
}

const PortfolioHandleModal: React.FC<PortfolioHandleModal> = ({ open, onClose, onSubmit, coin }) => {
	const [amount, setAmount] = useState<number>(0);
	const [price, setPrice] = useState<number>(0);

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
					<TextField label='Cena' type='number' value={price} onChange={handlePriceChange} fullWidth margin='normal' />
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
