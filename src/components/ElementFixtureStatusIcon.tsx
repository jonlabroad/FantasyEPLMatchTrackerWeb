import { ElementFixtureStatus } from "../data/ElementFixtureStatus";
import React from "react";
import Fixture from "../data/fpl/Fixture";
import Element from "../data/fpl/Element";
import { Tooltip } from "@material-ui/core";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import FixturesHelper from "../util/FixturesHelper";

export interface ElementFixtureStatusIconProps {
    element: Element
    status: ElementFixtureStatus
    fixture: Fixture
    bootstrap?: BootstrapStatic
}

export default class ElementFixtureStatusIcon extends React.Component<ElementFixtureStatusIconProps> {
    render() {
        const { status } = this.props;
        let iconClass = undefined;
        switch(status) {
            case ElementFixtureStatus.NOT_STARTED:
                iconClass = 'fixture-status-notstarted';
                break;
            case ElementFixtureStatus.IN_PROGRESS:
                iconClass = 'fixture-status-inprogress';
                break;
            case ElementFixtureStatus.FINISHED_PROVISIONAL:
                iconClass = 'fixture-status-provisional';
                break;
            case ElementFixtureStatus.FINISHED:
                iconClass = 'fixture-status-finished';
                break;
        }
        console.log(iconClass);
        return (
            <Tooltip title={FixturesHelper.getElementFixtureText(this.props.element, this.props.fixture, this.props.bootstrap)}>
                <div className={`element-fixture-status ${iconClass}`}></div>
            </Tooltip>
        )
    }
}