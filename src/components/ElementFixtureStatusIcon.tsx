import { ElementFixtureStatus } from "../data/ElementFixtureStatus";
import React from "react";

export interface ElementFixtureStatusIconProps {
    status: ElementFixtureStatus
}

export default class ElementFixtureStatusIcon extends React.Component<ElementFixtureStatusIconProps> {
    render() {
        const { status } = this.props;
        let icon = undefined;
        switch(status) {
            case ElementFixtureStatus.NOT_STARTED:
                icon = '-'; break;
            case ElementFixtureStatus.IN_PROGRESS:
                icon = 'I'; break;
            case ElementFixtureStatus.FINISHED_PROVISIONAL:
                icon = 'P'; break;
            case ElementFixtureStatus.FINISHED:
                icon = 'F'; break;
        }
        return <div>{icon}</div>
    }
}