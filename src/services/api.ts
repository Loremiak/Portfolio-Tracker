import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChartData, CoinDetails, Coins, DataMarket, TrendingCoinsData } from './types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const apiKey = import.meta.env.VITE_APP_API_KEY;

export function useCryptocurrenciesList(page: number, pageSize: string) {
    return useQuery({
        queryKey: ['cryptocurrenciesList', page, pageSize],
        queryFn: async () => {
            const { data } = await axios.get<Coins>(`${BASE_URL}/coins/markets`, {
                params: {
                    x_cg_demo_api_key: apiKey,
                    vs_currency: 'usd',
                    per_page: pageSize,
                    page: String(page),
                },
                headers: { Accept: 'application/json' },
            });

            return data;
        },
    });
}

export function useCryptocurrenciesListByIds(ids: string[]) {
    return useQuery({
        queryKey: ['cryptocurrenciesList', ids],
        queryFn: async () => {
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
