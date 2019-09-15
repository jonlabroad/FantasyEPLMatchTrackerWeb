import React from "react";
import Entry from "../data/fpl/Entry";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import Picks from "../data/fpl/Picks";
import TeamTabInfo from "./TeamTabInfo";
import { Grid, Hidden } from "@material-ui/core";

import '../styles/team-info.css';
import EntryHistory from "../data/fpl/EntryHistory";
import { TeamHistoryTable } from "./TeamHistoryTable";
import { TeamPastSeasonHistory } from "./TeamPastSeasonHistory";
import PointsHistoryChart from "./PointsHistoryChart";

export interface TeamsTabProps {
    bootstrap?: BootstrapStatic
    entries: Entry[]
    history: EntryHistory[]
    picks: Picks[]
}

export default class TeamsTab extends React.Component<TeamsTabProps> {
    render() {
        const { bootstrap, entries, picks, history } = this.props;

        if (!bootstrap) {
            return null;
        }

        return (
            <Grid container justify="center" spacing={2} className="tracker-tab teams-tab">
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <TeamTabInfo 
                        bootstrap={bootstrap}
                        entry={entries[0]}
                        history={history[0]}
                        picks={picks[0]}
                    />
                </Grid>
                <Grid item xs={4}>
                    <PointsHistoryChart history={history} />
                </Grid>
                <Grid item xs={3}>
                    <TeamTabInfo 
                        bootstrap={bootstrap}
                        entry={entries[1]}
                        history={history[1]}
                        picks={picks[1]}
                    />
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                    <TeamHistoryTable 
                        history={history[0]}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TeamHistoryTable 
                        history={history[1]}
                    />
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                    <TeamPastSeasonHistory history={history[0]} />
                </Grid>
                <Grid item xs={3}>
                    <TeamPastSeasonHistory history={history[1]} />
                </Grid>
                <Grid item xs={3}></Grid>

                
            </Grid>
        );
    }
}