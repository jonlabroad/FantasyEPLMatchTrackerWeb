import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { IconSelector } from '../util/IconSelector';
import LiveHelper from '../util/LiveHelper';
import { PointsIcon } from './PointsIcon';
import { Box } from '@material-ui/core';
import { ExplainElement } from '../data/fpl/ExplainElement';
import { Explain } from '../data/fpl/Explain';
import LiveElement from '../data/fpl/LiveElement';

export interface PointsIconsProps {
    liveElement: LiveElement
}

const noIconPerEventTypes = [
    "minutes_played",
    "minutes",
    "bps"
];

const explainsProcessors: {[key: string]: Function} = {
    "minutes": (explainType: string, explain: ExplainElement) => {
        if (explain.value > 0) {
            const type = explain.value >= 60 ? "minutes_60" : explainType;
            return <PointsIcon explainType={type}/>
        }
        return null;
    },
}

export default class PointsIcons extends React.Component<PointsIconsProps> {
    renderExplain(explain: ExplainElement): JSX.Element[] {
        const icons = [];
        if (explainsProcessors[explain.identifier]) {
            icons.push(explainsProcessors[explain.identifier](explain.identifier, explain));
        }
        else if (!noIconPerEventTypes.includes(explain.identifier)) {
            for (let i = 0; i < explain.value; i++) {
                icons.push(<PointsIcon explainType={explain.identifier}/>);
            }
        }
        return icons;
    }

    render() {
        const elements = [];
        for (let explain of this.props.liveElement.explain) {
            for (let explainElement of explain.stats) {
                elements.push(this.renderExplain(explainElement));
            }
        }
        
        return <Box maxWidth="100%" display="flex" flexDirection="row" alignContent="center" flexWrap="wrap">{elements}</Box>;
    }
}