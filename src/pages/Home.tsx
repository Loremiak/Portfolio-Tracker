import StyledDataGrid from '../components/dataGrid/StyledDataGrid';
import BoxContainer from '../components/box/BoxContainer';
import { useCryptocurrenciesList, useGlobalMarketData, useTrendingCoins } from '../services/api';
import { Button, Divider, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import SelectOptions from '../components/SelectOptions';
import useAuth from '../hooks/useAuth';
import { useUpdatePortfolioCoins } from '../services/firebaseApi';
import { Box } from '@mui/system';

const Home = () => {
    const { isAuthenticated } = useAuth();

    const [coins, setCoins] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState('5');

    const { data: trendingData, isLoading: isCarouselDataLoading } = useTrendingCoins();

    const { data: coinList } = useCryptocurrenciesList(page, pageSize);

    const { data: globalMarketData, isLoading: isMarketDataLoading } = useGlobalMarketData();

    const updatePortfolioCoinsMutation = useUpdatePortfolioCoins();

    const updatePortfolioCoins = () => {
        updatePortfolioCoinsMutation.mutate(coins);
    };

    return (
        <div>
            <Box margin="4rem 0">
                <Typography variant="h1" fontSize={{ xs: '1.4rem', sm: '1.8rem', md: '2rem' }} marginBottom="0.75rem">
                    Ceny kryptowalut według kapitalizacji rynkowej
                </Typography>
                <Divider sx={{ borderBottomWidth: 2 }} color="#6eacda" />
            </Box>
            {trendingData && globalMarketData ? (
                <BoxContainer
                    coins={trendingData}
                    marketData={globalMarketData}
                    isCarouselDataLoading={isCarouselDataLoading}
                    isMarketDataLoading={isMarketDataLoading}
                />
            ) : null}
            {coins.length > 0 ? (
                <Button variant="outlined" onClick={updatePortfolioCoins}>
                    Dodaj zaznaczone waluty do portfolio ({coins.length})
                </Button>
            ) : (
                <Typography variant="h6" color="gray">
                    {isAuthenticated
                        ? 'Zaznacz dowolne waluty aby dodać je do portfolio'
                        : 'Zaloguj się aby móc dodać wybrane waluty do swojego portfolio'}
                </Typography>
            )}
            {coinList ? (
                <>
                    <StyledDataGrid
                        data={coinList}
                        onRowSelectionModelChange={(selected) => setCoins(selected as string[])}
                        isPortfolioView={false}
                    />
                    <Box display="flex" justifyContent="center" gap="2rem" flexDirection={{ xs: 'column-reverse', md: 'row', lg: 'row' }}>
                        <Pagination
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            count={5}
                            page={page}
                            onChange={(_, page) => setPage(page)}
                            color="primary"
                            shape="rounded"
                        />
                        <SelectOptions
                            pageSize={pageSize}
                            handleChange={(event) => {
                                setPage(1);
                                setPageSize(event.target.value as string);
                            }}
                        />
                    </Box>
                </>
            ) : null}
        </div>
    );
};

export default Home;
