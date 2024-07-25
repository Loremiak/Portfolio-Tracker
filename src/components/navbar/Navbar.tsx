import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../Logo';
import { useGlobalMarketData } from '../../services/api';
import MarketDataList from './MarketDataList';
import { auth, isLoggedUser } from '../../firebase/firebase';
import { Button } from '@mui/material';

const Navbar = () => {
	const { data: globalMarketData, isLoading: isMarketDataLoading } = useGlobalMarketData();

	console.log(globalMarketData);

	console.log(isLoggedUser);

	return (
		<>
			<NavbarContainer>
				<Logo />
				<div>
					<MenuItemList>
						<li>
							<Link to='/'>Strona główna</Link>
						</li>
						{isLoggedUser ? (
							<li>
								<Link to='/portfolio'>Portfolio</Link>
							</li>
						) : null}
						<li>
							{isLoggedUser ? (
								<Button onClick={() => auth.signOut()}>
									<Link to='/'>Wyloguj się</Link>
								</Button>
							) : (
								<Link to='/login'>Zaloguj się</Link>
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
	gap: 4rem;
	list-style-type: none;
`;

export default Navbar;
