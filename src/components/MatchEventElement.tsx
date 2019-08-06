import React from "react";
import { MatchEvent, MatchEventType } from "../data/MatchEvent";
import { Box, Typography } from "@material-ui/core";

export interface MatchEventElementProps {
    event: MatchEvent
}

export default class MatchEventElement extends React.Component<MatchEventElementProps> {
    isImportant(event: MatchEvent) {
        if (event.type === MatchEventType.GOAL ||
            event.type === MatchEventType.ASSIST) {
            return true;
        }

        return false;
    }
    
    render() {
        const { event } = this.props;

        const isImportant = this.isImportant(event);

        return (
            <Box display="flex" flexDirection="column" className={`match-event ${isImportant ? "important-event" : ""}`}>
                <Typography variant="overline" className="match-event-time">{event.dateTime}</Typography>
                <Typography variant="subtitle1" className="match-event-type">{`${event.typeString}${isImportant ? "!" : ""}`}</Typography>
                <Typography variant="body1" className="match-event-name">{event.footballerName}</Typography>
            </Box>
        );
    }
}