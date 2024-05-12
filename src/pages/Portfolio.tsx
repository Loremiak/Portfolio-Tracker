import styled from 'styled-components';
import StyledDataGrid from '../components/StyledDataGrid';

const Portfolio = () => {
	return (
		<div>
			<StyledInfoContainer>
				<p>Twój portfel aktywów</p>
				<p>Możesz tutaj przeglądać twoje obecne portfolio oraz sprawdzać ile zarobiłeś</p>
			</StyledInfoContainer>
			<h1>Twoje portfolio</h1>
			<StyledDataGrid></StyledDataGrid>
		</div>
	);
};

const StyledInfoContainer = styled.div`
	background-color: lightblue;
`;

export default Portfolio;
