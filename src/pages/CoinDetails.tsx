import ImageCoinContainer from '../components/coinDetailsData/ImageCoinContainer';
import CoinInfoContainer from '../components/coinDetailsData/CoinInfoContainer';
import { useParams } from 'react-router-dom';
import { useCoinDetailsInfo, useHistoricalChartData } from '../services/api';
import StyledChart from '../components/StyledChart';
import { Box } from '@mui/system';

const CoinDetails = () => {
	const { id } = useParams();

	const { data: coinDetailsInfo } = useCoinDetailsInfo(id ? id : '');

	const { data: chartData } = useHistoricalChartData(id ? id : '');

	return (
		<>
			<Box display='flex' justifyContent='space-between' margin='2rem 0'>
				<Box width='30%'>
					{coinDetailsInfo ? (
						<>
							<ImageCoinContainer
								imgSrc={coinDetailsInfo.image.large}
								coinName={coinDetailsInfo.name}
								coinSymbol={coinDetailsInfo.symbol}
								marketCapRank={coinDetailsInfo.market_cap_rank}
								currentPrice={coinDetailsInfo.market_data.current_price.usd}
							/>
							<CoinInfoContainer
								marketCap={coinDetailsInfo.market_data.market_cap.usd}
								totalVolume={coinDetailsInfo.market_data.total_volume.usd}
								circulatingSupply={coinDetailsInfo.market_data.circulating_supply}
								maxSupply={coinDetailsInfo.market_data.max_supply ?? '∞'}
							/>
						</>
					) : null}
				</Box>
				<Box width='65%'>{chartData ? <StyledChart prices={chartData.prices} /> : null}</Box>
			</Box>
		</>
	);
};

export default CoinDetails;
