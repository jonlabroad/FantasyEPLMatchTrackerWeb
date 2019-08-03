import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import Themes from '../presentation/Themes';

export interface FplAppBarProps {
    
}

export default class FplAppBar extends React.Component<FplAppBarProps, {}> {
    async componentDidMount() {
    }
    
    render() {
        return (
            <div className="fpl-app-bar">
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <Typography variant="h6" className='fpl-app-bar-title'>
                            FPL Matchtracker
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}