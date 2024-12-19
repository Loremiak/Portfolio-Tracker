import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const BASE_URL = 'https://api.coingecko.com/api/v3/coins/bitcoin';

const mock = new MockAdapter(axios);

describe('Integration with CoinGecko API', () => {
    it('correctly fetch crypto data', async () => {
        mock.onGet(BASE_URL).reply(200, {
            id: 'bitcoin',
            name: 'Bitcoin',
            market_cap: 600000000000,
            price: 45000,
        });

        const response = await axios.get(BASE_URL);

        expect(response.data.name).toBe('Bitcoin');
        expect(response.data.market_cap).toBe(600000000000);
        expect(response.data.price).toBe(45000);
    });

    it('correctly fetch crypto data', async () => {
        mock.onGet(BASE_URL).reply(400);

        try {
            await axios.get(BASE_URL);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                expect(error.response?.status).toBe(400);
            } else {
                fail('Nieoczekiwany błąd');
            }
        }
    });

    it('correctly fetch crypto data', async () => {
        mock.onGet(BASE_URL).timeout();
        try {
            await axios.get(BASE_URL);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                expect(error.code).toBe('ECONNABORTED');
            } else {
                fail('Nieoczekiwany błąd');
            }
        }
    });
});
