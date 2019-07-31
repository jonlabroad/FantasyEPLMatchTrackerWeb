import React from "react";
import { Typography } from "@material-ui/core";
import EntryData from "../data/fpl/EntryData";

export interface TeamHeaderElementProps {
    entry: EntryData
}

const getPlayerName = (entry: EntryData) => {
    return entry ? `${entry.entry.player_first_name} ${entry.entry.player_last_name}` : '';
}

const getEntryName = (entry: EntryData) => {
    return entry ? entry.entry.name : '';
}

export const TeamHeaderElement: React.SFC<TeamHeaderElementProps> = (props) => {
    if (!props.entry) {
        return null;
    }
    return (
        <div className="team-header-element">
            <Typography variant="h6" align="center">
                {getEntryName(props.entry)}
            </Typography>
            <Typography variant="subtitle1" align="center">
                {getPlayerName(props.entry)}
            </Typography>
        </div>
    );
}