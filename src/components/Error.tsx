import { Box } from '@mui/system';
import StyledLink from './StyledLink';

const Error = () => {
	return (
		<Box marginTop='5rem'>
			<StyledLink
				label='Wystąpił błąd, spróbuj odświeżyć stronę oraz przejść na stronę główną.'
				fontSize='2rem'
				fontWeight='bolder'
			/>
		</Box>
	);
};

export default Error;
