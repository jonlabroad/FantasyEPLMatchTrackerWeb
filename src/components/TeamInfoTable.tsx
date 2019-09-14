import Entry from "../data/fpl/Entry";
import React from "react";
import { TableHead, TableCell, Table, TableRow, TableBody, Typography } from "@material-ui/core";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import BootstrapHelper from "../util/BootstrapHelper";
import ClubIcon from "./ClubIcon";

export interface TeamInfoTableProps {
    bootstrap?: BootstrapStatic
    entry: Entry
}

export default class TeamInfoTable extends React.Component<TeamInfoTableProps> {
    render() {
        const { entry, bootstrap } = this.props;

        if (!entry) {
            return null;
        }

        const favTeam = bootstrap ? bootstrap.teams.find(t => t.id === entry.favourite_team) : undefined;
        console.log(bootstrap ? bootstrap.teams : null);
        console.log({fav: favTeam});
        return (
        <div className="tema-info-table-container">
            <Table>
                <TableHead className="team-info-table-header">
                    <TableRow>
                        {/*
                        <TableCell padding="none" align="center">Pts</TableCell>
                        <TableCell padding="none" align="center">Club</TableCell>
                        <TableCell padding="none" align="center">Status</TableCell>
                        <TableCell padding="none" align="center">Cpt</TableCell>
                        <TableCell padding="none">Name</TableCell>
                        <TableCell padding="none" align="center">Pos</TableCell>
                        <TableCell padding="none">Activity</TableCell>
                        */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none"><Typography className="info-table-label" variant="subtitle1">Player Name</Typography></TableCell>
                        <TableCell padding="none"><Typography className="info-table-label" variant="subtitle1">{`${entry.player_first_name} ${entry.player_last_name}`}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none"><Typography className="info-table-label" variant="subtitle1">Name</Typography></TableCell>
                        <TableCell padding="none"><Typography className="info-table-label" variant="subtitle1">{entry.name}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none"><Typography className="info-table-label" variant="subtitle1">Location</Typography></TableCell>
                        <TableCell padding="none"><Typography className="info-table-label" variant="subtitle1">{entry.player_region_name}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none"><Typography className="info-table-label" variant="subtitle1">Overall Rank</Typography></TableCell>
                        <TableCell padding="none"><Typography className="info-table-label" variant="subtitle1">{entry.summary_overall_rank}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none"><Typography className="info-table-label" variant="subtitle1">Overall Points</Typography></TableCell>
                        <TableCell padding="none"><Typography className="info-table-label" variant="subtitle1">{entry.summary_overall_points}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none"><Typography className="info-table-label" variant="subtitle1">Favorite Team</Typography></TableCell>
                    <TableCell padding="none">{favTeam && <ClubIcon teamCode={favTeam.code} size={"50px"} />}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        );
    }
}