import Entry from "../data/fpl/Entry";
import React from "react";
import { TableHead, TableCell, Table, TableRow, TableBody } from "@material-ui/core";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import ClubIcon from "./ClubIcon";
import EntryHistory from "../data/fpl/EntryHistory";

export interface TeamInfoTableProps {
    bootstrap?: BootstrapStatic
    entry: Entry
    history?: EntryHistory
}

export default class TeamInfoTable extends React.Component<TeamInfoTableProps> {
    render() {
        const { entry, bootstrap } = this.props;

        if (!entry) {
            return null;
        }

        const favTeam = bootstrap ? bootstrap.teams.find(t => t.id === entry.favourite_team) : undefined;
        return (
        <div className="team-info-table-container">
            <Table>
                <TableHead className="team-info-table-header">
                    <TableRow>
                        <TableCell padding="none" align="center" colSpan={2}>{entry.name}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none">Manager</TableCell>
                        <TableCell padding="none">{`${entry.player_first_name} ${entry.player_last_name}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none">Name</TableCell>
                        <TableCell padding="none">{entry.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none">Location</TableCell>
                        <TableCell padding="none">{entry.player_region_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none">Overall Rank</TableCell>
                        <TableCell padding="none">#{entry.summary_overall_rank.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none">Overall Points</TableCell>
                        <TableCell padding="none">{entry.summary_overall_points}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none">Favorite Team</TableCell>
                        <TableCell padding="none"><div className="team-info-club-icon">{favTeam && <ClubIcon teamCode={favTeam.code} size={"50px"} />}</div></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        );
    }
}