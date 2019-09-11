import React from "react";
import { Typography, Hidden } from "@material-ui/core";
import Entry from "../data/fpl/Entry";
import { StandingsEntry } from "../data/fpl/LeaguesH2hStandings";

export interface TeamHeaderElementProps {
    entry: Entry
    standing?: StandingsEntry
}

const getPlayerName = (entry: Entry) => {
    return entry ? `${entry.player_first_name} ${entry.player_last_name}` : '';
}

const getEntryName = (entry: Entry) => {
    return entry ? entry.name : '';
}

const getRank = (standing?: StandingsEntry) => {
    return standing ? `#${standing.rank}` : '';
}

const getRecord = (standing?: StandingsEntry) => {
    return standing ? `${standing.matches_won}W-${standing.matches_drawn}D-${standing.matches_lost}L` : '';
}

export const TeamHeaderElement: React.SFC<TeamHeaderElementProps> = (props) => {
    if (!props.entry) {
        return null;
    }
    return (
        <div className="team-header-element">
            <Hidden smDown><Typography variant="h6" align="center">{`${getEntryName(props.entry)}`}</Typography></Hidden>
            <Hidden smUp><Typography variant="body1" align="center"><strong>{`${getEntryName(props.entry)}`}</strong></Typography></Hidden>
            <Hidden smDown><Typography variant="subtitle1" align="center">{getPlayerName(props.entry)}</Typography></Hidden>
            <Hidden smUp><Typography variant="body2" align="center">{getPlayerName(props.entry)}</Typography></Hidden>
            <Typography variant="body2" align="center">{`${getRank(props.standing)}   ${getRecord(props.standing)}`}</Typography>
        </div>
    );
}