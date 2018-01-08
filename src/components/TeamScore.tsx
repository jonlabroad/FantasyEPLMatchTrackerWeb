import * as React from "react";
import * as ReactDOM from "react-dom";

export interface TeamScoreProps {
    team : any
}

export function TeamStarterScore(props : TeamScoreProps) {
    return (
        <span className="team-score">
            {props.team.score.startingScore}
        </span>
    );
}

export function TeamSubScore(props : TeamScoreProps) {
    return (
        <span className="team-sub-score">
            ({props.team.score.subScore})
        </span>
    );
}

export default {TeamStarterScore, TeamSubScore};