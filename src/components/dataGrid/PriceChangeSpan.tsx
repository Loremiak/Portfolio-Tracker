import React from 'react';
import styled from 'styled-components';

const PriceChangeSpan: React.FC<{ value: number }> = ({ value }) => {
	const isPositive = value > 0;

	return <StyledSpan $isPriceChangePositive={isPositive}>{isPositive ? `+${value}` : `${value}`}%</StyledSpan>;
};

const StyledSpan = styled.span<{ $isPriceChangePositive: boolean }>`
	color: ${({ $isPriceChangePositive }) => ($isPriceChangePositive ? 'green' : 'red')};
`;

export default PriceChangeSpan;
