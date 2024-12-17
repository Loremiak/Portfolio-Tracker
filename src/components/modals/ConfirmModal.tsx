import { Modal, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';

type ConfirmModalType = {
    open: boolean;
    onClose: () => void;
    title: string;
    onConfirm: () => void;
};

const ConfirmModal: React.FC<ConfirmModalType> = ({ open, onClose, title, onConfirm }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box
                position="absolute"
                top="50%"
                left="50%"
                border="2px solid black"
                padding="2rem"
                bgcolor="white"
                sx={{
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Typography variant="h5" color="black">
                    {title}
                </Typography>
                <Box display="flex" justifyContent="space-between" marginTop="2rem">
                    <Button variant="text" onClick={onClose}>
                        Anuluj
                    </Button>
                    <Button variant="contained" onClick={onConfirm}>
                        Potwierdź
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmModal;
