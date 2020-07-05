// Imports
import React from 'react';
import Container from 'react-bootstrap/Container';
import { AppProps } from 'next/app';

import './app.scss';

// App Component
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <Container fluid>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
        </Container>
    );
};

// Exports
export default App;
