import React from "react";
import { Drawer, IconButton, Divider, List, ListItemText, ListItem, MenuItem, Select, Box } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LeaguesH2hStandings from "../data/fpl/LeaguesH2hStandings";
import Entry from "../data/fpl/Entry";
import GlobalConfig from "../config/GlobalConfig";
import H2hLeague from "../data/fpl/H2hLeague";

export interface TrackerDrawerProps {
    open: boolean
    entries: {[key: number]: Entry}
    standings: LeaguesH2hStandings
    leagueId: number
    team: number
    onClose: any
    onTeamSelect: any
    onLeagueSelect: any
}

export default class TrackerDrawer extends React.Component<TrackerDrawerProps> {
    renderLeagueSelect(): JSX.Element | null {
        const { entries, team, leagueId } = this.props;
        const leaguesToShow: H2hLeague[] = [];
        if (entries && entries[team]) {
            const entry = entries[team];
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
        <Select
            className="league-selector"
            value={leagueId}
            onChange={this.props.onLeagueSelect}
        >
            {leaguesToShow.map(league => <MenuItem key={league.id} value={league.id}>{league.name}</MenuItem>)}
        </Select>
        );
    }
    
    render() {
        const { open, onClose, onTeamSelect, standings, team, leagueId } = this.props;

        return (
            <div>
                <Drawer
                    open={open}
                >
                    <Box className="drawer-header" display="flex" justifyContent="flex-end">
                        <IconButton onClick={onClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Box>
                    <Divider />
                    <List>
                        <ListItem>
                            <Select
                                value={team}
                                onChange={onTeamSelect}
                            >
                                {standings.standings.results.map(entry => <MenuItem key={entry.id} value={entry.entry}>{entry.entry_name}</MenuItem>)}
                            </Select>
                        </ListItem>
                        <ListItem>
                            {this.renderLeagueSelect()}
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        );
    }
}