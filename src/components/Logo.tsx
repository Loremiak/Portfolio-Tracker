import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const Logo = () => {
    return (
        <Box
            component={Link}
            to="/"
            display="flex"
            alignItems="center"
            color="black"
            sx={{
                textDecoration: 'none',
            }}
        >
            <Box component="img" alt="logo" src={logo} width={{ xs: '50px', sm: '75px', md: '100px' }} />
            <Typography component="span" fontSize={{ xs: '0.8rem', sm: '1rem', md: '1.25rem' }}>
                Portfolio Tracker
            </Typography>
        </Box>
    );
};

export default Logo;
