import React from 'react'
import EntryHistory from "../data/fpl/EntryHistory";
import { TableRow, TableCell, Table, TableHead, TableBody, Typography, Hidden } from "@material-ui/core";

export interface TeamHistoryTableProps {
    history: EntryHistory
}

export const TeamHistoryTable: React.SFC<TeamHistoryTableProps> = (props) => {
    const {history} = props;

    if (!history) {
        return null;
    }

    var historyElements = history.current.map(curr => {
        return (
            curr && curr.rank && <TableRow key={`${curr.event}`}>
                <TableCell padding="none">{curr.event}</TableCell>
                <TableCell padding="none">{curr.points}</TableCell>
                <Hidden xsDown><TableCell padding="none">{curr.points_on_bench}</TableCell></Hidden>
                <TableCell padding="none">#{curr.rank ? curr.rank.toLocaleString() : ""}</TableCell>
                <TableCell padding="none">#{curr.overall_rank ? curr.overall_rank.toLocaleString() : ""}</TableCell>
                <Hidden xsDown><TableCell padding="none">{curr.total_points ? curr.total_points.toLocaleString() : ""}</TableCell></Hidden>
            </TableRow>
        );
    });

    return (
        <React.Fragment>
        <Typography variant="h6" align="center">Gameweek History</Typography>
        <Table>
            <TableHead>
                <TableRow>
                <TableCell padding="none">GW</TableCell>
                <TableCell padding="none">Pts</TableCell>
                <Hidden xsDown><TableCell padding="none">Bench</TableCell></Hidden>
                <TableCell padding="none">GW Rank</TableCell>
                <TableCell padding="none">Rank</TableCell>
                <Hidden xsDown><TableCell padding="none">Total Pts</TableCell></Hidden>
                </TableRow>
            </TableHead>
            <TableBody>
                {historyElements}
            </TableBody>
        </Table>
        </React.Fragment>
    );
}