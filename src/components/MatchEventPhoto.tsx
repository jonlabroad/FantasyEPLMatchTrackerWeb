import React from 'react';
import Element from "../data/fpl/Element";
import { ElementPhoto } from './ElementPhoto';
import { Box } from '@material-ui/core';

export interface MatchEventPhotoProps {
    element?: Element
}

export const MatchEventPhoto: React.SFC<MatchEventPhotoProps> = (props) => {
    console.log({props: props});
    return (
    <Box display="flex" alignItems="center" justifyItems="center" className="match-event-photo">
        <ElementPhoto element={props.element} />
    </Box>
    );
}
