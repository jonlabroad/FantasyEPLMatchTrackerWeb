import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { TeamHeaderElement } from "./TeamHeaderElement";
import EntryData from "../data/fpl/EntryData";
import { HeaderScore } from "./HeaderScore";
import Picks from "../data/fpl/Picks";
import Live from "../data/fpl/Live";
import ScoreCalculator, { Score } from "../util/ScoreCalculator";

export interface MatchHeaderProps {
    entry1: EntryData;
    entry2: EntryData;
    picks1?: Picks;
    picks2?: Picks;
    live?: Live;
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
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={3} justify="center" alignItems="center">
                        <Grid item xs={2}>
                            <TeamHeaderElement entry={this.props.entry1}/>
                        </Grid>
                        <Grid item xs={1} justify="center" alignItems="center">
                            <HeaderScore score1={score1} score2={score2}/>
                        </Grid>
                        <Grid item xs={2}>
                            <TeamHeaderElement entry={this.props.entry1}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}