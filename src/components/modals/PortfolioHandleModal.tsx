import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import React from 'react';
import styled from 'styled-components';

type PortfolioHandleModalProps = {
	open: boolean;
	onClose: () => void;
	name: string | GridRowId;
};

const PortfolioHandleModal: React.FC<PortfolioHandleModalProps> = ({ open, onClose, name }) => {
	return (
		<Modal open={open} onClose={onClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
			<PortfolioHandleModalContainer>
				<Typography variant='h5' color='black'>
					Dodaj transakcję {name}
				</Typography>
				<StyledContainer>
					<TextField margin='normal' required id='amount' label='Ilość' name='amount' />
					<TextField margin='normal' required id='price' label='Cena' name='price' />
					<Button variant='contained'>dodaj transakcję </Button>
				</StyledContainer>
			</PortfolioHandleModalContainer>
		</Modal>
	);
};

export default PortfolioHandleModal;

const PortfolioHandleModalContainer = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 600px;
	border: 2px solid black;
	padding: 3rem;
	background-color: white;
`;

const StyledContainer = styled(Box)`
	display: flex;
	flex-direction: column;
`;
