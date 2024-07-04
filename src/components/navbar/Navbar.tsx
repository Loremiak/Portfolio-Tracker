import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../Logo';
import { useGlobalMarketData } from '../../services/api';
import MarketDataList from './MarketDataList';

const Navbar = () => {
	const { data: globalMarketData, isLoading: isMarketDataLoading } = useGlobalMarketData();

	console.log(globalMarketData);

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
							<Link to='/portfolio'>portfolio</Link>
						</li>
						<li>
							<Link to='/login'>login</Link>
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
	background-color: gray;
	height: 80px;
	padding-right: 4rem;
`;

const MenuItemList = styled.ul`
	display: flex;
	gap: 4rem;
	list-style-type: none;
`;

export default Navbar;
