import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { IconSelector } from '../util/IconSelector';

export interface PointsIconProps {
    explainType: string
}

const useStyles = makeStyles(theme => ({
    img: {
        width: '20px',
        paddingLeft: "2px",
        paddingRight: "2px"
    }
}));

export const PointsIcon: React.SFC<PointsIconProps> = (props) => {
    const classes = useStyles();
    return (
        <img className={classes.img} alt={props.explainType} src={`icon/${IconSelector.getIcon(props.explainType)}`}/>
    );
}