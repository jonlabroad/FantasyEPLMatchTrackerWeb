import  { createMuiTheme } from '@material-ui/core/styles';

export default class Themes {
    public static mainTheme = createMuiTheme({
        palette: {
            primary: {
                main: '#37003c'
            },
            secondary: {
                main: '#ff2882'
            }
        }
    });
}