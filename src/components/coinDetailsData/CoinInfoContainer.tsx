import { Divider } from '@mui/material';
import React from 'react';
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
			<DetailCoin label='Kapitalizacja rynkowa' info={marketCap} />
			<DetailCoin label='24 godz. wolumen handlu' info={totalVolume} />
			<DetailCoin label='Zasoby w obiegu' info={circulatingSupply} />
			<DetailCoin label='Maksymalne zasoby' info={maxSupply} />
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

const DetailCoin: React.FC<{ label: string; info: number }> = ({ label, info }) => {
	return (
		<>
			<DetailsCoinInfo>
				<p>{label}</p>
				<p>{info}</p>
			</DetailsCoinInfo>
			<Divider color='#6eacda' />
		</>
	);
};

export default CoinInfoContainer;
