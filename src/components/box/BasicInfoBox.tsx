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
			display='flex'
			flexDirection='column'
			justifyContent='space-between'
			border='2px solid #6eacda'
			padding='1rem'
			height='100%'
			bgcolor='white'>
			<p>{formatNumber(value)} USD</p>
			<p>
				<Typography
					component='span'
					fontWeight='bold'
					color={Number(marketCapPercent) > 0 ? 'green' : 'red'}></Typography>
				<span>{information} </span>
				{marketCapPercent ? (
					<Typography component='span' fontWeight='bold' color={Number(marketCapPercent) > 0 ? 'green' : 'red'}>
						{marketCapPercent}%
					</Typography>
				) : null}
			</p>
		</Box>
	);
};

export default BasicInfoBox;
