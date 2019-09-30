import React from "react";
import LeaguesH2hStandings, { StandingsEntry } from "../data/fpl/LeaguesH2hStandings";
import { Table, TableHead, TableCell, TableRow, TableBody, Typography, Hidden, Link } from "@material-ui/core";

import "../styles/standings.css"

export interface LeagueH2hStandingsListProps {
    teams: number[]
    standings?: LeaguesH2hStandings

    onTeamClick: any
}

export default class LeagueH2hStandingsList extends React.Component<LeagueH2hStandingsListProps> {
    shouldComponentUpdate(newProps: LeagueH2hStandingsListProps): boolean {
        return !!newProps.standings;
    }

    renderLine(standing: StandingsEntry) {
        return (
        <TableRow key={standing.id} className={this.props.teams.includes(standing.entry) ? "standing-current-team" : ""}>
            <TableCell padding="none" align="center">{standing.rank}</TableCell>
            <TableCell padding="none" style={{cursor: "pointer"}} onClick={() => this.props.onTeamClick(standing.entry)}><Link>{standing.entry_name}</Link></TableCell>
            <Hidden smDown><TableCell padding="none">{standing.player_name}</TableCell></Hidden>
            <TableCell padding="none" align="center">{standing.matches_won}-{standing.matches_drawn}-{standing.matches_lost}</TableCell>
            <TableCell padding="none" align="center">{standing.points_for}</TableCell>
        </TableRow>
        );
    }
    
    render() {
        const { standings } = this.props;
        if (!standings) {
            return null;
        }
        return (
            <div className="standings-container">
            <Typography className="fixture-list-header" variant="subtitle1">{standings.league.name}</Typography>
            <Table size="small">
                <TableHead className="standings-header">
                    <TableRow>
                        <TableCell padding="none" align="center">Rank</TableCell>
                        <TableCell padding="none">Team</TableCell>
                        <Hidden smDown><TableCell padding="none">Manager</TableCell></Hidden>
                        <TableCell padding="none" align="center">W-D-L</TableCell>
                        <TableCell padding="none" align="center">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {standings.standings.results.sort((a,b) => a.rank - b.rank).map(s => this.renderLine(s))}
                </TableBody>
            </Table>
        </div>
        );
    }
}