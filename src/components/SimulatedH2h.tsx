import * as React from "react";
import * as ReactDOM from "react-dom";

export interface SimulatedH2hProps {
    teams : any[],
    simulatedH2h : any
}

export default class SimulatedH2h extends React.Component<SimulatedH2hProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
        }
    }

    render() {
        if (this.props.simulatedH2h == null) {
            return "";
        }
        var team1Record = this.props.simulatedH2h[this.props.teams[0].id];
        if (team1Record == null) {
            return "";
        }
        return (
            <div className="stats">
                {`Simulated Head-to-Head: ${team1Record.wins}-${team1Record.draws}-${team1Record.losses}`}
            </div>
        );
    }
}