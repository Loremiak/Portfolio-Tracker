import { Button, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import useAuth from '../hooks/useAuth';

type AuthProps = {
	redirectPath: string;
	isLoginForm?: boolean;
};

const Auth: React.FC<AuthProps> = ({ redirectPath, isLoginForm }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const { isAuthenticated } = useAuth();

	console.log('isAuthenticated', isAuthenticated);

	const navigate = useNavigate();

	console.log(email, password, confirmPassword, isAuthenticated);

	const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isLoginForm && !isAuthenticated) {
			try {
				await signInWithEmailAndPassword(auth, email, password);
				navigate(redirectPath);
			} catch (error) {
				console.error(error);
			}
		}

		if (!isLoginForm && !isAuthenticated) {
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
					defaultValue={'test@gmail.com'}
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
					defaultValue={'Qwerty123'}
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
					<Typography fontSize='0.75rem' color='#6eacda'>
						{isLoginForm
							? 'Nie masz konta? Kliknij aby się zarejestrować'
							: 'Masz już konto? Kliknij aby się zalogować'}
					</Typography>
				</Link>
				{isLoginForm ? (
					<Link to='/reset-password'>
						<Typography fontSize='0.75rem' color='#6eacda'>
							Zapomniałeś hasła?
						</Typography>
					</Link>
				) : null}
				<Typography sx={{ position: 'absolute', bottom: '0' }} fontSize='0.5rem' fontWeight='bold'>
					Copyright by Portfolio Tracker
				</Typography>
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

const AuthPanel = styled.form`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 1.5rem;
	border: 1px solid black;
	padding: 2.5rem;
`;
