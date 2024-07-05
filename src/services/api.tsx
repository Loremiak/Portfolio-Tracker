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
			const { data } = await axios.get<Coins>(`${BASE_URL}/coins/markets`, {
				params: {
					x_cg_demo_api_key: apiKey,
					vs_currency: 'usd',
					per_page: '25',
					page: '1',
				},
				headers: { Accept: 'application/json' },
			});

			return data;
		},
	});
}

export function useCryptocurrenciesListByIds(ids: string[]) {
	return useQuery({
		queryKey: ['cryptocurrenciesList', ids, { ids }],
		queryFn: async () => {
			console.log('ids', ids);
			const { data } = await axios.get<Coins>(`${BASE_URL}/coins/markets`, {
				params: {
					x_cg_demo_api_key: apiKey,
					vs_currency: 'usd',
					per_page: '10',
					page: '1',
					ids: ids.join(','),
				},
				headers: { Accept: 'application/json' },
			});

			return data;
		},
	});
}

export function useTrendingCoins() {
	return useQuery({
		queryKey: ['trendingCoins'],
		queryFn: async () => {
			const { data } = await axios.get<TrendingCoinsData>(`${BASE_URL}/search/trending`, {
				params: {
					x_cg_demo_api_key: apiKey,
				},
				headers: { Accept: 'application/json' },
			});
			return data.coins;
		},
	});
}

export function useGlobalMarketData() {
	return useQuery({
		queryKey: ['globalMarketData'],
		queryFn: async () => {
			const { data } = await axios.get<DataMarket>(`${BASE_URL}/global`, {
				params: {
					x_cg_demo_api_key: apiKey,
				},
				headers: { Accept: 'application/json' },
			});
			return data.data;
		},
	});
}

export function useCoinDetailsInfo(id: string) {
	return useQuery({
		queryKey: ['coinDetailsInfo', id],
		queryFn: async () => {
			const { data } = await axios.get<CoinDetails>(`${BASE_URL}/coins/${id}`, {
				params: {
					x_cg_demo_api_key: apiKey,
				},
				headers: { Accept: 'application/json' },
			});
			return data;
		},
	});
}

export function useHistoricalChartData(id: string) {
	return useQuery({
		queryKey: ['historicalData', id],
		queryFn: async () => {
			const { data } = await axios.get<ChartData>(`${BASE_URL}/coins/${id}/market_chart`, {
				params: {
					x_cg_demo_api_key: apiKey,
					vs_currency: 'usd',
					days: '1',
				},
				headers: { Accept: 'application/json' },
			});
			return data;
		},
	});
}
