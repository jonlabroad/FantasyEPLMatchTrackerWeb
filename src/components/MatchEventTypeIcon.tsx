import React from 'react';
import { Box, Typography } from "@material-ui/core";
import { IconSelector } from '../util/IconSelector';
import { PointsIcon } from './PointsIcon';

export interface MatchEventTypeIconProps {
    eventType: string
}

export const MatchEventTypeIcon: React.SFC<MatchEventTypeIconProps> = (props) => {
    console.log(props.eventType);
    return (
        <Box display="flex" alignContent="center" alignItems="center" justifyItems="center" justifyContent="center" className="match-event-icon-container">
            <PointsIcon explainType={props.eventType}/>
        </Box>
    );
}
