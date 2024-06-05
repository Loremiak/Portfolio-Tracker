// import { Box, Button, Modal, TextField, Typography } from '@mui/material';
// import { GridRowId } from '@mui/x-data-grid';
// import React from 'react';
// import styled from 'styled-components';

// type PortfolioHandleModalProps = {
// 	open: boolean;
// 	onClose: () => void;
// 	name: string | GridRowId;
// 	onSubmit: () => void;
// };

// const PortfolioHandleModal: React.FC<PortfolioHandleModalProps> = ({ open, onClose, name, onSubmit }) => {
// 	return (
// 		<Modal open={open} onClose={onClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
// 			<PortfolioHandleModalContainer>
// 				<Typography variant='h5' color='black'>
// 					Dodaj transakcję {name}
// 				</Typography>
// 				<StyledContainer>
// 					<TextField margin='normal' required id='amount' label='Ilość' name='amount' />
// 					<TextField margin='normal' required id='price' label='Cena' name='price' />
// 					<Button variant='contained' onSubmit={onSubmit}>
// 						dodaj transakcję{' '}
// 					</Button>
// 				</StyledContainer>
// 			</PortfolioHandleModalContainer>
// 		</Modal>
// 	);
// };

// export default PortfolioHandleModal;

// const PortfolioHandleModalContainer = styled(Box)`
// 	position: absolute;
// 	top: 50%;
// 	left: 50%;
// 	transform: translate(-50%, -50%);
// 	width: 600px;
// 	border: 2px solid black;
// 	padding: 3rem;
// 	background-color: white;
// `;

// const StyledContainer = styled(Box)`
// 	display: flex;
// 	flex-direction: column;
// `;

import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import styled from 'styled-components';

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
			<StyledBox>
				<h2>Dodaj transakcję dla {coin}</h2>
				<TextField label='Ilość' type='number' value={amount} onChange={handleAmountChange} fullWidth margin='normal' />
				<TextField label='Cena' type='number' value={price} onChange={handlePriceChange} fullWidth margin='normal' />
				<Button variant='contained' color='primary' onClick={handleSubmit} fullWidth>
					Dodaj
				</Button>
			</StyledBox>
		</Modal>
	);
};

const StyledBox = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 400px;
	background-color: white;
	padding: 2rem;
	box-shadow: 24px;
	border-radius: 8px;
`;

export default PortfolioHandleModal;
