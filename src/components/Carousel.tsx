import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import roundToTwoDecimalPlaces from '../helpers/roundToTwoDecimalPlaces';
import handleBiggerValues from '../helpers/handleBiggerValues';
import { TrendingCoinsData } from '../services/types';
import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

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
						<Box
							display='flex'
							alignItems='center'
							justifyContent='center'
							flexDirection='column'
							padding='1.25rem 0.5rem'
							margin='1rem'
							bgcolor='white'>
							<Box
								component='img'
								src={item.large}
								alt={item.symbol}
								width='auto'
								height='75px'
								sx={{ objectFit: 'cover' }}
							/>
							<Typography margin='1.5rem 0 0 0'>
								{item.symbol}
								<Typography component='span' color={isPriceChangePositive ? 'green' : 'red'}>
									{isPriceChangePositive
										? ` +${roundToTwoDecimalPlaces(item.data.price_change_percentage_24h.usd)}`
										: ` ${roundToTwoDecimalPlaces(item.data.price_change_percentage_24h.usd)}`}
									%
								</Typography>
							</Typography>
							<Typography fontWeight='600' fontSize='1.5rem' margin='0'>
								{handleBiggerValues(item.data.price)} USD
							</Typography>
						</Box>
					</div>
				);
			})}
		</Slider>
	);
};

export default Carousel;
