import Logo from './Logo';
import { Divider, List, Typography } from '@mui/material';
import FacebookIcon from '../assets/facebook-icon.svg';
import TwitterIcon from '../assets/twitter-icon.svg';
import YouTubeIcon from '../assets/youtube-icon.svg';
import useAuth from '../hooks/useAuth';
import StyledLink from './StyledLink';
import { Box } from '@mui/system';

const Footer = () => {
	const { isAuthenticated } = useAuth();

	const iconArray = [FacebookIcon, TwitterIcon, YouTubeIcon];

	return (
		<Box padding='1rem' marginTop='3rem' width='100%' border='2px solid #6eacda'>
			<Box
				display='flex'
				justifyContent='space-between'
				padding='1rem'
				flexDirection={{ xs: 'column', md: 'row' }} // Zmiana kierunku układu na mniejszych ekranach
				gap={{ xs: '2rem', md: '4rem', lg: '15rem' }}>
				<Box width='400px'>
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
				<Box display='flex' gap='2rem' flexDirection='column' alignItems='center' marginTop='1rem'>
					<Typography fontSize={{ xs: '0.75rem', sm: '1rem', md: '1.25rem' }} fontWeight='bold'>
						Społeczność
					</Typography>
					<List sx={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						{iconArray.map(icon => (
							<li key={icon}>
								<img src={icon} alt='Community icons' />
							</li>
						))}
					</List>
				</Box>
			</Box>
			<Typography display='flex' justifyContent='center'>
				API powered by Coingecko{' '}
			</Typography>
		</Box>
	);
};

export default Footer;
