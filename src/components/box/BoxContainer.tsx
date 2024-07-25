import styled from 'styled-components';
import Box from './Box';
import roundToTwoDecimalPlaces from '../../helpers/roundToTwoDecimalPlaces';
import Carousel from '../carousel/Carousel';
import React from 'react';
import { Datum, GlobalMarketData } from '../../services/types';
import { CircularProgress } from '@mui/material';

// export const mockedBasicData = {
// 	active_cryptocurrencies: 14015,
// 	upcoming_icos: 0,
// 	ongoing_icos: 49,
// 	ended_icos: 3376,
// 	markets: 1057,
// 	total_market_cap: {
// 		btc: 38493890.2420419,
// 		eth: 802356209.6949366,
// 		ltc: 30009622521.877502,
// 		bch: 4894953300.442286,
// 		bnb: 4263672360.544737,
// 		eos: 3018104765784.2134,
// 		xrp: 4619202807138.768,
// 		xlm: 21719356169223.53,
// 		link: 165364977827.88507,
// 		dot: 342498469722.5065,
// 		yfi: 344343086.4886682,
// 		usd: 2586529064445.6064,
// 		aed: 9499545294989.367,
// 		ars: 2256090067469835.5,
// 		aud: 4010547813934.2764,
// 		bdt: 284114835641003.94,
// 		bhd: 975072313243.771,
// 		bmd: 2586529064445.6064,
// 		brl: 13365371634709.77,
// 		cad: 3543700010034.348,
// 		chf: 2358573084937.8853,
// 		clp: 2463361012772376.5,
// 		cny: 18735781931218.184,
// 		czk: 61361263607469.12,
// 		dkk: 18113463038312.605,
// 		eur: 2427183354901.372,
// 		gbp: 2094100488098.3223,
// 		gel: 6918965247392.016,
// 		hkd: 20267710673275.547,
// 		idr: 42000446927827480,
// 		ils: 9770044504549.104,
// 		inr: 215663880348715,
// 		jpy: 400425737524954.8,
// 		krw: 3562633402786089.5,
// 		kwd: 797310516760.6814,
// 		lkr: 777773164299331.8,
// 		mmk: 5436335069045867,
// 		mxn: 44328711065188.164,
// 		myr: 12358435869921.1,
// 		ngn: 3194285470229201.5,
// 		nok: 28408552250711.62,
// 		nzd: 4369358885341.3345,
// 		php: 148744820173605.88,
// 		pkr: 720462389687609.5,
// 		pln: 10480095876791.639,
// 		rub: 240624752307851.8,
// 		sar: 9701716166253.652,
// 		sek: 28162645759496.64,
// 		sgd: 3522958633466.56,
// 		thb: 95960228290932.16,
// 		try: 84241955777932.02,
// 		twd: 84299637962598.48,
// 		uah: 102929835190876.72,
// 		vef: 258989155222.93854,
// 		vnd: 65848503873065496,
// 		zar: 49629088500747.78,
// 		xdr: 1968089965136.6636,
// 		xag: 94944291404.99913,
// 		xau: 1110500388.5290759,
// 		bits: 38493890242041.9,
// 		sats: 3849389024204190,
// 	},
// 	total_volume: {
// 		btc: 1242798.6132425226,
// 		eth: 25904557.280789383,
// 		ltc: 968878879.7290076,
// 		bch: 158036538.66691875,
// 		bnb: 137655250.3186125,
// 		eos: 97441344430.30779,
// 		xrp: 149133766602.99612,
// 		xlm: 701222598129.3701,
// 		link: 5338908689.95408,
// 		dot: 11057771000.342476,
// 		yfi: 11117325.572367674,
// 		usd: 83507660935.07634,
// 		aed: 306698586316.2545,
// 		ars: 72839237332771.34,
// 		aud: 129482970678.20491,
// 		bdt: 9172819933658.566,
// 		bhd: 31480801526.966076,
// 		bmd: 83507660935.07634,
// 		brl: 431509136349.8196,
// 		cad: 114410505940.71072,
// 		chf: 76147963761.54617,
// 		clp: 79531105620641.23,
// 		cny: 604896092749.3187,
// 		czk: 1981085643427.1973,
// 		dkk: 584804149528.3403,
// 		eur: 78363087975.51009,
// 		gbp: 67609305430.93462,
// 		gel: 223382993001.32983,
// 		hkd: 654355342106.6594,
// 		huf: 30900580528392.766,
// 		idr: 1356009924412911.8,
// 		ils: 315431817496.8453,
// 		inr: 6962839290562.358,
// 		jpy: 12927988004681.092,
// 		krw: 115021782018755.45,
// 		kwd: 25741654021.541992,
// 		lkr: 25110878737653.516,
// 		mmk: 175515377698897.7,
// 		mxn: 1431179345403.6199,
// 		myr: 398999603947.79456,
// 		ngn: 103129445419518.38,
// 		nok: 917187354133.7178,
// 		nzd: 141067403926.10052,
// 		php: 4802316811223.908,
// 		pkr: 23260565590204.664,
// 		pln: 338356257069.08124,
// 		rub: 7768716193652.263,
// 		sar: 313225795617.92365,
// 		sek: 909248113793.298,
// 		sgd: 113740858007.67238,
// 		thb: 3098134220691.3374,
// 		try: 2719802679317.3047,
// 		twd: 2721664983663.8267,
// 		uah: 3323152210186.1074,
// 		vef: 8361622089.4291935,
// 		vnd: 2125958919271851.5,
// 		zar: 1602305248375.645,
// 		xdr: 63540979205.49964,
// 		xag: 3065334081.629256,
// 		xau: 35853179.14586566,
// 		bits: 1242798613242.5225,
// 		sats: 124279861324252.27,
// 	},
// 	market_cap_percentage: {
// 		btc: 51.14781577902862,
// 		eth: 14.973698303486335,
// 		usdt: 4.253035279985038,
// 		bnb: 3.6083449917863435,
// 		sol: 2.735158014572183,
// 		usdc: 1.3097304544723105,
// 		xrp: 1.1923546701575014,
// 		steth: 1.1616030501514,
// 		doge: 0.9050312858631137,
// 		ton: 0.7977235935966239,
// 	},
// 	market_cap_change_percentage_24h_usd: 3.138712438564304,
// 	updated_at: 1713827466,
// };

