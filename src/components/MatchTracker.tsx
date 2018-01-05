import * as React from "react";
import * as ReactDOM from "react-dom";

import * as JQuery from "jquery";

import EPLClient from "../EPLClient";
import MatchHeader from "./MatchHeader";
import TeamName from "./TeamName";
import PickList from "./PickList";
import EventTable from "./EventTable";
import TeamRecord from "./TeamRecord";
import TeamSelector from "./TeamSelector";
import GameweekSelector from "./GameweekSelector";
import DifferentialsSelector from "./DifferentialsSelector";
import Highlight from "./Highlight";
import Selection from "../models/Selection";
import { TeamStarterScore, TeamSubScore } from "./TeamScore";

export interface MatchTrackerProps {
}

export interface MatchTrackerState {
    matchInfo : any;
    standings : any;
}

export default class MatchTracker extends React.Component<MatchTrackerProps, MatchTrackerState> {
    protected leagueId : number = 31187;
    protected eplClient : EPLClient = new EPLClient();
    protected componentMounted : boolean = false;
    protected matchInfoCache : any = {};
    protected lastMatchInfoRead : any = {};
    protected selection : Selection = {
        gameweek: 22,
        differentialsOnly: false,
        teamName: "The Vardy Boys",
        teamId: 2365803
    }

    constructor(props : any) {
        super(props);
        this.state = {
            matchInfo : null,
            standings : null
        }
    }

    protected getTeamsArray(matchInfo : any) {
        var teams = new Array();
        for (var id in matchInfo.teams) {
          teams.push(matchInfo.teams[id]);
        }
        return teams;
    }

    protected findTeamStandingByName(teamName : string) {
        var standings = this.state.standings;
        if (standings) {
          for (var i in standings.standings.results) {
            var result = standings.standings.results[i];
            if (result.entry_name === teamName) {
              return result;
            }
          }
        }
        return null;
      }

    protected teamNameChanged(event : any) {
        var oldSelection = this.selection;
        if (oldSelection.teamName !== event.target.value) {
            this.selection = {
                gameweek: this.selection.gameweek,
                differentialsOnly: this.selection.differentialsOnly,
                teamName: event.target.value,
                teamId: this.findTeamStandingByName(event.target.value).entry
            }
            this.readMatchInfo();
        }
    }

    protected readMatchInfo() {
        var now = new Date();
        var lastRead = this.lastMatchInfoRead[this.selection.teamId];
        if (!lastRead || (now.getTime() - lastRead.getTime()) > 60000) {
            this.lastMatchInfoRead[this.selection.teamId] = now;
            this.eplClient.readTeamData(this.leagueId, this.selection.teamId, this.selection.gameweek, this.processMatchInfo.bind(this));
        }
        else {
            this.processMatchInfo(this.matchInfoCache[this.selection.teamId]);
        }
      }
    
    protected readStandings() {
        if (!this.state.standings) {
            this.eplClient.readLeagueStandings(this.leagueId, this.processStandings.bind(this));
        }
    }
    
    protected processStandings(data : any) {
        var standings = data;
        if (this.componentMounted) {
            this.setState({
                matchInfo: this.state.matchInfo,
                standings: standings
            });
        }
      }

    protected processMatchInfo(data : any) {
        for (var key in data.teams) {
            this.matchInfoCache[key] = data;
        }
        
        if (this.componentMounted) {
            this.setState({
                matchInfo: data,
                standings: this.state.standings
            });
        }
      }
      
        protected onFocus() {
            //this.readMatchInfo();
        }

      public componentDidMount() {
        if (!this.componentMounted) {
            this.componentMounted = true;
            $(window).on("focus", this.onFocus.bind(this));
        }
        this.readMatchInfo();
        this.readStandings();
      }

      public componentWillUnmount() {
          $(window).off("focus", this.onFocus.bind(this))
          this.componentMounted = false;
      }

      protected renderNavBar() {
        return (
          <nav className="navbar navbar-expand-sm bg-mine navbar-dark">
                  <a className="navbar-brand" href="#">FPL Live Matchtracker</a>
              </nav>
        );
      }
    
      protected renderSelectors() : JSX.Element {
        var standings = this.state.standings;
        if (standings) {
          return <div className="container">
            <div className="row">
              <div className="col-1"></div>
                <div className="col-4">
                    <TeamSelector
                      config = {this.selection}
                      standings = {this.state.standings}
                      onChange = {this.teamNameChanged.bind(this)}
                    />
                </div>
                <div className="col-3">
                  <GameweekSelector
                    config = {this.selection}
                    onChange = {() => {}}
                  />
                </div>
                <div className="col-3">
                  <DifferentialsSelector
                    config = {this.selection}
                    onChange = {() => {}}
                  />
                </div>
              </div>
            <div className="col-1"></div>
          </div>
        }
      }
    
      protected renderMatchInfo() : JSX.Element {
        var matchInfo = this.state.matchInfo;
        if (matchInfo) {
          var teams = this.getTeamsArray(matchInfo);
          return (
            <div>
            <div className="container-fluid match-strip-container mx-auto no-gutters">
              <div className="row-fluid">
                <div className="main-element match-strip-row">
                  <MatchHeader  
                    matchInfo={this.state.matchInfo}
                  />
                </div>
              </div>
            </div>
              <div className="container">
                <div className="row no-gutters">
                  <div className="col-4">
                    <div className="main-element">
                      <PickList picks={teams[0].picks}/>
                    </div>
                  </div>
                  <div className="col-4 no-gutters">
                    <div className="d-flex main-element">
                      <Highlight team={teams[0]} events={matchInfo.allEvents}/>
                      <Highlight team={teams[1]} events={matchInfo.allEvents}/>
                    </div>
                    <div className="main-element">
                      <EventTable
                        eventList={matchInfo.allEvents}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="main-element">
                        <PickList picks={teams[1].picks}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }

    render() {
        return (
            <div>
              {this.renderNavBar()}
              {this.renderSelectors()}
              {this.renderMatchInfo()}
            </div>
        );
    }
}