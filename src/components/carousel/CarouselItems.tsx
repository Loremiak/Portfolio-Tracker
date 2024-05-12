import { Link } from 'react-router-dom';
import styled from 'styled-components';

type CarouselItemsProps = {
	redirectTo: string;
	imgSrc: string;
	imgAlt: string;
	symbol: string;
	dayPriceChangePercent: string;
	currentPrice: string;
};

const CarouselItems = ({
	// redirectTo,
	imgSrc,
	imgAlt,
	symbol,
	dayPriceChangePercent,
}: // currentPrice,
CarouselItemsProps) => {
	return (
		<StyledLink to='/coin-details/1'>
			<img src={imgSrc} alt={imgAlt} />
			<span>{symbol}</span>
			<span>{dayPriceChangePercent}</span>
			{/* <span>
				{symbol}
				<span>{dayPriceChangePercent}</span>
			</span>
			<span>{currentPrice}</span> */}
		</StyledLink>
	);
};

export default CarouselItems;

// const StyledLink = styled(Link)`
// 	display: flex;
// 	flex-direction: column;
// 	align-items: center;
// 	width: 100%;
// `;

const StyledLink = styled(Link)`
	backgroud: grey;
`;
