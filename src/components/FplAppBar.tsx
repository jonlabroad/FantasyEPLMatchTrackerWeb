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

    renderLeagueSelect(): JSX.Element | null {
        const { entries, selectedTeam, leagueId } = this.props;
        const leaguesToShow: H2hLeague[] = [];
        if (entries && entries[selectedTeam]) {
            const entry = entries[selectedTeam];
            for (var possibleLeague of GlobalConfig.Leagues) {
                var league = entry.leagues.h2h.find(l => l.id === possibleLeague);
                if (league) {
                    leaguesToShow.push(league);
                }
            }
        }

        if (leaguesToShow.length <= 1) {
            return null;
        }

        return (
            <div className="league-selector-container">
                <Select
                    className="league-selector"
                    value={leagueId}
                    onChange={this.props.onLeagueSelect}
                >
                    {leaguesToShow.map(league => <MenuItem value={league.id}>{league.name}</MenuItem>)}
                </Select>
            </div>
            );
    }

    render() {

        return (
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <Box className="app-bar-toolbox" display="flex" justifyContent="space-between">
                            <div className="fpl-app-bar-title-container">
                                <Typography variant="h6" className='fpl-app-bar-title'>
                                    FPL Matchtracker
                                </Typography>
                            </div>
                            <Box display="flex" flexDirection="column">
                                {this.renderLeagueSelect()}
                                {this.renderTeamSelect()}
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
        );
    }
}