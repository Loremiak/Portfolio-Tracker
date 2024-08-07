import { Typography } from '@mui/material';
import { Box } from '@mui/system';

type ImageCoinContainer = {
	imgSrc: string;
	coinName: string;
	coinSymbol: string;
	marketCapRank: number;
	currentPrice: number;
};

const ImageCoinContainer: React.FC<ImageCoinContainer> = ({
	imgSrc,
	coinName,
	coinSymbol,
	marketCapRank,
	currentPrice,
}) => {
	return (
		<Box display='flex' flexDirection='column' alignItems='center' marginBottom='1.5rem'>
			<Box component='img' src={imgSrc} alt={coinName} width='150px'></Box>
			<p>
				<Typography component='span' fontWeight='bold' fontSize='1.5rem'>
					{coinName}{' '}
				</Typography>
				<span>Kurs {coinSymbol.toUpperCase()} </span>
				<span>#{marketCapRank} </span>
			</p>
			<Typography component='span' fontWeight='bold' fontSize='1.5rem'>
				{currentPrice} USD
			</Typography>
		</Box>
	);
};

export default ImageCoinContainer;
