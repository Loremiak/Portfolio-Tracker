import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChartData, CoinDetails, Coins, DataMarket, TrendingCoinsData } from './types';

//coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false

// const BASE_URL = `https://api.coingecko.com/api/v3/ping?x_cg_demo_api_key=${apiKey}`;

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&precision=2
const BASE_URL = 'https://api.coingecko.com/api/v3';

const apiKey = import.meta.env.VITE_APP_API_KEY;
console.log('apiKey', apiKey);

export function useCryptocurrenciesList() {
	return useQuery({
		queryKey: ['cryptocurrenciesList'],
		queryFn: async () => {
			const response = await axios.get<Coins>(
				`${BASE_URL}/coins/markets?vs_currency=usd&per_page=10&page=1?x_cg_demo_api_key=${apiKey}`,
				{
					// params:{
					// 	vs_currency: 'usd',
					// },
					headers: { Accept: 'application/json' },
				}
			);

			return response.data;
		},
	});
}

export function useCryptocurrenciesListByIds(ids: string[]) {
	return useQuery({
		queryKey: ['cryptocurrenciesList', ids, { ids }],
		queryFn: async () => {
			const response = await axios.get<Coins>(
				`${BASE_URL}/coins/markets?vs_currency=usd&per_page=10&page=1&ids=${ids}?x_cg_demo_api_key=${apiKey}`
			);

			return response.data;
		},
	});
}

export function useTrendingCoins() {
	return useQuery({
		queryKey: ['trendingCoins'],
		queryFn: async () => {
			const response = await axios.get<TrendingCoinsData>(`${BASE_URL}/search/trending?x_cg_demo_api_key=${apiKey}`);
			return response.data.coins;
		},
	});
}

export function useGlobalMarketData() {
	return useQuery({
		queryKey: ['globalMarketData'],
		queryFn: async () => {
			const response = await axios.get<DataMarket>(`${BASE_URL}/global?x_cg_demo_api_key=${apiKey}`);
			return response.data.data;
		},
	});
}

export function useCoinDetailsInfo(id: string) {
	return useQuery({
		queryKey: ['coinDetailsInfo', id],
		queryFn: async () => {
			const response = await axios.get<CoinDetails>(`${BASE_URL}/coins/${id}?x_cg_demo_api_key=${apiKey}`);
			return response.data;
		},
	});
}

export function useHistoricalChartData(id: string) {
	return useQuery({
		queryKey: ['historicalData', id],
		queryFn: async () => {
			const response = await axios.get<ChartData>(
				`${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=1?x_cg_demo_api_key=${apiKey}`
			);
			return response.data;
		},
	});
}
