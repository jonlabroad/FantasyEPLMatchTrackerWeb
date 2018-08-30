import * as React from "react";
import * as ReactDOM from "react-dom";

import {TeamName, TeamRank, TeamPlayerName} from "./TeamName";
import TeamRecord from "./TeamRecord";
import {TeamStarterScore, TeamSubScore} from "./TeamScore";
import TeamStripe from "./TeamStripe";

export interface MatchHeaderState {
}

export interface MatchHeaderProps {
    matchInfo : any;
    isScouting : boolean;
}

export default class MatchHeader extends React.Component<MatchHeaderProps, {}> {   
    protected leagueName : string = "Alexi Lalas is the worst!!!!!!";
    
    constructor(props : any) {
        super(props);
        this.state = {
        };
    }

    protected getTeamsArray(teams : any) {
        var teamsArray = new Array<any>();
        for (var id in teams) {
            teamsArray.push(teams[id]);
        }
        if (teamsArray.length == 1)
        {
            teamsArray.push(teamsArray[0]);
        }
        return teamsArray;
    }

    render() {
        var teamsArray = this.getTeamsArray(this.props.matchInfo.teams);
        return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col league-header">
                        {this.leagueName}
                    </div>
                </div>
            </div>
            <div className="container-fluid match-strip-container mx-auto no-gutters align-items-center">
                <div className="row justify-content-around d-flex align-items-center main-element match-strip match-strip-row">
                    <div className="match-strip-height"></div>
                    <div className="col-2 kit match-strip-height">
                        <TeamStripe
                            team={teamsArray[0]}
                            reverse={true}
                        />
                    </div>
                    <div className="col-8 d-flex justify-content-center align-items-center">
                        <div className="team-name-box text-center">
                            <TeamRank
                                team={teamsArray[0]}
                            />
                            <span> </span>
                            <TeamName 
                                team={teamsArray[0]}
                            />
                            <div>
                                <TeamPlayerName
                                    team={teamsArray[0]}
                                />
                            </div>
                            <div>
                                <TeamRecord
                                    standing={teamsArray[0] != null ? teamsArray[0].standing : null}
                                />
                            </div>  
                        </div>
                        <div className="sub-score text-center">
                            <TeamSubScore
                                team={teamsArray[0]}
                                isScouting={this.props.isScouting}
                            />
                        </div>                    
                        <div className="score text-center">
                            <TeamStarterScore
                                team={teamsArray[0]}
                                isScouting={this.props.isScouting}
                            />
                        </div>
                        <div className="match-time text-center"></div>
                        <div className="score">
                            <TeamStarterScore
                                team={teamsArray[1]}
                                isScouting={this.props.isScouting}
                            />
                        </div>
                        <div className="sub-score text-center">
                            <TeamSubScore
                                team={teamsArray[1]}
                                isScouting={this.props.isScouting}
                            />
                        </div>
                        <div className="team-name-box text-center">
                            <TeamRank
                                team={teamsArray[1]}
                            />
                            <span> </span>
                            <TeamName 
                                team={teamsArray[1]}
                            />
                            <div>
                                <TeamPlayerName
                                    team={teamsArray[1]}
                                />
                            </div>
                            <div>
                                <TeamRecord
                                    standing={teamsArray[1] != null ? teamsArray[1].standing : null}
                                />
                            </div>  
                        </div>
                    </div>
                    <div className="col-2 kit match-strip-height">
                        <TeamStripe
                            team={teamsArray[1]}
                            reverse={false}
                        />
                    </div>  
                </div>
            </div>
        </div>
        );
    }
}