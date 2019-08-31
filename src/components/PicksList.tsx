import React from "react";
import { Table, TableRow, TableHead, TableCell, TableBody, Box, Typography, Hidden } from "@material-ui/core";
import Picks from "../data/fpl/Picks";
import Pick from "../data/fpl/Pick";
import BootstrapHelper from "../util/BootstrapHelper";
import Live from "../data/fpl/Live";
import LiveHelper from "../util/LiveHelper";
import PointsIcons from "./PointsIcons";
import ScoreCalculator from "../util/ScoreCalculator";
import ClubIcon from "./ClubIcon";

import "../styles/picks-list.css";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";

export interface PicksListProps {
    picks: Picks
    live?: Live
    bootstrapStatic?: BootstrapStatic
}

const noIconPerEventTypes = [
    "minutes_played",
    "minutes",
    "bps"
];

export default class PicksList extends React.Component<PicksListProps> {
    getTeamCode(pick: Pick) {
        const element = BootstrapHelper.getElement(pick.element, this.props.bootstrapStatic);
        if (element) {
            return element.team_code;
        }
    }
    
    getCaptain(pick: Pick): string {
        if (pick.is_captain) {
            return "C";
        }
        else if (pick.is_vice_captain) {
            return "VC";
        }
        return "";
    }

    renderLive(pick: Pick) {
        const liveElement = LiveHelper.getElement(pick.element, this.props.live);
        if (liveElement) {
            return <PointsIcons liveElement={liveElement}/>;
        }
        return null;
    }

    renderPick(pick: Pick, starter: boolean) {
        const element = BootstrapHelper.getElement(pick.element, this.props.bootstrapStatic);
        return (
            <TableRow key={pick.element} className={starter ? "pickslist-starter" : "pickslist-sub"}>
                <TableCell padding="none">{element ? ScoreCalculator.calculateElementScore(pick, this.props.live, !starter): 0}</TableCell>
                <TableCell padding="none" className="hidden-xs club-icon-cell"><ClubIcon teamCode={this.getTeamCode(pick)}/></TableCell>
                <TableCell padding="none" className="club-captain-cell">{this.getCaptain(pick)}</TableCell>
                <TableCell padding="none">{element ? element.web_name : pick.element}</TableCell>
                <TableCell padding="none">{element ? BootstrapHelper.getPosition(element.element_type) : pick.position}</TableCell>
                <TableCell padding="none">{this.renderLive(pick)}</TableCell>
            </TableRow>
        );
    }

    renderPicks(start: number, end: number, starters: boolean): JSX.Element[] {
        const elements: JSX.Element[] = [];
        for (let pick of this.props.picks.picks.slice(start, end)) {
            elements.push(this.renderPick(pick, starters));
        }
        return elements;
    }
    
    render() {
        if (!this.props.picks || !this.props.picks.picks) {
            return null;
        }

        console.log({picks: this.props.picks});

        return (
        <div className="pickslist-container">
            <Table size="small">
                <TableHead className="pickslist-header">
                    <TableRow>
                        <TableCell padding="none">Pts</TableCell>
                        <TableCell padding="none">Club</TableCell>
                        <TableCell padding="none">Cpt</TableCell>
                        <TableCell padding="none">Name</TableCell>
                        <TableCell padding="none">Pos</TableCell>
                        <TableCell padding="none">Activity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow><TableCell padding="none" colSpan={6}><Typography className="starters-header" variant="subtitle1">Starting 11</Typography></TableCell></TableRow>
                    {this.renderPicks(0, 11, true)}
                    <TableRow><TableCell padding="none" colSpan={6}><Typography className="subs-header" variant="subtitle1">Subs</Typography></TableCell></TableRow>
                    {this.renderPicks(11, 15, false)}
                </TableBody>
            </Table>
        </div>
        );
    }
}