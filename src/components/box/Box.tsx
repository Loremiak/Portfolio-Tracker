import styled from 'styled-components';
import { formatNumber } from '../../helpers/formatNumber';

type BoxProps = {
	value: number;
	information: string;
};

const Box = ({ value, information }: BoxProps) => {
	return (
		<BoxContainer>
			<p>{formatNumber(value)} USD</p>
			<p>{information}</p>
		</BoxContainer>
	);
};

const BoxContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border: 2px solid gray;
	padding: 1rem;
`;

export default Box;
