import * as React from "react";
import * as ReactDOM from "react-dom";

import Selection from "../models/TrackerSelection";

export interface GameweekSelectorProps {
    onChange : any
    config : Selection
}

export default class GameweekSelector extends React.Component<GameweekSelectorProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
            config: props.config
        };
    }

    protected getGameweeks() : number[] {
        var weeks : number[] = [];
        for(var i = 1; i <= 38; i++) {
            weeks.push(i);
        }
        return weeks;
    }

    protected renderOptions() {
        var weeks = this.getGameweeks();
        var elements : JSX.Element[] = [];
        for (var i in weeks) {
            elements.push(<option key={weeks[i]}>{weeks[i]}</option>);
        }
        return elements;
    }

    render() {
        return (
                <select className="form-control-inline navbar-control gameweek-selector" value={this.props.config.gameweek} onChange={this.props.onChange}>
                    {this.renderOptions()}
                </select>
        );
    }
}