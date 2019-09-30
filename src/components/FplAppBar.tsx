import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, MuiThemeProvider, Box, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import Themes from '../presentation/Themes';
import { StandingsEntry, MappedLeaguesH2hStandings } from '../data/fpl/LeaguesH2hStandings';

import "../styles/app-bar.css"
import Entry from '../data/fpl/Entry';
import GlobalConfig from '../config/GlobalConfig';
import H2hLeague from '../data/fpl/H2hLeague';
import DrawerIconContainer from '../containers/DrawerIconContainer';
import DrawerContainer from '../containers/DrawerContainer';

export interface FplAppBarProps {
    selectedTeam: number,
    leagueId: number,
    mappedStandings?: MappedLeaguesH2hStandings
    onTeamSelect: any
    onLeagueSelect: any
    entries: {[key: number]: Entry}
}

export default class FplAppBar extends React.Component<FplAppBarProps, {}> {
    async componentDidMount() {
    }

    render() {

        return <React.Fragment>
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <Box className="app-bar-toolbox" display="flex" justifyContent="space-between">
                            <Box display="flex" alignItems="center">
                                <DrawerIconContainer/>
                                <div className="fpl-app-bar-title-container">
                                    <Typography variant="h6" className='fpl-app-bar-title'>
                                        FPL Matchtracker
                                    </Typography>
                                </div>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                <DrawerContainer />
            </React.Fragment>
    }
}