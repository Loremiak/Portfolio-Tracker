import { formatNumber } from '../../helpers/formatNumber';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

type BoxProps = {
    value: number;
    information: string;
    marketCapPercent?: string;
};

const BasicInfoBox = ({ value, information, marketCapPercent }: BoxProps) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            border="2px solid #6eacda"
            padding="1rem"
            height="100%"
            bgcolor="white"
        >
            <Typography component="p" fontSize={{ xs: '0.85rem', sm: '1rem', md: '1.25rem' }}>
                {formatNumber(value)} USD
            </Typography>
            <Typography component="p" fontSize={{ xs: '0.85rem', sm: '1rem', md: '1.15rem' }}>
                <span>{information} </span>
                {marketCapPercent ? (
                    <Typography
                        component="span"
                        fontWeight="bold"
                        color={Number(marketCapPercent) > 0 ? 'green' : 'red'}
                        fontSize={{ xs: '0.85rem', sm: '1rem', md: '1.15rem' }}
                    >
                        {Number(marketCapPercent) > 0 ? `+${marketCapPercent}` : marketCapPercent}%
                    </Typography>
                ) : null}
            </Typography>
        </Box>
    );
};

export default BasicInfoBox;
