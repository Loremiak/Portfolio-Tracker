import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type CoinInfoContainerProps = {
    marketCap: number;
    totalVolume: number;
    circulatingSupply: number;
    maxSupply: number;
};

const CoinInfoContainer: React.FC<CoinInfoContainerProps> = ({ marketCap, totalVolume, circulatingSupply, maxSupply }) => {
    return (
        <Box display="flex" flexDirection="column" gap="1rem">
            <Divider color="#6eacda" />
            <DetailCoin label="Kapitalizacja rynkowa" info={marketCap} />
            <DetailCoin label="24 godz. wolumen handlu" info={totalVolume} />
            <DetailCoin label="Zasoby w obiegu" info={circulatingSupply} />
            <DetailCoin label="Maksymalne zasoby" info={maxSupply} />
        </Box>
    );
};

const DetailCoin: React.FC<{ label: string; info: number }> = ({ label, info }) => {
    return (
        <>
            <Box width="100%" display="flex" justifyContent="space-between">
                <p>{label}</p>
                <p>{info}</p>
            </Box>
            <Divider color="#6eacda" />
        </>
    );
};

export default CoinInfoContainer;
