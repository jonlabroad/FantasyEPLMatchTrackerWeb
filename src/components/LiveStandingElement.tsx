import * as React from "react";
import * as ReactDOM from "react-dom";

import TeamRecord from "./TeamRecord";

export interface LiveStandingElementProps {
    num : any,
    liveStanding : any,
    team1 : any,
    team2 : any
}

export default class LiveStandingElement extends React.Component<LiveStandingElementProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {};
    }

    render() { 
        if (this.props.liveStanding == null) {
            return "";
        }
        
        var standing = this.props.liveStanding.standing;     
        var addClasses = "";
        if (this.props.liveStanding.teamId == this.props.team1.id || this.props.liveStanding.teamId == this.props.team2.id)
        {
            addClasses = "live-standings-highlighted";
        }
        return (
            <tr className={"live-standings-element " + addClasses}>
                <td className="live-standings-num">
                    {this.props.num}
                </td>
                <td className="live-standings-name">
                    {this.props.liveStanding.teamName}
                </td>
                <td className="live-standings-record">
                    <TeamRecord
                        standing={standing}
                    />
                </td>
                <td className="live-standings-points-for">
                    {this.props.liveStanding.currentWeekScore ? this.props.liveStanding.currentWeekScore.startingScore : '-'}
                </td>
                <td className="live-standings-points-for">
                    {standing.points_for}
                </td>
                <td className="live-standings-points-total">
                    {standing.points_total}
                </td>
            </tr>
        );
    }
}