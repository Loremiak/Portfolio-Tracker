import Logo from '../Logo';
import { useGlobalMarketData } from '../../services/api';
import MarketDataList from './MarketDataList';
import { Button, List } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import StyledLink from '../StyledLink';
import { Box } from '@mui/system';

const Navbar = () => {
	const { data: globalMarketData, isLoading: isMarketDataLoading } = useGlobalMarketData();

	const { isAuthenticated, logout } = useAuth();

	return (
		<>
			<Box
				component='nav'
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				bgcolor='#eeeeee'
				height='80px'
				paddingRight={{ xs: '0.5rem', sm: '0.5rem', md: '4rem' }}
				borderLeft='2px solid #6eacda'
				borderRight='2px solid #6eacda'>
				<Logo />
				<div>
					<List
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: { xs: '1rem', sm: '2rem', md: '4rem' },
							listStyleType: 'none',
						}}>
						<li>
							<StyledLink
								label='Strona główna'
								fontWeight='bolder'
								fontSize={{ xs: '0.85rem', sm: '0.85rem', md: '1rem' }}
							/>
						</li>
						{isAuthenticated ? (
							<li>
								<StyledLink
									linkTo='/portfolio'
									label='Portfolio'
									fontWeight='bolder'
									fontSize={{ xs: '0.85rem', sm: '0.85rem', md: '1rem' }}
								/>
							</li>
						) : null}
						<li>
							{isAuthenticated ? (
								<Button onClick={logout} variant='contained' color='error'>
									<StyledLink
										label='Wyloguj się'
										color='#E2E2B6'
										fontWeight='bolder'
										fontSize={{ xs: '0.5rem', sm: '0.5rem', md: '0.75rem' }}
									/>
								</Button>
							) : (
								<StyledLink
									linkTo='/login'
									label='Zaloguj się'
									color='#021526'
									fontWeight='bolder'
									fontSize={{ xs: '0.85rem', sm: '0.85rem', md: '1rem' }}
								/>
							)}
						</li>
					</List>
				</div>
			</Box>
			{globalMarketData ? <MarketDataList globalMarketData={globalMarketData} isLoading={isMarketDataLoading} /> : null}
		</>
	);
};

export default Navbar;
