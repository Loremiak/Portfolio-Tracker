import { Modal, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';

type ConfirmModalType = {
	open: boolean;
	onClose: () => void;
	title: string;
	onConfirm: () => void;
};

const ConfirmModal: React.FC<ConfirmModalType> = ({ open, onClose, title, onConfirm }) => {
	return (
		<Modal open={open} onClose={onClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
			<ConfirmModalContainer>
				<Typography variant='h5' color='black'>
					{title}
				</Typography>
				<StyledContainer>
					<Button variant='text' onClick={onClose}>
						Anuluj
					</Button>
					<Button variant='contained' onClick={onConfirm}>
						Potwierdź
					</Button>
				</StyledContainer>
			</ConfirmModalContainer>
		</Modal>
	);
};

export default ConfirmModal;

const ConfirmModalContainer = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 300px;
	border: 2px solid black;
	padding: 2rem;
	background-color: white;
`;

const StyledContainer = styled(Box)`
	display: flex;
	justify-content: space-between;
	margin-top: 2rem;
`;
