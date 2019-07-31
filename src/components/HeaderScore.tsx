import React from "react";
import { Typography, Box } from "@material-ui/core";
import { Score } from "../util/ScoreCalculator";

export interface HeaderScoreProps {
    score1: Score;
    score2: Score;
}

export const HeaderScore: React.SFC<HeaderScoreProps> = (props) => {
    return (
        <Box className="header-score" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Typography variant="h4">{props.score1.startingScore}</Typography>
            <Typography variant="h6">-</Typography>
            <Typography variant="h4">{props.score2.startingScore}</Typography>
        </Box>
    );
}