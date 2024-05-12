import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const Logo = () => {
	return (
		<StyledLink to='/'>
			<img src={logo} alt='logo' width='100px' />
			<span>Portfolio Tracker</span>
		</StyledLink>
	);
};

export default Logo;

const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: black;
`;
