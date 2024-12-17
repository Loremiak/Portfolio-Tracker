import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import StyledLink from '../components/StyledLink';
import { Box } from '@mui/system';

type AuthProps = {
    isLoginForm?: boolean;
};

const Auth: React.FC<AuthProps> = ({ isLoginForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLoginForm && !isAuthenticated) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success('Pomyślnie zalogowano!');
                navigate('/');
            } catch (error) {
                console.error(error);
                toast.error('Wystąpił problem z logowaniem');
            }
        }

        if (!isLoginForm && !isAuthenticated && confirmPassword === password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                toast.success('Pomyślnie zarejestrowano!');
                navigate('/');
            } catch (error) {
                console.error(error);
                toast.error('Wystąpił problem z rejestracją');
            }
        }
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" gap="1rem">
            <Box
                component="form"
                onSubmit={onFormSubmit}
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                gap="1.5rem"
                border="1px solid black"
                padding="2.5rem"
                bgcolor="white"
            >
                <Typography variant="h4" align="center">
                    {isLoginForm ? 'Zaloguj się' : 'Zarejestruj się'}
                </Typography>
                <TextField
                    margin="normal"
                    required
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    name="password"
                    label="Hasło"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isLoginForm ? (
                    <TextField
                        margin="normal"
                        required
                        name="confirmPassword"
                        label="Powtórz hasło"
                        type="password"
                        id="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                ) : null}
                <Button type="submit" variant="contained">
                    {isLoginForm ? 'Zaloguj się' : 'Zarejestruj się'}
                </Button>
                <StyledLink
                    linkTo={isLoginForm ? '/register' : '/login'}
                    label={isLoginForm ? 'Nie masz konta? Kliknij aby się zarejestrować' : 'Masz już konto? Kliknij aby się zalogować'}
                    fontSize="0.75rem"
                    color="#6eacda"
                />
                {isLoginForm ? <StyledLink linkTo="/reset-password" label="Zapomniałeś hasła?" fontSize="0.75rem" color="#6eacda" /> : null}
                <Typography position="absolute" bottom="0" fontSize="0.5rem" fontWeight="bold">
                    Copyright by Portfolio Tracker
                </Typography>
            </Box>
            <StyledLink label="Powrót do strony głównej" color="#03346E" />
        </Box>
    );
};

export default Auth;
