import styled from 'styled-components';
import Logo from './Logo';

const Footer = () => {
	return (
		<FooterContainer>
			<InfoContainer>
				<div>
					<Logo />
					<p>OPIS</p>
					<p>API by Coinecko</p>
				</div>
				<div>Linki</div>
			</InfoContainer>
			<div>Made by Damian Jamróz with </div>
		</FooterContainer>
	);
};

export default Footer;

const FooterContainer = styled.div`
	margin-top: 4rem;
	border: 2px solid gray;
	padding: 1rem;
`;

const InfoContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
`;
