import * as React from "react";
import * as ReactDOM from "react-dom";

import {TeamName, TeamRank, TeamPlayerName} from "./TeamName";
import {TeamStarterScore, TeamSubScore} from "./TeamScore";
import TeamStripe from "./TeamStripe";
import Selection from "../models/Selection";

export interface MatchHeaderState {
    matchInfo : any;
}

export interface MatchHeaderProps {
    matchInfo : any;
}

export default class MatchHeader extends React.Component<MatchHeaderProps, MatchHeaderState> {   
    constructor(props : any) {
        super(props);
        this.state = {
            matchInfo: props.matchInfo
        };
    }

    protected getTeamsArray(teams : any) {
        var teamsArray = new Array<any>();
        for (var id in teams) {
            teamsArray.push(teams[id]);
        }
        return teamsArray;
    }

    render() {
        var teamsArray = this.getTeamsArray(this.state.matchInfo.teams);
        return (
        <div className="container align-items-center">
            <div className="row d-flex align-items-center match-strip">
                <div className="match-strip-height"></div>
                <div className="col-2 match-strip-height">
                    <TeamStripe
                        team={teamsArray[0]}
                    />
                </div>
                <div className="col-8 d-flex justify-content-center align-items-center">
                    <div className="team-name text-center">
                        <TeamName 
                            team={teamsArray[0]}
                        />
                    </div>
                    <div className="sub-score text-center">
                        <TeamSubScore
                            team={teamsArray[0]}
                        />
                    </div>                    
                    <div className="score text-center">
                        <TeamStarterScore
                            team={teamsArray[0]}
                        />
                    </div>
                    <div className="match-time text-center">FT</div>
                    <div className="score">
                        <TeamStarterScore
                            team={teamsArray[1]}
                        />
                    </div>
                    <div className="sub-score text-center">
                        <TeamSubScore
                            team={teamsArray[1]}
                        />
                    </div>
                    <div className="team-name text-center">
                        <TeamName 
                            team={teamsArray[1]}
                        />
                    </div>
                </div>
                <div className="col-2 match-strip-height">
                    <TeamStripe
                        team={teamsArray[1]}
                    />
                </div>  
            </div>
        </div>
        );
    }
}