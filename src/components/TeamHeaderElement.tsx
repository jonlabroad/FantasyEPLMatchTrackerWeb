import React from "react";
import { Typography } from "@material-ui/core";
import Entry from "../data/fpl/Entry";

export interface TeamHeaderElementProps {
    entry: Entry
}

const getPlayerName = (entry: Entry) => {
    return entry ? `${entry.player_first_name} ${entry.player_last_name}` : '';
}

const getEntryName = (entry: Entry) => {
    return entry ? entry.name : '';
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