import styled from 'styled-components';
import Logo from '../Logo';
import { useGlobalMarketData } from '../../services/api';
import MarketDataList from './MarketDataList';
import { Button } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import StyledLink from '../StyledLink';

const Navbar = () => {
	const { data: globalMarketData, isLoading: isMarketDataLoading } = useGlobalMarketData();

	console.log(globalMarketData);

	const { isAuthenticated, logout } = useAuth();

	console.log('isAuthenticated', isAuthenticated);

	return (
		<>
			<NavbarContainer>
				<Logo />
				<div>
					<MenuItemList>
						<li>
							<StyledLink label='Strona główna' fontWeight='bolder' />
						</li>
						{isAuthenticated ? (
							<li>
								<StyledLink linkTo='/portfolio' label='Portfolio' fontWeight='bolder' />
							</li>
						) : null}
						<li>
							{isAuthenticated ? (
								<Button onClick={logout} variant='contained' color='error'>
									<StyledLink label='Wyloguj się' color='#E2E2B6' fontWeight='bolder' fontSize='0.75rem' />
								</Button>
							) : (
								<StyledLink linkTo='/login' label='Zaloguj się' color='#021526' fontWeight='bolder' />
							)}
						</li>
					</MenuItemList>
				</div>
			</NavbarContainer>
			{globalMarketData ? <MarketDataList globalMarketData={globalMarketData} isLoading={isMarketDataLoading} /> : null}
		</>
	);
};

const NavbarContainer = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #eeeeee;
	height: 80px;
	padding-right: 4rem;
	border-left: 2px solid #6eacda;
	border-right: 2px solid #6eacda;
`;

const MenuItemList = styled.ul`
	display: flex;
	align-items: center;
	gap: 4rem;
	list-style-type: none;
`;

export default Navbar;
