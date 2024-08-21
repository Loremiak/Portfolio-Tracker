import React from 'react';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

interface PriceChangeSpanProps {
	value: number;
}

const PriceChangeSpan: React.FC<PriceChangeSpanProps> = ({ value }) => {
	const isPositive = value > 0;

	return (
		<StyledTypography $isPriceChangePositive={isPositive}>{isPositive ? `+${value}` : `${value}`}%</StyledTypography>
	);
};

const StyledTypography = styled(Typography, {
	shouldForwardProp: prop => prop !== '$isPriceChangePositive',
})<{ $isPriceChangePositive: boolean }>(({ $isPriceChangePositive }) => ({
	color: $isPriceChangePositive ? 'green' : 'red',
	marginTop: '15px',
}));

export default PriceChangeSpan;
