import { Divider } from '@mui/material';
import styled from 'styled-components';

type CoinInfoContainerProps = {
	marketCap: number;
	totalVolume: number;
	circulatingSupply: number;
	maxSupply: number;
};

const CoinInfoContainer: React.FC<CoinInfoContainerProps> = ({
	marketCap,
	totalVolume,
	circulatingSupply,
	maxSupply,
}) => {
	return (
		<DetailsContainer>
			<Divider color='#6eacda' />
			<DetailsCoinInfo>
				<p>Kapitalizacja rynkowa</p>
				<p>{marketCap}</p>
			</DetailsCoinInfo>
			<Divider color='#6eacda' />
			<DetailsCoinInfo>
				<p>24 godz. wolumen handlu</p>
				<p>{totalVolume}</p>
			</DetailsCoinInfo>
			<Divider color='#6eacda' />
			<DetailsCoinInfo>
				<p>Zasoby w obiegu</p>
				<p>{circulatingSupply}</p>
			</DetailsCoinInfo>
			<Divider color='#6eacda' />
			<DetailsCoinInfo>
				<p>Maksymalne zasoby</p>
				<p>{maxSupply}</p>
			</DetailsCoinInfo>
			<Divider color='#6eacda' />
		</DetailsContainer>
	);
};

const DetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const DetailsCoinInfo = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

export default CoinInfoContainer;
