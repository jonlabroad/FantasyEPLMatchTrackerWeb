import * as React from "react";
import * as ReactDOM from "react-dom";

import LiveStandingElement from "./LiveStandingElement";
import Selection from "../models/TrackerSelection";

export interface LiveStandingsProps {
    liveStandings : any;
    team1Id : any,
    team2Id : any
}

export default class LiveStandings extends React.Component<LiveStandingsProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
        }
    }

    render() {
        var standingElements : Array<any> = new Array<any>();
        for (var i in this.props.liveStandings) {
            var element = <LiveStandingElement
                key={i}
                num={parseInt(i) + 1}
                liveStanding = {this.props.liveStandings[i]}
                team1Id = {this.props.team1Id}
                team2Id = {this.props.team2Id}
            />
            standingElements.push(element);
        }       

        return (
            <div className="scrollable event-scrollable">
                <table className="table table-sm table-picks">
                    <tbody>
                        {standingElements}
                    </tbody>
                </table>
            </div>
        );
    }
}