import { CssBaseline } from '@mui/material';
import { GlobalStyles } from '@mui/system';

const GlobalMuiStyles = () => {
    return (
        <>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    '*': {
                        boxSizing: 'border-box',
                        margin: 0,
                        padding: 0,
                    },

                    'html, body': {
                        height: '100%',
                    },
                    html: {
                        scrollBehavior: 'smooth',
                    },
                    body: {
                        margin: 0,
                        fontFamily:
                            '-apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                        fontSize: '19px',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                    },
                    a: {
                        textDecoration: 'none',
                    },
                    button: {
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                    },
                }}
            />
        </>
    );
};

export default GlobalMuiStyles;
