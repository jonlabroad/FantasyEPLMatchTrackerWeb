import React from "react";
import { MatchEvent, MatchEventType } from "../data/MatchEvent";
import { Box, Typography } from "@material-ui/core";
import { MatchEventDate } from "./MatchEventDate";
import { MatchEventTypeIcon } from "./MatchEventTypeIcon";
import MatchEventUtil from "../util/MatchEventUtil";
import BootstrapHelper from "../util/BootstrapHelper";
import { ElementPhoto } from "./ElementPhoto";
import { MatchEventPhoto } from "./MatchEventPhoto";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";

export interface MatchEventElementProps {
    event: MatchEvent
    bootstrapStatic?: BootstrapStatic
}

export default class MatchEventElement extends React.Component<MatchEventElementProps> {
    isImportant(event: MatchEvent) {
        if (event.type === MatchEventType.GOAL ||
            event.type === MatchEventType.ASSIST ||
            event.type === MatchEventType.BONUS) {
            return true;
        }

        return false;
    }
    
    render() {
        const { event } = this.props;

        const isImportant = this.isImportant(event);

        return (
            <Box display="flex" flexDirection="row" className={`match-event ${isImportant ? "important-event" : ""}`}>
                <MatchEventTypeIcon eventType={event.typeString} />
                <MatchEventDate dateString={event.dateTime} isImportant={isImportant}/>
                <Box display="flex" flexDirection="column">
                    <Typography variant="subtitle1" className="match-event-type-text">{`${MatchEventUtil.matchEventToString(event.type)}${isImportant ? "!" : ""}`}</Typography>
                    <Typography variant="body1" className="match-event-name-text">{event.footballerName}</Typography>
                </Box>
                <MatchEventPhoto element={BootstrapHelper.getElement(event.footballerId, this.props.bootstrapStatic)}/>
            </Box>
        );
    }
}