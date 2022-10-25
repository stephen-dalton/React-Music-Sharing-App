import { createTheme } from '@mui/material/styles';
import { blueGrey, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: blueGrey,
    divider: blueGrey[700],
    background: {
      default: blueGrey[900],
      paper: blueGrey['A400'],
    },
    text: {
      primary: '#fff',
      secondary: grey[500],
      alt: grey[900]
    }
  }
});


export default theme;