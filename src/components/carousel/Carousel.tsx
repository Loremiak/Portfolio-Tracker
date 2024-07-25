import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import roundToTwoDecimalPlaces from '../../helpers/roundToTwoDecimalPlaces';
import handleBiggerValues from '../../helpers/handleBiggerValues';
import { TrendingCoinsData } from '../../services/types';
import React from 'react';

const Carousel: React.FC<TrendingCoinsData> = ({ coins }) => {
	const settings = {
		speed: 1500,
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 1000,
		pauseOnHover: true,
		arrows: false,
	};

	return (
		<Slider {...settings}>
			{coins.map(({ item }) => {
				const isPriceChangePositive = item.data.price_change_percentage_24h.usd > 0;

				return (
					<div key={item.symbol}>
						<CoinContainer>
							<StyledImg src={item.large} alt={item.symbol} />
							<StyledParagraph>
								{item.symbol}
								<StyledSpan $isPriceChangePositive={isPriceChangePositive}>
									{isPriceChangePositive
										? ` +${roundToTwoDecimalPlaces(item.data.price_change_percentage_24h.usd)}`
										: ` ${roundToTwoDecimalPlaces(item.data.price_change_percentage_24h.usd)}`}
									%
								</StyledSpan>
							</StyledParagraph>
							<StyledPriceParagraph>{handleBiggerValues(item.data.price)} USD</StyledPriceParagraph>
						</CoinContainer>
					</div>
				);
			})}
		</Slider>
	);
};

export default Carousel;

const CoinContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 1.25rem 0.5rem;
	margin: 1rem;
	background-color: white;
`;

const StyledImg = styled.img`
	width: auto;
	height: 75px;
	object-fit: cover;
`;

const StyledParagraph = styled.p`
	margin: 1.5rem 0 0 0;
`;

const StyledSpan = styled.span<{ $isPriceChangePositive: boolean }>`
	color: ${({ $isPriceChangePositive }) => ($isPriceChangePositive ? 'green' : 'red')};
`;

const StyledPriceParagraph = styled.p`
	font-weight: 600;
	font-size: 1.5rem;
	margin: 0;
`;
