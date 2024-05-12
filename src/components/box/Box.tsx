import styled from 'styled-components';
import handleBiggerValues from '../../helpers/handleBiggerValues';

type BoxProps = {
	value: number;
	information: string;
};

const Box = ({ value, information }: BoxProps) => {
	return (
		<BoxContainer>
			<p>{handleBiggerValues(value)} USD</p>
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
