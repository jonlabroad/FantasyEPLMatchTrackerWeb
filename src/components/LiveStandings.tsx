import * as React from "react";
import * as ReactDOM from "react-dom";

import LiveStandingElement from "./LiveStandingElement";

export interface LiveStandingsProps {
    liveStandings : any;
    team1 : any,
    team2 : any,
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
                team1 = {this.props.team1}
                team2 = {this.props.team2}
            />
            standingElements.push(element);
        }       

        return (
            <div>
            <div className="live-standings-header">Live Standings</div>
            <div className="scrollable live-standings-scrollable live-standings-table">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Team</th>
                            <th>Record</th>
                            <th>GW Score</th>
                            <th>Total Score</th>
                            <th>League Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standingElements}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }
}