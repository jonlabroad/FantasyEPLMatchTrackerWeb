import React from "react";
import { Table, TableRow, TableHead, TableCell, TableBody, Box } from "@material-ui/core";
import Picks from "../data/fpl/Picks";
import Pick from "../data/fpl/Pick";
import Bootstrap from "../data/fpl/Bootstrap";
import BootstrapHelper from "../util/BootstrapHelper";
import Live from "../data/fpl/Live";
import LiveHelper from "../util/LiveHelper";
import { PointsIcon } from "./PointsIcon";
import PointsIcons from "./PointsIcons";
import ScoreCalculator from "../util/ScoreCalculator";

export interface PicksListProps {
    picks: Picks
    live?: Live
    bootstrap?: Bootstrap
}

const noIconPerEventTypes = [
    "minutes_played",
    "minutes",
    "bps"
];

export default class PicksList extends React.Component<PicksListProps> {
    renderLive(pick: Pick) {
        const liveElement = LiveHelper.getElement(pick.element, this.props.live);
        if (liveElement) {
            return <PointsIcons explainsArray={liveElement.explain}/>;
        }
        return null;
    }

    renderPick(pick: Pick) {
        const element = BootstrapHelper.getElement(pick.element, this.props.bootstrap);
        return (
            <TableRow key={pick.element}>
                <TableCell>{element ? ScoreCalculator.calculateElementScore(pick, this.props.live): 0}</TableCell>
                <TableCell>{element ? element.web_name : pick.element}</TableCell>
                <TableCell>{element ? BootstrapHelper.getPosition(element.element_type) : pick.position}</TableCell>
                <TableCell>{this.renderLive(pick)}</TableCell>
            </TableRow>
        );
    }

    renderPicks(start: number, end: number): JSX.Element[] {
        const elements: JSX.Element[] = [];
        for (let pick of this.props.picks.picks.slice(start, end)) {
            elements.push(this.renderPick(pick));
        }
        return elements;
    }
    
    render() {
        if (!this.props.picks) {
            return null;
        }

        return (
        <div className="pickslist-container">
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Points</TableCell>
                        <TableCell>Player</TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>Activity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.renderPicks(0, 11)}
                </TableBody>
            </Table>
        </div>
        );
    }
}