import * as React from "react";
import * as ReactDOM from "react-dom";

import FixtureStatus from "./FixtureStatus";

export interface FixtureStatusGroupProps {
    fixtures : any[]
    team : any
    clubs : any[]
}

export default class FixtureStatusGroup extends React.Component<FixtureStatusGroupProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
        }
    }

    renderFixtures() : Array<JSX.Element> {
        var elements : Array<JSX.Element> = new Array<JSX.Element>();
        for (var i in this.props.fixtures) {
            elements.push(this.renderFixture(this.props.fixtures[i]));
        }
        return elements;
    }

    renderFixture(fixture : any) : JSX.Element {
        return (
                <FixtureStatus
                    key={fixture.id}
                    fixture={fixture}
                    team={this.props.team}
                    clubs={this.props.clubs}
                />
        );
    }

    render() {
        return (
            <div className="fixture-group">
                {this.renderFixtures()}
            </div>
        );
    }
}