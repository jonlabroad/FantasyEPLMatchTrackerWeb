import * as React from "react";
import * as ReactDOM from "react-dom";

export interface TeamNameProps {
    team : any
}

class TeamNameUtils {
    public static getRank(team : any) {
        if (team.standing) {
            return team.standing.rank;
        }
        return team.entry.entry.summary_overall_rank;  
    }

    public static getName(team : any) {
        if (team.standing) {
            return team.standing.entry_name;
        }
        return team.entry.entry.name;
    }

    public static getPlayerName(team : any) {
        if (team.entry) {
            return `${team.entry.entry.player_first_name} ${team.entry.entry.player_last_name}`;
        }
        return team.standing.player_name;
    }    
}

export var TeamName = function TeamName(props : TeamNameProps) {
    return (
        <span className="team-name">
            {TeamNameUtils.getName(props.team)}
        </span>
    );
}

export function TeamRank(props : TeamNameProps) {
    return (
        <span className="team-rank">
            #{TeamNameUtils.getRank(props.team)}
        </span>
    )
}

export function TeamPlayerName(props : TeamNameProps) {
    return (
        <span className="player-name">
            {TeamNameUtils.getPlayerName(props.team)}
        </span>
    );
}

export default {TeamName, TeamRank, TeamPlayerName};