import React from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import theme from './core-utils/theme';
import MapBox from './components/MapBox';

const App: React.FC<{}> = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline>
                <div>
                    <MapBox />
                </div>
            </CssBaseline>
        </MuiThemeProvider>

    );
}
export default App