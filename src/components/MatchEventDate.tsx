import React from 'react';
import { Box, Typography } from "@material-ui/core";
import moment from 'moment';

export interface MatchEventDateProp {
    dateString: string
    isImportant: boolean
}

export const MatchEventDate: React.SFC<MatchEventDateProp> = (props) => {
    const dateMoment = moment(props.dateString);
    const date = dateMoment.format("M/D");
    const time = dateMoment.format("H:mm");
    return (
        <Box className="match-event-date" display="flex" flexDirection="column">
            <Typography className="match-event-date-date" variant="caption">{date}</Typography>
            <Typography className="match-event-date-time" variant="caption">{time}</Typography>
        </Box>
    );
}
