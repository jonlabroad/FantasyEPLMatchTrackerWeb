import * as React from "react";
import * as ReactDOM from "react-dom";

export interface TeamScoreProps {
    team : any,
    isScouting : boolean
}

export function TeamStarterScore(props : TeamScoreProps) {
    return (
        <span className="team-score">
            {props.isScouting && props.team.standing ? 
               calculateEstimatedScore(props)
             : props.team.score.startingScore}
        </span>
    );
}

function calculateEstimatedScore(props : TeamScoreProps) : number {
    var score = 0;
    for (var i in props.team.picks) {
        var pick = props.team.picks[i];
        if (pick.pick.position <= 11) {
            score += Number(pick.footballer.rawData.footballer.ep_next) * pick.pick.multiplier;
        }
    }
    return Math.round(score*10)/10;
}

export function TeamSubScore(props : TeamScoreProps) {
    var isAverage = props.team.id == 0;
    return (
        <span className="team-sub-score">
            {props.isScouting || isAverage ? "" : `(${props.team.score.subScore})`}
        </span>
    );
}

export default {TeamStarterScore, TeamSubScore};