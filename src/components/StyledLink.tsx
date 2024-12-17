import { Typography, TypographyProps } from '@mui/material';
import { Link } from 'react-router-dom';

type StyledLinkProps = TypographyProps & {
    linkTo?: string;
    label: string;
};

const StyledLink: React.FC<StyledLinkProps> = ({ linkTo = '/', label, ...props }) => {
    return (
        <Link to={linkTo}>
            <Typography fontSize="1rem" color="#03346E" {...props}>
                {label}
            </Typography>
        </Link>
    );
};

export default StyledLink;
