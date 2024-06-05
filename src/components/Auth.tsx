import { Button, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

type AuthProps = {
	header: string;
	redirectPath: string;
};

const Auth: React.FC<AuthProps> = ({ header, redirectPath }) => {
	const navigate = useNavigate();

	return (
		<AuthContainer>
			<StyledImage />
			<AuthPanel>
				<Typography variant='h4' align='center'>
					{header}
				</Typography>
				<TextField margin='normal' required id='email' label='Email' name='email' autoComplete='email' autoFocus />
				<TextField margin='normal' required name='password' label='Hasło' type='password' id='password' />
				<Button type='submit' variant='contained' onClick={() => navigate(redirectPath)}>
					{header}
				</Button>
			</AuthPanel>
		</AuthContainer>
	);
};

export default Auth;

const AuthContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 100vh;
`;

const StyledImage = styled.div`
	flex: 1;
	width: 50%;
	background-image: url('src/assets/bitcoin.jpeg');
	background-position: center;
	height: 100%;
`;

const AuthPanel = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	flex-direction: column;
	gap: 1rem;
	height: 100%;
`;
