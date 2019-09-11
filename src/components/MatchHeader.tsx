import React from "react";
import { Grid, Typography, Box, IconButton } from "@material-ui/core";
import { TeamHeaderElement } from "./TeamHeaderElement";
import { HeaderScore } from "./HeaderScore";
import Picks from "../data/fpl/Picks";
import Live from "../data/fpl/Live";
import ScoreCalculator, { Score } from "../util/ScoreCalculator";
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

import "../styles/match-header.css";
import Entry from "../data/fpl/Entry";
import LeaguesH2hStandings from "../data/fpl/LeaguesH2hStandings";

export interface MatchHeaderProps {
    entry1: Entry;
    entry2: Entry;
    picks1?: Picks;
    picks2?: Picks;
    live?: Live;
    gameweek: number;
    standings?: LeaguesH2hStandings;

    incrementGameweekClick: any;
    decrementGameweekClick: any;
}

export default class MatchHeader extends React.Component<MatchHeaderProps> {
    render() {
        const { entry1, entry2, picks1, picks2, live, standings } = this.props;

        let score1 = new Score();
        let score2 = new Score();
        let standing1 = undefined;
        let standing2 = undefined;

        if (picks1) {
            score1 = ScoreCalculator.calculateTeamScore(picks1, live);
        }
        if (picks2) {
            score2 = ScoreCalculator.calculateTeamScore(picks2, live);
        }

        if (standings && entry1) {
            standing1 = standings.standings.results.find(e => e.entry === entry1.id);
        }
        if (standings && entry2) {
            standing2 = standings.standings.results.find(e => e.entry === entry2.id);
        }

        return (
            <Box className="match-header-container" display="flex" justifyContent="center" justifyItems="center" alignItems="center">
                <Grid item xs={3} sm={2}>
                    <TeamHeaderElement entry={this.props.entry1} standing={standing1}/>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Box display="flex" flexDirection="column" alignContent="center" alignItems="center">
                        <HeaderScore score1={score1} score2={score2} />
                        <Box display="flex" flexDirection="row" alignContent="center" alignItems="center">
                            <IconButton id="decrementGameweek" size="small" onClick={this.props.decrementGameweekClick}><ArrowBackIos /></IconButton>
                            <Typography variant="subtitle2">{`Gameweek ${this.props.gameweek}`}</Typography>
                            <IconButton id="incrementGameweek" size="small" onClick={this.props.incrementGameweekClick}><ArrowForwardIos /></IconButton>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={3} sm={2}>
                    <TeamHeaderElement entry={this.props.entry2}  standing={standing2}/>
                </Grid>
            </Box>
        );
    }
}