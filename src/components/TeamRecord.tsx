import * as React from "react";
import * as ReactDOM from "react-dom";

export interface TeamRecordProps {
    standing : any
}

export default class TeamRecord extends React.Component<TeamRecordProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
            standing: props.standing
        }
    }

    render() {
        var standing = this.props.standing;    
        return (
            <span className="team-record">
                {`${standing.matches_won}W-${standing.matches_drawn}D-${standing.matches_lost}L`}
            </span>
        );
    }
}