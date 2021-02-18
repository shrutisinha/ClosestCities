import { createMuiTheme } from '@material-ui/core/styles';

export const pxToRem = (fontSize) => {
  return `${fontSize / 16}rem`;
};

// A custom theme for this app
const theme = createMuiTheme({
  spacing: 4
});

export default theme;
