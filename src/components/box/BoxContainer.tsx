import roundToTwoDecimalPlaces from '../../helpers/roundToTwoDecimalPlaces';
import Carousel from '../Carousel';
import React from 'react';
import { Datum, GlobalMarketData } from '../../services/types';
import { CircularProgress } from '@mui/material';
import BasicInfoBox from './BasicInfoBox';
import { Box } from '@mui/system';

const BoxContainer: React.FC<{
	coins: Datum[];
	marketData: GlobalMarketData;
	isCarouselDataLoading: boolean;
	isMarketDataLoading: boolean;
}> = ({ coins, marketData, isCarouselDataLoading, isMarketDataLoading }) => {
	return (
		<Box display='flex' gap='1rem' margin='1rem 0' width='100%'>
			<Box display='flex' flexDirection='column' gap='1rem' flex='1'>
				{isMarketDataLoading ? (
					<Box width='100%' height='100%' display='flex' alignItems='center' justifyContent='center'>
						<CircularProgress size='200px' />
					</Box>
				) : (
					<>
						<BasicInfoBox
							value={marketData.total_market_cap.usd}
							information='Kapitalizacja globalna'
							marketCapPercent={roundToTwoDecimalPlaces(marketData.market_cap_change_percentage_24h_usd)}
						/>
						<BasicInfoBox value={marketData.total_volume.usd} information='24 godzinny wolumen handlu' />
					</>
				)}
			</Box>
			<Box border='2px solid #6eacda' flex='2' maxWidth='900px' padding='1rem' overflow='hidden'>
				{isCarouselDataLoading ? (
					<Box width='100%' height='100%' display='flex' alignItems='center' justifyContent='center'>
						<CircularProgress size='200px' />
					</Box>
				) : (
					<Carousel coins={coins} />
				)}
			</Box>
		</Box>
	);
};

export default BoxContainer;
