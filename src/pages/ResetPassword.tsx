import { Typography, TextField, Button } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import StyledLink from '../components/StyledLink';
import { Box } from '@mui/system';

export const ResetPassword = () => {
	const [email, setEmail] = useState('');

	const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await sendPasswordResetEmail(auth, email);
			toast.success('Email został wysłany!');
		} catch (error) {
			console.error(error);
			toast.error('Wystąpił problem z wysłaniem emaila');
		}
	};

	return (
		<Box display='flex' justifyContent='center' height='100vh' alignItems='center'>
			<Box
				onSubmit={onFormSubmit}
				component='form'
				display='flex'
				justifyContent='center'
				alignItems='center'
				flexDirection='column'
				gap='1.5rem'
				border='1px solid black'
				padding='2.5rem'
				width='400px'>
				<Typography variant='h5' align='center'>
					Zresetuj swoje hasło
				</Typography>
				<TextField
					margin='normal'
					required
					id='email'
					label='Email'
					name='email'
					autoComplete='email'
					autoFocus
					defaultValue={'test@gmail.com'}
					onChange={e => setEmail(e.target.value)}
				/>
				<Box display='flex' gap='1rem' alignItems='center'>
					<StyledLink linkTo='/login' label='Powrót' color='#03346E' />
					<Button type='submit' variant='contained'>
						Zresetuj hasło
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
