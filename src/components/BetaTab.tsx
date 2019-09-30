import React from "react";
import Entry from "../data/fpl/Entry";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import Picks from "../data/fpl/Picks";
import { Grid, Hidden } from "@material-ui/core";

import '../styles/team-info.css';
import GameweekTimelinePlot from "./GameweekTimelinePlot";
import GameweekTimeline from "../data/GameweekTimeline";
import TimelineDetails from "./TimelineDetails";
import TimelinesHelper from "../util/TimelinesHelper";
import Fixture from "../data/fpl/Fixture";
import { ProcessedPlayers } from "../data/ProcessedPlayers";

export interface BetaTabProps {
    bootstrap?: BootstrapStatic
    entries: Entry[]
    picks: Picks[]
    fixtures?: Fixture[]
    timeline?: GameweekTimeline
    processedPlayers?: ProcessedPlayers
}

export default class BetaTab extends React.Component<BetaTabProps> {
    shouldComponentUpdate(nextProps: BetaTabProps, nextState: any): boolean {
        return !!nextProps.bootstrap && !!nextProps.timeline;
    }

    render() {
        const { bootstrap, entries, picks, timeline, fixtures, processedPlayers } = this.props;

        if (!bootstrap || !timeline || !picks[0] || !entries[0]) {
            return null;
        }

        return (
            <Grid container justify="center" spacing={2} className="tracker-tab beta-tab">
                <Hidden xsDown><Grid item xs={2}></Grid></Hidden>
                <Grid item xs={12} sm={8}>
                    <GameweekTimelinePlot
                        bootstrap={bootstrap}
                        entries={entries}
                        picks={picks}
                        timeline={timeline}
                        fixtures={fixtures}
                        processedPlayers={processedPlayers}
                    />
                </Grid>
                <Hidden xsDown><Grid item xs={2}></Grid></Hidden>
                <Hidden xsDown><Grid item xs={2}></Grid></Hidden>
                <Grid item xs={6} sm={4}>
                    <TimelineDetails
                        bootstrap={bootstrap}
                        entries={entries[0]}
                        picks={picks[0]}
                        timeline={timeline}
                    />
                </Grid>
                {entries[1] && picks[1] && 
                <Grid item xs={6} sm={4}>
                    <TimelineDetails
                        bootstrap={bootstrap}
                        entries={entries[1]}
                        picks={picks[1]}
                        timeline={timeline}
                    />
                </Grid>
                }
                <Hidden xsDown><Grid item xs={2}></Grid></Hidden>
            </Grid>
        );
    }
}