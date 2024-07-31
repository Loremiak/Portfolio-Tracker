import { Typography, TextField, Button } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import StyledLink from '../components/StyledLink';

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
		<Container>
			<AuthPanel onSubmit={onFormSubmit}>
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
					onChange={e => {
						setEmail(e.target.value);
					}}
				/>
				<ButtonContainer>
					<StyledLink linkTo='/login' label='Powrót' color='#03346E' />
					<Button type='submit' variant='contained'>
						Zresetuj hasło
					</Button>
				</ButtonContainer>
			</AuthPanel>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	height: 100vh;
	align-items: center;
	background-color: white;
`;

const AuthPanel = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 1.5rem;
	border: 1px solid black;
	padding: 2.5rem;
	width: 400px;
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
`;
