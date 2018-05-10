import * as React from "react";
import * as ReactDOM from "react-dom";

import TeamRecord from "./TeamRecord";

export interface LiveStandingElementProps {
    num : any,
    liveStanding : any,
    team1Id : any,
    team2Id : any
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
        if (this.props.liveStanding.teamId == this.props.team1Id || this.props.liveStanding.teamId == this.props.team2Id)
        {
            addClasses = "live-standing-highlighted";
        }
        return (
            <tr className={"live-standing-element " + addClasses}>
                <td>
                    {this.props.num}
                </td>
                <td>
                    {this.props.liveStanding.teamName}
                </td>
                <td>
                    <TeamRecord
                        standing={standing}
                    />
                </td>
                <td>
                    {standing.points_for}
                </td>
                <td>
                    {standing.points_total}
                </td>
            </tr>
        );
    }
}