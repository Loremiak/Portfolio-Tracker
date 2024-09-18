import Logo from './Logo';
import { Divider, List, Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';
import StyledLink from './StyledLink';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const Footer = () => {
	const { isAuthenticated } = useAuth();

	return (
		<Box padding='1rem' marginTop='3rem' width='100%' border='2px solid #6eacda'>
			<Box
				display='flex'
				justifyContent='space-between'
				padding='1rem'
				flexDirection={{ xs: 'column', md: 'row' }}
				gap={{ xs: '2rem', md: '4rem', lg: '15rem' }}>
				<Box maxWidth='750px'>
					<Logo />
					<Divider color='#6eacda' />
					<Typography fontSize={{ xs: '0.75rem', sm: '0.8rem', md: '0.9rem' }} paddingTop='1rem'>
						Portfolio Tracker to aplikacja internetowa do śledzenia i zarządzania portfelem inwestycyjnym. Umożliwia
						użytkownikom monitorowanie ich inwestycji kryptowalutowych w czasie rzeczywistym. Aplikacja przelicza
						wartości inwestycji na wybraną walutę (USD), oferując przejrzysty podgląd wartości portfela w postaci
						wykresów i statystyk. Dzięki intuicyjnemu interfejsowi użytkownicy mogą łatwo analizować swoje inwestycje,
						śledzić zmiany wartości oraz podejmować świadome decyzje inwestycyjne.
					</Typography>
				</Box>
				<Box display='flex' gap='2rem' flexDirection='column' alignItems='center' marginTop='1rem'>
					<Typography fontSize='1.25rem' fontWeight='bold'>
						Strony
					</Typography>
					<List
						sx={{
							listStyleType: 'none',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							gap: '2rem',
							marginLeft: '0.5rem',
						}}>
						<li>
							<StyledLink label='Strona główna' />
						</li>
						<li>
							{isAuthenticated ? (
								<StyledLink linkTo='/portfolio' label='Portfolio' />
							) : (
								<StyledLink linkTo='/login' label='Zaloguj się' />
							)}
						</li>
					</List>
				</Box>
			</Box>
			<Box display='flex' justifyContent='center' alignItems='center'>
				<Typography>API powered by</Typography>
				<Typography component='span' marginLeft='0.5rem'>
					<Link to='https://docs.coingecko.com/reference/introduction' target='_blank' rel='noopener noreferrer'>
						Coingecko
					</Link>
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
