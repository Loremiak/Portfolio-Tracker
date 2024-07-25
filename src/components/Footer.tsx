import styled from 'styled-components';
import Logo from './Logo';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '../assets/facebook-icon.svg';
import TwitterIcon from '../assets/twitter-icon.svg';
import YouTubeIcon from '../assets/youtube-icon.svg';
import { isLoggedUser } from '../firebase/firebase';

const Footer = () => {
	const iconArray = [FacebookIcon, TwitterIcon, YouTubeIcon];

	return (
		<FooterContainer>
			<InfoContainer>
				<LogoContainer>
					<Logo />
					<Divider />
					<SiteDescription>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro aliquid adipisci labore ipsum a recusandae
						perspiciatis nisi. Ipsa iste eligendi, nesciunt non tempora, ex, voluptatum voluptates nobis suscipit
						placeat corrupti.
					</SiteDescription>
				</LogoContainer>
				<ListContainer>
					<p>Strony</p>
					<SiteNavigationList>
						<li>
							<Link to='/'>Strona główna</Link>
						</li>
						{isLoggedUser ? (
							<li>
								<Link to='/portfolio'>Portfolio</Link>
							</li>
						) : null}
						<li>
							<Link to='/login'>Zaloguj się</Link>
						</li>
					</SiteNavigationList>
				</ListContainer>
				<ListContainer>
					<p>Społeczność</p>
					<IconList>
						{iconArray.map(icon => (
							<li key={icon}>
								<img src={icon} alt='Community icons' />
							</li>
						))}
					</IconList>
				</ListContainer>
			</InfoContainer>
			<CoingeckoInfo>API powered by Coingecko </CoingeckoInfo>
		</FooterContainer>
	);
};

export default Footer;

const FooterContainer = styled.div`
	border: 2px solid #6eacda;
	padding: 1rem;
	margin-top: 3rem;
	width: 100%;
`;

const InfoContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	gap: 15rem;
`;

const LogoContainer = styled.div`
	width: 400px;
`;

const SiteDescription = styled.p`
	font-size: 1rem;
	padding-top: 2rem;
`;

const SiteNavigationList = styled.ul`
	list-style-type: none;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 2rem;
	margin-left: 0.5rem;
`;

const ListContainer = styled.div`
	display: flex;
	gap: 2rem;
	flex-direction: column;
	align-items: center;
	margin-top: 1rem;
`;

const IconList = styled.ul`
	list-style-type: none;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const CoingeckoInfo = styled.p`
	display: flex;
	justify-content: center;
`;
