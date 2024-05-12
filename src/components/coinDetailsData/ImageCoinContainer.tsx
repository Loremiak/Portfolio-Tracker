import styled from 'styled-components';

type ImageCoinContainer = {
	imgSrc: string;
	coinName: string;
	coinSymbol: string;
	marketCapRank: number;
	currentPrice: number;
};

const ImageCoinContainer: React.FC<ImageCoinContainer> = ({
	imgSrc,
	coinName,
	coinSymbol,
	marketCapRank,
	currentPrice,
}) => {
	return (
		<ImageContainer>
			<StyledImg src={imgSrc} alt={coinName} />
			<p>
				<BoldText>{coinName} </BoldText>
				<span>Kurs {coinSymbol.toUpperCase()} </span>
				<span>#{marketCapRank} </span>
			</p>
			<BoldText>{currentPrice} USD</BoldText>
		</ImageContainer>
	);
};

const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1.5rem;
`;

const StyledImg = styled.img`
	width: 150px;
`;

const BoldText = styled.span`
	font-weight: bold;
	font-size: 1.5rem;
`;

export default ImageCoinContainer;
