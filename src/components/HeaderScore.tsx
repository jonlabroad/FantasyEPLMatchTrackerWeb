import React from "react";
import { Typography, Box, IconButton } from "@material-ui/core";
import { Score } from "../util/ScoreCalculator";

export interface HeaderScoreProps {
    score1: Score;
    score2: Score;
}

export const HeaderScore: React.SFC<HeaderScoreProps> = (props) => {
    return (
        <Box className="header-score" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Typography variant="overline">{props.score1.subScore}</Typography>
            <Typography variant="h4">{props.score1.startingScore}</Typography>
            <Typography variant="h6">-</Typography>
            <Typography variant="h4">{props.score2.startingScore}</Typography>
            <Typography variant="overline">{props.score2.subScore}</Typography>
        </Box>
    );
}