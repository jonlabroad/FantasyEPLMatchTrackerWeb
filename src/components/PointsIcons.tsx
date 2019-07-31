import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { IconSelector } from '../util/IconSelector';
import { Explains } from '../data/fpl/Explains';
import LiveHelper from '../util/LiveHelper';
import ScoreExplain from '../data/fpl/ScoreExplain';
import { PointsIcon } from './PointsIcon';
import { Box } from '@material-ui/core';

export interface PointsIconsProps {
    explainsArray: Explains[]
}

const noIconPerEventTypes = [
    "minutes_played",
    "minutes",
    "bps"
];

const explainsProcessors: {[key: string]: Function} = {
    "minutes": (explainType: string, explain: ScoreExplain) => {
        const type = explain.value >= 60 ? "minutes_60" : explainType;
        return <PointsIcon explainType={type}/>
    },
}

export default class PointsIcons extends React.Component<PointsIconsProps> {
    renderExplain(explain: {[key: string]: ScoreExplain}): JSX.Element[] {
        const icons = [];
        for (let explainType of Object.keys(explain)) {
            const scoreExplain = explain[explainType];
            if (explainsProcessors[explainType]) {
                icons.push(explainsProcessors[explainType](explainType, scoreExplain));
            }
            else if (!noIconPerEventTypes.includes(explainType)) {
                for (let i = 0; i < scoreExplain.value; i++) {
                    icons.push(<PointsIcon explainType={explainType}/>);
                }
            }
        }
        return icons;
    }

    render() {
        const elements = [];
        for (let explains of this.props.explainsArray) {
            for (let explain of explains) {
                elements.push(this.renderExplain(explain));
            }
        }
        
        return <Box display="flex" flexDirection="row" alignContent="center">{elements}</Box>;
    }
}