import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import { TeamHeaderElement } from "./TeamHeaderElement";
import { HeaderScore } from "./HeaderScore";
import Picks from "../data/fpl/Picks";
import Live from "../data/fpl/Live";
import ScoreCalculator, { Score } from "../util/ScoreCalculator";

import "../styles/match-header.css";
import Entry from "../data/fpl/Entry";

export interface MatchHeaderProps {
    entry1: Entry;
    entry2: Entry;
    picks1?: Picks;
    picks2?: Picks;
    live?: Live;
    gameweek: number;
}

export default class MatchHeader extends React.Component<MatchHeaderProps> {
    render() {
        const { picks1, picks2, live } = this.props;

        let score1 = new Score();
        let score2 = new Score();

        if (picks1) {
            score1 = ScoreCalculator.calculateTeamScore(picks1, live);
        }
        if (picks2) {
            score2 = ScoreCalculator.calculateTeamScore(picks2, live);
        }

        return (
            <Grid className="match-header-container" container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={3} justify="center" alignItems="center">
                        <Grid item xs={2}>
                            <TeamHeaderElement entry={this.props.entry1}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Box display="flex" flexDirection="column" alignContent="center" alignItems="center">
                                <HeaderScore score1={score1} score2={score2}/>
                                <Typography variant="subtitle2">{`Gameweek ${this.props.gameweek}`}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <TeamHeaderElement entry={this.props.entry2}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}