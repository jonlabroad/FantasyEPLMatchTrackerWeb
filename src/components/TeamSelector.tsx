import * as React from "react";
import * as ReactDOM from "react-dom";

import Selection from "../models/Selection";

export interface TeamSelectorState {
    config : Selection
}

export interface TeamSelectorProps {
    standings : any
    onChange : any
    config : Selection
}

export default class TeamSelector extends React.Component<TeamSelectorProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
            config: props.config
        };
    }

    protected getTeams() : string[] {
        var teams : string[] = [];
        for(var i in this.props.standings.standings.results) {
            teams.push(this.props.standings.standings.results[i].entry_name);
        }
        return teams;
    }

    protected renderOptions() {
        var teams = this.getTeams();
        var elements : JSX.Element[] = [];
        for (var i in teams) {
            elements.push(<option key={teams[i]}>{teams[i]}</option>);
        }
        return elements;
    }

    render() {
        return (
                <select className="form-control navbar-control" value={this.props.config.teamName} onChange={this.props.onChange}>
                    {this.renderOptions()}
                </select>
        );
    }
}