const BoxContainer: React.FC<{
	coins: Datum[];
	marketData: GlobalMarketData;
	isCarouselDataLoading: boolean;
	isMarketDataLoading: boolean;
}> = ({ coins, marketData, isCarouselDataLoading, isMarketDataLoading }) => {
	return (
		<DataMarketBoxes>
			<InfoContainer>
				{isMarketDataLoading ? (
					<LoadingContainer>
						<CircularProgress size='200px' />
					</LoadingContainer>
				) : (
					<>
						<Box
							value={marketData.total_market_cap.usd}
							information='Kapitalizacja globalna'
							marketCapPercent={roundToTwoDecimalPlaces(marketData.market_cap_change_percentage_24h_usd)}
						/>
						<Box value={marketData.total_volume.usd} information='24 godzinny wolumen handlu' />
					</>
				)}
			</InfoContainer>
			<CarouselContainer>
				{isCarouselDataLoading ? (
					<LoadingContainer>
						<CircularProgress size='200px' />
					</LoadingContainer>
				) : (
					<Carousel coins={coins} />
				)}
			</CarouselContainer>
		</DataMarketBoxes>
	);
};

export default BoxContainer;

const DataMarketBoxes = styled.div`
	display: flex;
	gap: 1rem;
	margin: 1rem 0;
	width: 100%;
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	flex: 1;
`;

const CarouselContainer = styled.div`
	border: 2px solid #6eacda;
	flex: 2;
	max-width: 900px;
	padding: 1rem;
`;

const LoadingContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
