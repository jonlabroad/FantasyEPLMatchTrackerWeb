import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, MuiThemeProvider, Box, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import Themes from '../presentation/Themes';
import { StandingsEntry, MappedLeaguesH2hStandings } from '../data/fpl/LeaguesH2hStandings';

import "../styles/app-bar.css"

export interface FplAppBarProps {
    selectedTeam: number,
    leagueId: number,
    mappedStandings?: MappedLeaguesH2hStandings
    onTeamSelect: any
}

export default class FplAppBar extends React.Component<FplAppBarProps, {}> {
    async componentDidMount() {
    }
    
    renderTeamSelect(): JSX.Element | null {
        const { mappedStandings, selectedTeam, leagueId} = this.props;
       
        if (!mappedStandings || !mappedStandings[leagueId] || !selectedTeam) {
            return null;
        }

        const standings = mappedStandings[leagueId];
        return (
        <div className="team-selector-container">
            <Select
                className="team-selector"
                value={selectedTeam}
                onChange={this.props.onTeamSelect}
            >
                {standings.standings.results.map(entry => <MenuItem value={entry.entry}>{entry.entry_name}</MenuItem>)}
            </Select>
        </div>
        );
    }

    render() {

        return (
            <div className="fpl-app-bar">
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <Box className="app-bar-toolbox" display="flex" justifyContent="space-between">
                            <div className="fpl-app-bar-title-container">
                                <Typography variant="h6" className='fpl-app-bar-title'>
                                    FPL Matchtracker
                                </Typography>
                            </div>
                            {this.renderTeamSelect()}
                        </Box>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}