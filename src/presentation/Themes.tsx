import  { createMuiTheme } from '@material-ui/core/styles';

export default class Themes {
    public static mainTheme = createMuiTheme({
        palette: {
            primary: {
                main: '#37003C'
            },
            secondary: {
                main: '#ff2882'
            }
        },
        overrides: {
            MuiSelect: {
                root: {
                    color: "#f5f5f5 !important",
                },
                icon: {
                    color: "white"
                }
            }
        }
    });
}