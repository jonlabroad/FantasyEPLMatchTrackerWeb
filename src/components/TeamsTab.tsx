import React from "react";
import Entry from "../data/fpl/Entry";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import Picks from "../data/fpl/Picks";
import TeamTabInfo from "./TeamTabInfo";
import { Grid, Hidden } from "@material-ui/core";

export interface TeamsTabProps {
    bootstrap?: BootstrapStatic
    entries: Entry[]
    picks: Picks[]
}

export default class TeamsTab extends React.Component<TeamsTabProps> {
    render() {
        const { bootstrap, entries, picks } = this.props;

        if (!bootstrap) {
            return null;
        }

        return (
            <Grid container justify="center" spacing={2} className="match-tab">
                <Hidden smDown><Grid item xs={1}></Grid></Hidden>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <TeamTabInfo 
                        bootstrap={bootstrap}
                        entry={entries[0]}
                        picks={picks[0]}
                    />
                </Grid>
                <Grid item xs={1}></Grid>
                
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <TeamTabInfo 
                        bootstrap={bootstrap}
                        entry={entries[1]}
                        picks={picks[1]}
                    />
                </Grid>
                <Grid item xs={1}></Grid>
                <Hidden smDown><Grid item xs={1}></Grid></Hidden>
            </Grid>
        );
    }
}