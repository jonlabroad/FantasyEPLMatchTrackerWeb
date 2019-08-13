import React from "react";
import LeaguesH2hStandings, { StandingsEntry } from "../data/fpl/LeaguesH2hStandings";
import { Table, TableHead, TableCell, TableRow, TableBody, Typography, Hidden } from "@material-ui/core";

export interface LeagueH2hStandingsListProps {
    standings?: LeaguesH2hStandings
}

export default class LeagueH2hStandingsList extends React.Component<LeagueH2hStandingsListProps> {
    renderLine(standing: StandingsEntry) {
        return (
        <TableRow>
            <TableCell padding="none">{standing.rank}</TableCell>
            <TableCell padding="none">{standing.entry_name}</TableCell>
            <Hidden xsDown><TableCell padding="none">{standing.player_name}</TableCell></Hidden>
            <TableCell padding="none">{standing.matches_won}-{standing.matches_drawn}-{standing.matches_lost}</TableCell>
            <TableCell padding="none">{standing.points_for}</TableCell>
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
            <Table size="small">
                <TableHead className="standings-header">
                    <TableRow>
                        <TableCell padding="none">Rank</TableCell>
                        <TableCell padding="none">Team</TableCell>
                        <Hidden xsDown><TableCell padding="none">Manager</TableCell></Hidden>
                        <TableCell padding="none">W-D-L</TableCell>
                        <TableCell padding="none">Total</TableCell>
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