import { Button, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth, isLoggedUser } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

type AuthProps = {
	redirectPath: string;
	isLoginForm?: boolean;
};

const Auth: React.FC<AuthProps> = ({ redirectPath, isLoginForm }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();

	console.log(email, password, confirmPassword, isLoggedUser);

	const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log(event);

		if (isLoginForm && !isLoggedUser) {
			await signInWithEmailAndPassword(auth, email, password);
		}

		if (!isLoginForm && !isLoggedUser) {
			try {
				await createUserWithEmailAndPassword(auth, email, password);
				navigate(redirectPath);
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<AuthContainer>
			<AuthPanel onSubmit={onFormSubmit}>
				<Typography variant='h4' align='center'>
					{isLoginForm ? 'Zaloguj się' : 'Zarejestruj się'}
				</Typography>
				<TextField
					margin='normal'
					required
					id='email'
					label='Email'
					name='email'
					autoComplete='email'
					autoFocus
					onChange={e => {
						setEmail(e.target.value);
					}}
				/>
				<TextField
					margin='normal'
					required
					name='password'
					label='Hasło'
					type='password'
					id='password'
					onChange={e => {
						setPassword(e.target.value);
					}}
				/>
				{!isLoginForm ? (
					<TextField
						margin='normal'
						required
						name='confirmPassword'
						label='Powtórz hasło'
						type='password'
						id='confirmPassword'
						onChange={e => {
							setConfirmPassword(e.target.value);
						}}
					/>
				) : null}
				<Button type='submit' variant='contained'>
					{isLoginForm ? 'Zaloguj się' : 'Zarejestruj się'}
				</Button>
				<Link to={isLoginForm ? '/register' : '/login'}>
					{isLoginForm ? 'Nie masz konta? Kliknij aby się zarejestrować' : 'Masz już konto? Kliknij aby się zalogować'}
				</Link>
			</AuthPanel>
		</AuthContainer>
	);
};

export default Auth;

const AuthContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

// const StyledImage = styled.div`
// 	flex: 1;
// 	width: 50%;
// 	background-image: url('src/assets/bitcoin.jpeg');
// 	background-position: center;
// 	height: 100%;
// `;

const AuthPanel = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 1.5rem;
	border: 1px solid black;
	padding: 2.5rem;
`;
