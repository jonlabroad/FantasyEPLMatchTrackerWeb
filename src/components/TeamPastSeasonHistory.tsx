import React from 'react';
import EntryHistory from "../data/fpl/EntryHistory";
import { TableRow, TableCell, Typography, Table, TableHead, TableBody } from '@material-ui/core';

export interface TeamPastSeasonHistoryProps {
    history?: EntryHistory
}

export const TeamPastSeasonHistory: React.SFC<TeamPastSeasonHistoryProps> = (props) => {
    const {history} = props;

    if (!history) {
        return null;
    }

    var historyElements = history.past.map(past => {
        return (
            <TableRow key={`${past.season_name}`}>
                <TableCell padding="none">{past.season_name}</TableCell>
                <TableCell padding="none">{past.rank.toLocaleString()}</TableCell>
                <TableCell padding="none">{past.total_points.toLocaleString()}</TableCell>
            </TableRow>
        );
    });

    return (
        <React.Fragment>
        <Typography variant="h6" align="center">Manager History</Typography>
        <Table>
            <TableHead>
                <TableRow>
                <TableCell padding="none">Season</TableCell>
                <TableCell padding="none">Rank</TableCell>
                <TableCell padding="none">Pts</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {historyElements}
            </TableBody>
        </Table>
        </React.Fragment>
    );
}