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
		<div>
			<Divider />
			<DetailsCoinInfo>
				<p>Kapitalizacja rynkowa</p>
				<p>{marketCap}</p>
			</DetailsCoinInfo>
			<Divider />
			<DetailsCoinInfo>
				<p>24 godz. wolumen handlu</p>
				<p>{totalVolume}</p>
			</DetailsCoinInfo>
			<Divider />
			<DetailsCoinInfo>
				<p>Zasoby w obiegu</p>
				<p>{circulatingSupply}</p>
			</DetailsCoinInfo>
			<Divider />
			<DetailsCoinInfo>
				<p>Maksymalne zasoby</p>
				<p>{maxSupply}</p>
			</DetailsCoinInfo>
			<Divider />
		</div>
	);
};

const DetailsCoinInfo = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

export default CoinInfoContainer;
