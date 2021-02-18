import React from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import theme from './core-utils/theme';
import MapSearch from './components/organisms/MapSearch';

const App: React.FC<{}> = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline>
                <div>
                    <MapSearch />
                </div>
            </CssBaseline>
        </MuiThemeProvider>

    );
}
export default App