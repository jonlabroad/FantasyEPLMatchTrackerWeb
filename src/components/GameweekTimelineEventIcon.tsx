import React from "react";
import { Box } from "@material-ui/core";
import { PointsIcon } from "./PointsIcon";
import { IconSelector } from "../util/IconSelector";
import SVG from 'react-inlinesvg';

export interface GameweekTimelineEventIconProps {
    eventType: string
}

export default class GameweekTimelineEventIcon extends React.Component<GameweekTimelineEventIconProps> {
    preprocess(code: any) {
        console.log(code.replace(/viewBox=".*?"/g, 'viewBox="0 0 10.0 10.0"'));
        return code.replace(/viewBox=".*?"/g, 'viewBox="0 0 40.0 40.0"');
    }
    
    render() {
        
        return (
            //<Box display="flex" alignContent="center" alignItems="center" justifyItems="center" justifyContent="center">
            //<PointsIcon explainType={this.props.eventType}/>
            <SVG className="gameweek-timeline-event-icon" preProcessor={code => this.preprocess(code)} src={`icon/${IconSelector.getIcon(this.props.eventType)}`}/>
            //</Box>
        );
    }
}