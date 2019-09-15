import React from 'react'
import EntryHistory from "../data/fpl/EntryHistory";
import { TableRow, TableCell, Table, TableHead, TableBody, Typography } from "@material-ui/core";

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
            <TableRow key={`${curr.event}`}>
                <TableCell padding="none">{curr.event}</TableCell>
                <TableCell padding="none">{curr.points}</TableCell>
                <TableCell padding="none">{curr.points_on_bench}</TableCell>
                <TableCell padding="none">#{curr.rank}</TableCell>
                <TableCell padding="none">#{curr.overall_rank.toLocaleString()}</TableCell>
                <TableCell padding="none">{curr.total_points.toLocaleString()}</TableCell>
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
                <TableCell padding="none">Bench</TableCell>
                <TableCell padding="none">GW Rank</TableCell>
                <TableCell padding="none">Rank</TableCell>
                <TableCell padding="none">Total Pts</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {historyElements}
            </TableBody>
        </Table>
        </React.Fragment>
    );
}