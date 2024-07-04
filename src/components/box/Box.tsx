import styled from 'styled-components';
import { formatNumber } from '../../helpers/formatNumber';

type BoxProps = {
	value: number;
	information: string;
	marketCapPercent?: string;
};

const Box = ({ value, information, marketCapPercent }: BoxProps) => {
	return (
		<BoxContainer>
			<p>{formatNumber(value)} USD</p>
			<p>
				<span>{information} </span>
				{marketCapPercent ? (
					<StyledSpan $isMarketCapChangePositive={Number(marketCapPercent) > 1}>{marketCapPercent}</StyledSpan>
				) : null}
			</p>
		</BoxContainer>
	);
};

const BoxContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border: 2px solid gray;
	padding: 1rem;
	height: 100%;
`;

const StyledSpan = styled.span<{ $isMarketCapChangePositive: boolean }>`
	color: ${({ $isMarketCapChangePositive }) => ($isMarketCapChangePositive ? 'green' : 'red')};
	font-weight: bold;
`;

export default Box;
