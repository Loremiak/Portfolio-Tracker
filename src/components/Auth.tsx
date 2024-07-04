import { Button, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

type AuthProps = {
	header: string;
	redirectPath: string;
	isLoginForm?: boolean;
};

const Auth: React.FC<AuthProps> = ({ header, redirectPath, isLoginForm }) => {
	const navigate = useNavigate();

	const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		navigate(redirectPath);
	};

	return (
		<AuthContainer>
			<AuthPanel onSubmit={onFormSubmit}>
				<Typography variant='h4' align='center'>
					{header}
				</Typography>
				<TextField margin='normal' required id='email' label='Email' name='email' autoComplete='email' autoFocus />
				<TextField margin='normal' required name='password' label='Hasło' type='password' id='password' />
				{!isLoginForm ? (
					<TextField
						margin='normal'
						required
						name='confirmPassword'
						label='Powtórz hasło'
						type='password'
						id='confirmPassword'
					/>
				) : null}
				<Button type='submit' variant='contained'>
					{header}
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
