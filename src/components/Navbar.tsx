import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mockedBasicData } from './box/BoxContainer';
import handleBiggerValues from '../helpers/handleBiggerValues';
import roundToTwoDecimalPlaces from '../helpers/roundToTwoDecimalPlaces';
import Logo from './Logo';

const Navbar = () => {
	return (
		<>
			<NavbarContainer>
				<Logo />
				<div>
					<MenuItemList>
						<li>
							<Link to='/'>home</Link>
						</li>
						<li>
							<Link to={'/portfolio'}>portfolio</Link>
						</li>
						<li>lampka</li>
						<li>
							<Link to={'/login'}>login</Link>
						</li>
					</MenuItemList>
				</div>
			</NavbarContainer>
			<BasicInfoContainer>
				<BasicInfoList>
					<li>Waluty: {handleBiggerValues(mockedBasicData.active_cryptocurrencies)}</li>
					<li>Giełdy: {handleBiggerValues(mockedBasicData.markets)}</li>
					<li>
						Kapitalizacja rynkowa: {handleBiggerValues(mockedBasicData.total_market_cap.usd)} USD{' '}
						{roundToTwoDecimalPlaces(mockedBasicData.market_cap_change_percentage_24h_usd)}%
					</li>
					<li>Wolumen: {handleBiggerValues(mockedBasicData.total_volume.usd)} USD</li>
				</BasicInfoList>
			</BasicInfoContainer>
		</>
	);
};

const NavbarContainer = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: gray;
	height: 80px;
	padding-right: 4rem;
`;

const MenuItemList = styled.ul`
	display: flex;
	gap: 4rem;
	list-style-type: none;
`;

const BasicInfoContainer = styled.div`
	background-color: lightgray;
	height: 30px;
`;

const BasicInfoList = styled.ul`
	display: flex;
	justify-content: space-between;
	list-style-type: none;
	padding: 0.5rem;
	margin: 0;
`;

export default Navbar;
